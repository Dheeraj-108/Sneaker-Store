"use server";

import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItemInput = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image_url: string;
};

export async function createCheckoutSession(items: CartItemInput[]) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Must be logged in to checkout");

    const total = items.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0,
    );

    const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({ profile_id: user.id, status: "pending", total })
        .select()
        .single();

    if (orderError || !order) throw new Error("Failed to create order");

    const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
    if (itemsError) throw new Error("Failed to save order items");

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: { name: item.name, images: [item.image_url] },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
        metadata: { order_id: order.id },
    });

    await supabase
        .from("orders")
        .update({ stripe_session_id: session.id })
        .eq("id", order.id);

    return session.url;
}
