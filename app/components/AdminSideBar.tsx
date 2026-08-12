"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
    { href: "/admin", label: "Products" },
    { href: "/admin/products/new", label: "Add product" },
];

export default function AdminSidebar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile top bar — normal document flow, sits below the site header, not floating over it */}
            <div className="md:hidden flex items-center gap-3 border-b border-line px-4 py-3 bg-surface">
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                    className="text-ink"
                >
                    <Menu size={20} />
                </button>
                <p className="font-display text-sm">Admin</p>
            </div>

            {/* Backdrop, only when drawer is open */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    aria-hidden="true"
                />
            )}

            <aside
                className={`
          fixed md:static top-0 left-0 h-full md:h-auto w-64 md:w-56
          bg-surface border-r border-line p-6 z-50
          transition-transform duration-200 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
            >
                <div className="flex justify-between items-center mb-8 md:mb-6">
                    <p className="font-display text-sm">Admin</p>
                    <button
                        onClick={() => setOpen(false)}
                        className="md:hidden text-muted"
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex flex-col gap-1">
                    {links.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`text-sm rounded-lg px-3 py-2 transition-colors ${
                                    active
                                        ? "bg-ink text-white"
                                        : "text-muted hover:text-ink hover:bg-bg"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
