"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "../context/CartContext";
import { createClient } from "../../lib/supabase/client";
import { createCheckoutSession } from "../cart/actions";

const SHIPPING_ESTIMATE = 15;
const TAX_RATE = 0.08;

export default function CartSummary({ items }: { items: CartItem[] }) {
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState("");

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING_ESTIMATE + tax;

    async function handleCheckout() {
        setError("");
        setIsCheckingOut(true);

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        try {
            const url = await createCheckoutSession(items);
            if (url) window.location.href = url;
            else setError("Could not start checkout. Please try again.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Checkout failed");
        } finally {
            setIsCheckingOut(false);
        }
    }

    return (
        <div className="flex flex-col gap-6 bg-surface-alt border border-line rounded-sm p-6 sm:p-8">
            <h2 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                Order Summary
            </h2>

            <div className="flex flex-col gap-3">
                <div className="flex justify-between font-mono text-xs tracking-[1.2px] uppercase">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-ink">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-mono text-xs tracking-[1.2px] uppercase">
                    <span className="text-muted">Est. Shipping</span>
                    <span className="text-ink">
                        ${SHIPPING_ESTIMATE.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between font-mono text-xs tracking-[1.2px] uppercase">
                    <span className="text-muted">Est. Tax</span>
                    <span className="text-ink">${tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-line pt-4">
                <span className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                    Total
                </span>
                <span className="font-display font-bold text-3xl text-ink">
                    ${total.toFixed(2)}
                </span>
            </div>

            {error && <p className="font-mono text-xs text-accent">{error}</p>}

            <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-accent text-white rounded-lg py-4 font-display font-bold text-xl uppercase tracking-[0.6px] hover:bg-ink transition-colors disabled:bg-line disabled:text-muted"
            >
                {isCheckingOut ? "Redirecting…" : "Checkout"}
            </button>
        </div>
    );
}
