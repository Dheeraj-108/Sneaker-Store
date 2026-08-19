"use client";

import { useState } from "react";

const SIZES = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5"];

// Deliberate placeholder: there's no size/variant inventory table yet, so
// this only tracks local UI selection state. It doesn't affect stock,
// pricing, or what gets added to the cart — matches the same
// honestly-inert pattern used for Size/Color filters on the Shop page.
const SOLD_OUT_SIZES = new Set(["11.5"]);
const DEFAULT_SIZE = "9";

export default function ProductSizeSelector() {
    const [selected, setSelected] = useState(DEFAULT_SIZE);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between w-full">
                <h3 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                    Select Size (US)
                </h3>
                <button
                    type="button"
                    className="font-mono text-xs tracking-[1.2px] text-muted underline underline-offset-2"
                >
                    Size Guide
                </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 w-full">
                {SIZES.map((size) => {
                    const soldOut = SOLD_OUT_SIZES.has(size);
                    const isSelected = selected === size;

                    return (
                        <button
                            key={size}
                            type="button"
                            disabled={soldOut}
                            onClick={() => setSelected(size)}
                            className={`relative font-mono text-xs tracking-[1.2px] text-center rounded-sm py-3 border transition-colors ${
                                soldOut
                                    ? "border-line bg-surface-alt/50 text-line line-through cursor-not-allowed"
                                    : isSelected
                                      ? "border-ink bg-ink text-white"
                                      : "border-line bg-bg text-ink hover:border-ink"
                            }`}
                        >
                            {size}
                            {isSelected && !soldOut && (
                                <span className="absolute -top-2 -right-2 size-4 rounded-full bg-accent border-2 border-bg" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
