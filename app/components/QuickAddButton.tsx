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

export default function QuickAddButton({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    if (product.stock <= 0) return null;

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    }

    return (
        <div className="absolute -bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-200 p-4">
            <button
                onClick={handleClick}
                className="w-full bg-accent text-white font-mono text-xs tracking-[1.2px] uppercase py-3 rounded-sm hover:bg-ink transition-colors"
            >
                {added ? "Added ✓" : "Quick Add"}
            </button>
        </div>
    );
}
