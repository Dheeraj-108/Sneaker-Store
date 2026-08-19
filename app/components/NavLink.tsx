"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive =
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={
                isActive
                    ? "font-body font-bold text-base uppercase text-ink"
                    : "font-mono text-xs tracking-[1.2px] uppercase text-muted hover:text-ink transition-colors"
            }
        >
            {children}
        </Link>
    );
}
