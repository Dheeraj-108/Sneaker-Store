"use client";

export default function CartQuantityStepper({
    quantity,
    onChange,
}: {
    quantity: number;
    onChange: (quantity: number) => void;
}) {
    return (
        <div className="flex items-center border border-line rounded-sm">
            <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onChange(Math.max(1, quantity - 1))}
                className="size-9 flex items-center justify-center font-mono text-base text-ink hover:bg-surface-alt transition-colors disabled:text-line disabled:hover:bg-transparent"
                disabled={quantity <= 1}
            >
                −
            </button>

            <span className="font-mono text-sm w-8 text-center tabular-nums">
                {quantity}
            </span>

            <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onChange(quantity + 1)}
                className="size-9 flex items-center justify-center font-mono text-base text-ink hover:bg-surface-alt transition-colors"
            >
                +
            </button>
        </div>
    );
}
