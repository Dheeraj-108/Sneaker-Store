"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import CartLineItem from "../components/CartLineItem";
import CartSummary from "../components/CartSummary";
import Footer from "../components/Footer";

export default function CartPage() {
    const { items } = useCart();

    if (items.length === 0) {
        return (
            <main className="pt-20">
                <div className="max-w-md mx-auto px-4 py-24 sm:py-32 text-center flex flex-col items-center gap-4">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                        Cart
                    </span>
                    <h1 className="font-display font-bold text-3xl uppercase text-ink">
                        Your cart is empty
                    </h1>
                    <p className="text-muted text-sm leading-relaxed">
                        Looks like you haven&apos;t added anything to your vault
                        yet.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block bg-accent text-white font-mono text-xs tracking-[1.2px] uppercase px-8 py-4 hover:bg-ink transition-colors mt-2"
                    >
                        Browse Products
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="pt-20">
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-12 gap-x-16 gap-y-10">
                <div className="lg:col-span-7">
                    <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase text-ink mb-8">
                        Your Cart
                    </h1>

                    <div className="flex flex-col">
                        {items.map((item) => (
                            <CartLineItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <CartSummary items={items} />
                </div>
            </div>

            <Footer />
        </main>
    );
}
