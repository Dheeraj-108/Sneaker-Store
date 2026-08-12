"use client";

import { useCart } from "../context/CartContext";
import { createCheckoutSession } from "./actions";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState("");

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    async function handleCheckout() {
        setError("");
        setIsCheckingOut(true);
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

    if (items.length === 0) {
        return (
            <main className="max-w-md mx-auto px-4 py-24 text-center">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2">
                    Cart
                </p>
                <h1 className="font-display text-xl mb-6">
                    Your cart is empty
                </h1>
                <Link
                    href="/"
                    className="text-sm border border-line rounded-lg px-5 py-2.5 hover:border-ink transition-colors inline-block"
                >
                    Browse products
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <h1 className="font-display text-2xl mb-6 sm:mb-8">Your cart</h1>

            <div className="flex flex-col gap-4 sm:gap-5">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-3 sm:gap-4 border-b border-line pb-4 sm:pb-5"
                    >
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden border border-line">
                            <Image
                                src={item.image_url}
                                alt={item.name}
                                fill
                                unoptimized
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                                {item.name}
                            </p>
                            <p className="font-mono text-xs text-muted mt-0.5">
                                ${item.price}
                            </p>
                        </div>

                        <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                                updateQuantity(
                                    item.id,
                                    Math.max(1, parseInt(e.target.value) || 1),
                                )
                            }
                            className="font-mono border border-line rounded-lg w-14 sm:w-16 p-1.5 text-center text-sm"
                        />

                        <p className="font-display text-sm w-14 sm:w-16 text-right hidden sm:block">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted hover:text-accent transition-colors text-xs font-mono uppercase"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6 sm:mt-8 pt-5 border-t border-line">
                {error && <p className="text-accent text-sm mb-3">{error}</p>}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted">Total</p>
                    <p className="font-display text-xl">${total.toFixed(2)}</p>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-ink text-white rounded-lg py-3.5 font-medium hover:bg-accent transition-colors disabled:bg-muted"
                >
                    {isCheckingOut ? "Redirecting…" : "Checkout"}
                </button>
            </div>
        </main>
    );
}
