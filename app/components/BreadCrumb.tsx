import Link from "next/link";

export default function Breadcrumb({
    items,
}: {
    items: { label: string; href?: string }[];
}) {
    return (
        <nav className="flex items-center gap-2 text-xs font-mono text-muted mb-6 overflow-x-auto whitespace-nowrap">
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="hover:text-ink transition-colors"
                        >
                            {item.label.toUpperCase()}
                        </Link>
                    ) : (
                        <span className="text-ink">
                            {item.label.toUpperCase()}
                        </span>
                    )}
                    {i < items.length - 1 && <span>/</span>}
                </span>
            ))}
        </nav>
    );
}
