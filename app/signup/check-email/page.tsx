import Link from "next/link";

export default function CheckEmailPage() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center">
                <h1 className="font-display text-2xl mb-2">Check your email</h1>
                <p className="text-muted text-sm mb-6">
                    We sent you a confirmation link to finish creating your
                    account.
                </p>
                <Link
                    href="/login"
                    className="text-sm text-ink underline underline-offset-2"
                >
                    Back to log in
                </Link>
            </div>
        </main>
    );
}
