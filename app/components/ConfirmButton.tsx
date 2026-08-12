"use client";

export default function ConfirmButton({
    children,
    confirmText,
}: {
    children: React.ReactNode;
    confirmText: string;
}) {
    return (
        <button
            type="submit"
            className="text-xs font-mono uppercase text-muted hover:text-accent transition-colors"
            onClick={(e) => {
                if (!confirm(confirmText)) e.preventDefault();
            }}
        >
            {children}
        </button>
    );
}
