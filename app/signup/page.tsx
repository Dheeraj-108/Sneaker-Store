import { signup } from "./actions";
import Link from "next/link";

export default function SignupPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-2 text-center">
                    Get started
                </p>
                <h1 className="font-display text-2xl text-center mb-8">
                    Create an account
                </h1>

                {searchParams.error && (
                    <p className="bg-accent/10 text-accent text-sm rounded-lg px-3 py-2.5 mb-5">
                        {searchParams.error}
                    </p>
                )}

                <form action={signup} className="flex flex-col gap-4">
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
                            minLength={6}
                            className="border border-line rounded-lg p-3 w-full text-sm focus:outline-none focus:border-ink transition-colors"
                        />
                        <p className="text-xs text-muted mt-1.5">
                            At least 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="bg-ink text-white rounded-lg py-3.5 font-medium hover:bg-accent transition-colors mt-2"
                    >
                        Sign up
                    </button>
                </form>

                <p className="text-sm text-muted text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-ink underline underline-offset-2"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}
