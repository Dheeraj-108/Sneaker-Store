"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "../context/CartContext";
import CartQuantityStepper from "./CartQuantityStepper";

export default function CartLineItem({ item }: { item: CartItem }) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div className="flex items-center gap-4 sm:gap-6 border-b border-line py-6">
            <Link
                href={`/products/${item.id}`}
                className="relative size-20 sm:size-24 shrink-0 bg-surface-alt border border-line rounded-sm overflow-hidden"
            >
                <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    unoptimized
                    sizes="96px"
                    className="object-cover"
                />
            </Link>

            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <Link
                    href={`/products/${item.id}`}
                    className="font-body font-bold text-base uppercase text-ink truncate hover:text-accent transition-colors"
                >
                    {item.name}
                </Link>
                <span className="font-mono text-xs tracking-[1.2px] text-muted">
                    ${item.price.toFixed(2)}
                </span>
            </div>

            <CartQuantityStepper
                quantity={item.quantity}
                onChange={(quantity) => updateQuantity(item.id, quantity)}
            />

            <span className="font-display font-bold text-base w-16 sm:w-20 text-right hidden sm:block">
                ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
                type="button"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeItem(item.id)}
                className="text-muted hover:text-accent transition-colors shrink-0"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M2 4h12M5.5 4V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V4M6.5 7.5v4M9.5 7.5v4M3.5 4l.6 8.4a1 1 0 0 0 1 .9h5.8a1 1 0 0 0 1-.9L12.5 4"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
}
