import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
    const supabase = await createClient();
    const { data: products, error } = await supabase
        .from("products")
        .select("*");

    if (error) {
        return (
            <p className="p-8 text-muted">
                Something went wrong loading products.
            </p>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <h1 className="font-display text-2xl sm:text-3xl mb-6 sm:mb-8">
                Products
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products?.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group"
                    >
                        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg bg-surface border border-line">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {product.category && (
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                {product.category}
                            </span>
                        )}
                        <h2 className="text-sm font-medium mt-0.5">
                            {product.name}
                        </h2>
                        <p className="font-display text-sm mt-0.5">
                            ${product.price}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
