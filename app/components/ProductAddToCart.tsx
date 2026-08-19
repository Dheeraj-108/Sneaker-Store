"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock: number;
};

export default function ProductAddToCart({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const outOfStock = product.stock <= 0;

    function handleClick() {
        addItem(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
            },
            1,
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    if (outOfStock) {
        return (
            <button
                disabled
                className="w-full flex items-center justify-center gap-3 bg-surface-alt text-line rounded-lg py-5 font-display font-bold text-2xl tracking-[0.6px] uppercase cursor-not-allowed"
            >
                Out of Stock
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-3 bg-accent text-white rounded-lg py-5 font-display font-bold text-2xl tracking-[0.6px] uppercase shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:bg-ink transition-colors"
        >
            {added ? "Added" : "Add to Cart"}
            {!added && (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </button>
    );
}
