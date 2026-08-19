"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartBadge() {
    const { items } = useCart();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link href="/cart" className="relative" aria-label="Cart">
            <Image src="/icons/bag.svg" alt="" width={16} height={20} />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white font-body font-bold text-[10px] rounded-full size-4 flex items-center justify-center">
                    {count}
                </span>
            )}
        </Link>
    );
}
