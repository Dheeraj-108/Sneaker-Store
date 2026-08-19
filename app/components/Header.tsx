import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/logout/actions";
import CartBadge from "./CartBadge";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

export default async function Header() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-bg/80 border-b border-line">
            <div className="max-w-360 mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-16">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/icons/logo.png"
                            alt=""
                            width={32}
                            height={32}
                        />
                        <span className="font-display font-bold text-[32px] leading-none tracking-[-0.8px] uppercase text-ink hidden sm:inline">
                            Sneaker Co
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink href="/">New Drops</NavLink>
                        <NavLink href="/shop">Shop All</NavLink>
                        <NavLink href="/#categories">Categories</NavLink>
                        <NavLink href="/about">About</NavLink>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <button aria-label="Search" className="hidden sm:block">
                        <Image
                            src="/icons/search.svg"
                            alt=""
                            width={18}
                            height={18}
                        />
                    </button>

                    {user ? (
                        <form action={logout}>
                            <button aria-label="Account" type="submit">
                                <Image
                                    src="/icons/user.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                />
                            </button>
                        </form>
                    ) : (
                        <Link href="/login" aria-label="Account">
                            <Image
                                src="/icons/user.svg"
                                alt=""
                                width={16}
                                height={16}
                            />
                        </Link>
                    )}

                    <CartBadge />

                    <button
                        aria-label="Menu"
                        className="bg-black rounded-full size-8 flex items-center justify-center"
                    >
                        <Image
                            src="/icons/menu-dot.svg"
                            alt=""
                            width={12}
                            height={12}
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
