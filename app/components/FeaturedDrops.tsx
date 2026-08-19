import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedDrops() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

    if (!products || products.length === 0) return null;

    return (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-24 flex flex-col gap-12">
            <div className="flex items-end justify-between border-b border-black pb-4">
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[48px] leading-none tracking-tight uppercase">
                    Featured Drops
                </h2>
                <Link href="/shop" className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted hidden sm:inline">
                        View All Records
                    </span>
                    <Image
                        src="/icons/arrow-right.svg"
                        alt=""
                        width={11}
                        height={11}
                    />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="border border-line flex flex-col"
                    >
                        <div className="relative w-full h-[366px] bg-surface-alt">
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 100vw, 33vw"
                                className="object-cover"
                            />
                            <span className="absolute top-4 left-4 bg-bg border border-line font-mono text-[10px] tracking-[1px] uppercase px-2.5 py-1">
                                [New Drop]
                            </span>
                        </div>

                        <div className="bg-bg flex flex-col gap-4 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-1">
                                    <p className="font-body font-bold text-base text-ink">
                                        {product.name}
                                    </p>
                                    <p className="font-mono text-xs tracking-[1.2px] text-muted">
                                        SNK-
                                        {product.id.slice(0, 3).toUpperCase()}-
                                        {product.id.slice(3, 6).toUpperCase()}
                                    </p>
                                </div>
                                <p className="font-display font-bold text-2xl text-ink shrink-0">
                                    ${product.price}
                                </p>
                            </div>

                            <div className="h-px bg-line w-full" />

                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                                    Acquire Unit
                                </span>
                                <Image
                                    src="/icons/arrow-small.svg"
                                    alt=""
                                    width={13}
                                    height={9}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
