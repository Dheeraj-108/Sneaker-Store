import Link from "next/link";

export default function ProductNotFound() {
    return (
        <main className="max-w-md mx-auto p-8 text-center mt-16">
            <h1 className="text-2xl font-semibold mb-2">Product not found</h1>
            <p className="text-gray-500 mb-6">
                This product may have been removed or the link is incorrect.
            </p>
            <Link href="/" className="underline">
                Back to all products
            </Link>
        </main>
    );
}
