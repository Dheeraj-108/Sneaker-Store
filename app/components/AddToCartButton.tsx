"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

type Product = {
    id: string;
    name: string;
    price: number;
    image_url: string;
};

export default function AddToCartButton({
    product,
    disabled,
}: {
    product: Product;
    disabled: boolean;
}) {
    const [added, setAdded] = useState(false);
    const { addItem } = useCart();

    function handleClick() {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className="bg-black text-white rounded p-3 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
            {disabled ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
        </button>
    );
}
