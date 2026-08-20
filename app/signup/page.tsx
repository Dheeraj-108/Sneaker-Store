import { signup } from "./actions";
import Link from "next/link";
import { signInWithGoogle } from "../auth/action";

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;
    return (
        <main className="pt-20 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm flex flex-col gap-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                        Get Started
                    </span>
                    <h1 className="font-display font-bold text-3xl uppercase text-ink">
                        Create Account
                    </h1>
                </div>

                {error && (
                    <p className="font-mono text-xs tracking-[1.2px] bg-accent/10 border border-accent/40 text-accent rounded-sm px-4 py-3">
                        {error}
                    </p>
                )}

                <form action={signup} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="border border-line rounded-sm px-4 py-3 text-sm bg-surface focus:outline-none focus:border-ink transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            className="border border-line rounded-sm px-4 py-3 text-sm bg-surface focus:outline-none focus:border-ink transition-colors"
                        />
                        <p className="font-mono text-[11px] tracking-[1.2px] uppercase text-muted mt-1">
                            At least 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="bg-accent text-white rounded-sm py-4 font-display font-bold text-lg uppercase tracking-[0.4px] hover:bg-ink transition-colors mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="font-mono text-xs tracking-[1.2px] uppercase text-muted text-center">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-ink underline underline-offset-2"
                    >
                        Log In
                    </Link>
                </p>

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-line" />
                    <span className="font-mono text-[10px] tracking-[1.2px] uppercase text-muted">
                        Or
                    </span>
                    <div className="flex-1 h-px bg-line" />
                </div>

                <form action={signInWithGoogle}>
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-3 border border-line rounded-sm py-3.5 font-mono text-xs tracking-[1.2px] uppercase text-ink hover:border-ink transition-colors"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                        >
                            <path
                                fill="#4285F4"
                                d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.68 3.68 0 0 1-1.6 2.42v2h2.58c1.51-1.4 2.4-3.45 2.4-5.88Z"
                            />
                            <path
                                fill="#34A853"
                                d="M8 16c2.16 0 3.97-.72 5.29-1.94l-2.58-2c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.86v2.07A8 8 0 0 0 8 16Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M3.52 9.53a4.8 4.8 0 0 1 0-3.06V4.4H.86a8 8 0 0 0 0 7.2l2.66-2.07Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M8 3.18c1.17 0 2.23.4 3.06 1.19l2.3-2.3A7.94 7.94 0 0 0 8 0 8 8 0 0 0 .86 4.4l2.66 2.07C4.15 4.58 5.92 3.18 8 3.18Z"
                            />
                        </svg>
                        Continue with Google
                    </button>
                </form>

                <p className="font-mono text-xs tracking-[1.2px] uppercase text-muted text-center"></p>
            </div>
        </main>
    );
}
