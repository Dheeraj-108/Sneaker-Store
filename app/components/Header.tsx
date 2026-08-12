import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/logout/actions";
import CartBadge from "./CartBadge";
import Link from "next/link";

export default async function Header() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="border-b border-line bg-surface sticky top-0 z-10">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                <Link href="/" className="font-display text-lg tracking-tight">
                    SNEAKER CO
                </Link>

                {user ? (
                    <div className="flex items-center gap-6 text-sm">
                        <CartBadge />
                        <span className="font-mono text-xs text-muted hidden sm:inline">
                            {user.email}
                        </span>
                        <form action={logout}>
                            <button
                                type="submit"
                                className="text-muted hover:text-ink transition-colors"
                            >
                                Log out
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex items-center gap-6 text-sm">
                        <CartBadge />
                        <Link
                            href="/login"
                            className="text-muted hover:text-ink transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="text-ink border border-line rounded px-4 py-1.5 hover:border-ink transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
