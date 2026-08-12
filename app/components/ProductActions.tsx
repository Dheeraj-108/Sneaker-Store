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

export default function ProductActions({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const outOfStock = product.stock <= 0;

    function handleAdd() {
        addItem(
            {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
            },
            quantity,
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    if (outOfStock) {
        return (
            <button
                disabled
                className="w-full bg-line text-muted rounded-lg py-3.5 font-medium cursor-not-allowed"
            >
                Out of stock
            </button>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border border-line rounded-lg w-fit">
                <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center text-muted hover:text-ink"
                    aria-label="Decrease quantity"
                >
                    −
                </button>
                <span className="font-mono text-sm w-8 text-center">
                    {quantity}
                </span>
                <button
                    onClick={() =>
                        setQuantity((q) => Math.min(product.stock, q + 1))
                    }
                    className="w-10 h-11 flex items-center justify-center text-muted hover:text-ink"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>

            <button
                onClick={handleAdd}
                className="flex-1 bg-ink text-white rounded-lg py-3.5 font-medium hover:bg-accent transition-colors"
            >
                {added ? "Added ✓" : "Add to cart"}
            </button>
        </div>
    );
}
