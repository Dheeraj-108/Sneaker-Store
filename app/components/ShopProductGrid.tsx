import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import QuickAddButton from "./QuickAddButton";
import WishlistButton from "./WishlistButton";

const PAGE_SIZE = 12;

export default async function ShopProductGrid({
    category,
    sort,
    limit,
}: {
    category?: string;
    sort?: string;
    limit: number;
}) {
    const supabase = await createClient();

    let query = supabase.from("products").select("*", { count: "exact" });

    if (category) query = query.eq("category", category);

    if (sort === "price-asc") query = query.order("price", { ascending: true });
    else if (sort === "price-desc")
        query = query.order("price", { ascending: false });
    else query = query.order("created_at", { ascending: false });

    const { data: products, count } = await query.range(0, limit - 1);

    if (!products || products.length === 0) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-24 text-center text-muted">
                No products match these filters.
            </div>
        );
    }

    const hasMore = (count ?? 0) > products.length;
    const nextParams = new URLSearchParams();
    if (category) nextParams.set("category", category);
    if (sort) nextParams.set("sort", sort);
    nextParams.set("limit", String(limit + PAGE_SIZE));

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16 flex flex-col gap-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    const isNew =
                        new Date(product.created_at).getTime() >
                        Date.now() - 14 * 24 * 60 * 60 * 1000;
                    const isLimited = product.category === "limited";

                    return (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group flex flex-col gap-4"
                        >
                            <div className="relative aspect-[4/5] bg-surface-alt border border-line rounded-sm overflow-hidden">
                                <Image
                                    src={product.image_url}
                                    alt={product.name}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    className="object-cover"
                                />

                                {(isNew || isLimited) && (
                                    <span
                                        className={`absolute top-3 left-3 font-mono text-[10px] tracking-[1px] uppercase text-white px-2 py-1 ${
                                            isLimited ? "bg-muted" : "bg-black"
                                        }`}
                                    >
                                        {isLimited ? "Limited" : "New"}
                                    </span>
                                )}

                                <WishlistButton />

                                <QuickAddButton product={product} />
                            </div>

                            <div className="flex flex-col gap-1 px-1">
                                <div className="flex items-start justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-mono text-[10px] tracking-[1px] uppercase text-muted">
                                            [ {product.category} ]
                                        </span>
                                        <h3 className="font-display font-bold text-xl tracking-tight uppercase text-ink">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <span className="font-display font-bold text-xl text-ink shrink-0">
                                        ${product.price}
                                    </span>
                                </div>
                                <p className="font-mono text-[11px] uppercase text-muted/80 pt-2">
                                    SKU: {product.id.slice(0, 8).toUpperCase()}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pb-8">
                    <Link
                        href={`?${nextParams.toString()}`}
                        className="border border-line px-8 py-4 font-mono text-xs tracking-[1.2px] uppercase text-ink hover:border-ink transition-colors"
                    >
                        Load More Results
                    </Link>
                </div>
            )}
        </div>
    );
}
