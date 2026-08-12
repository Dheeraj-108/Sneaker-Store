import { login } from "./actions";
import Link from "next/link";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2 text-center">
                    Welcome back
                </p>
                <h1 className="font-display text-2xl text-center mb-8">
                    Log in
                </h1>

                {searchParams.error && (
                    <p className="bg-accent/10 text-accent text-sm rounded-lg px-3 py-2.5 mb-5">
                        {searchParams.error}
                    </p>
                )}

                <form action={login} className="flex flex-col gap-4">
                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="border border-line rounded-lg p-3 w-full text-sm focus:outline-none focus:border-ink transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="border border-line rounded-lg p-3 w-full text-sm focus:outline-none focus:border-ink transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-ink text-white rounded-lg py-3.5 font-medium hover:bg-accent transition-colors mt-2"
                    >
                        Log in
                    </button>
                </form>

                <p className="text-sm text-muted text-center mt-6">
                    No account?{" "}
                    <Link
                        href="/signup"
                        className="text-ink underline underline-offset-2"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}
