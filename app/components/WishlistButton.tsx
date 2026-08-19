"use client";

import Image from "next/image";

export default function WishlistButton() {
    return (
        <button
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 size-8 rounded-full bg-bg/50 backdrop-blur-sm border border-line flex items-center justify-center"
        >
            <Image src="/icons/heart.svg" alt="" width={13} height={12} />
        </button>
    );
}
