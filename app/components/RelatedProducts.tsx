import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default async function RelatedProducts({
    category,
    excludeId,
}: {
    category: string | null;
    excludeId: string;
}) {
    if (!category) return null;

    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .neq("id", excludeId)
        .order("created_at", { ascending: false })
        .limit(3);

    if (!products || products.length === 0) return null;

    const categoryLabel =
        CATEGORIES.find((c) => c.value === category)?.label ?? category;

    return (
        <section className="bg-surface-alt border-t border-line py-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col gap-12">
                <div className="flex items-end justify-between">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl leading-none tracking-tight uppercase text-ink">
                        More from {categoryLabel} Line
                    </h2>
                    <Link
                        href={`/shop?category=${category}`}
                        className="flex items-center gap-1 shrink-0"
                    >
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                            View All
                        </span>
                        <svg
                            width="9"
                            height="9"
                            viewBox="0 0 9 9"
                            fill="none"
                            aria-hidden="true"
                            className="text-muted"
                        >
                            <path
                                d="M1 8L8 1M8 1H2M8 1V7"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const isNew =
                            new Date(product.created_at).getTime() >
                            Date.now() - 14 * 24 * 60 * 60 * 1000;

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="flex flex-col gap-4"
                            >
                                <div className="relative aspect-square bg-bg border border-line rounded-lg overflow-hidden">
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 100vw, 33vw"
                                        className="object-cover"
                                    />
                                    {isNew && (
                                        <span className="absolute top-3 left-3 bg-black text-white font-mono text-[10px] uppercase px-2 py-1 rounded-sm">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-start justify-between">
                                        <h3 className="font-body font-bold text-lg uppercase text-ink">
                                            {product.name}
                                        </h3>
                                        <span className="font-mono text-xs tracking-[1.2px] text-muted shrink-0">
                                            ${product.price}
                                        </span>
                                    </div>
                                    <p className="font-mono text-xs tracking-[1.2px] text-muted">
                                        {categoryLabel}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
