"use client";

import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

export default function ClearCartOnMount() {
    const { clearCart } = useCart();
    const cleared = useRef(false);

    useEffect(() => {
        if (!cleared.current) {
            clearCart();
            cleared.current = true;
        }
    }, [clearCart]);

    return null;
}
