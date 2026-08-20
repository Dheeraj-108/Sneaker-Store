"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/logout/actions";

export default function UserMenu({ email }: { email: string | null }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!email) {
        return (
            <Link href="/login" aria-label="Account">
                <Image src="/icons/user.svg" alt="" width={16} height={16} />
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                aria-label="Account menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex items-center justify-center"
            >
                <Image src="/icons/user.svg" alt="" width={16} height={16} />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-surface border border-line rounded-sm shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-line">
                        <p className="font-mono text-[10px] tracking-[1.2px] uppercase text-muted">
                            Signed in as
                        </p>
                        <p className="font-body text-sm text-ink truncate mt-0.5">
                            {email}
                        </p>
                    </div>

                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full text-left px-4 py-3 font-mono text-xs tracking-[1.2px] uppercase text-ink hover:bg-surface-alt transition-colors"
                        >
                            Log Out
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
