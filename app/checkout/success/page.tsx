import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ClearCartOnMount from "@/app/components/ClearCartOnMount";

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        return (
            <main className="max-w-md mx-auto p-8 text-center mt-16">
                <h1 className="text-xl font-semibold mb-2">
                    Something went wrong
                </h1>
                <Link href="/" className="underline">
                    Back to store
                </Link>
            </main>
        );
    }

    const supabase = await createClient();
    const { data: order } = await supabase
        .from("orders")
        .select("*, order_items(*, products(name))")
        .eq("stripe_session_id", session_id)
        .single();

    return (
        <main className="max-w-md mx-auto p-8 text-center mt-16">
            <ClearCartOnMount />
            <h1 className="text-2xl font-semibold mb-2">Thank you! 🎉</h1>
            <p className="text-gray-500 mb-6">Your order has been placed.</p>

            {order && (
                <div className="text-left border rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-2">
                        Order #{order.id.slice(0, 8)}
                    </p>
                    {order.order_items?.map(
                        (item: {
                            id: string;
                            products: { name: string } | null;
                            quantity: number;
                        }) => (
                            <p key={item.id} className="text-sm">
                                {item.quantity}× {item.products?.name}
                            </p>
                        ),
                    )}
                    <p className="font-semibold mt-2">Total: ${order.total}</p>
                </div>
            )}

            <Link href="/" className="underline">
                Continue shopping
            </Link>
        </main>
    );
}
