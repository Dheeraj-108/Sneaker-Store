"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartBadge() {
    const { items } = useCart();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link
            href="/cart"
            className="relative text-muted hover:text-ink transition-colors"
        >
            Cart
            {count > 0 && (
                <span className="absolute -top-2 -right-4 bg-accent text-white font-mono text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                </span>
            )}
        </Link>
    );
}
