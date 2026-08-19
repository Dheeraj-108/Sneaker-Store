import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Breadcrumb from "@/app/components/BreadCrumb";
import ProductGallery from "@/app/components/ProductGallery";
import ProductSizeSelector from "@/app/components/ProductSizeSelector";
import ProductAddToCart from "@/app/components/ProductAddToCart";
import RelatedProducts from "@/app/components/RelatedProducts";
import Footer from "@/app/components/Footer";
import { CATEGORIES } from "@/lib/categories";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
    if (!product) notFound();

    const isLimited = product.category === "limited";
    const highDemand = product.stock > 0 && product.stock <= 3;
    const sku = product.id.slice(0, 8).toUpperCase();
    const categoryLabel =
        CATEGORIES.find((c) => c.value === product.category)?.label ??
        product.category;

    return (
        <main className="pt-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-12 sm:py-16">
                <div className="grid lg:grid-cols-12 gap-x-24 gap-y-12">
                    <div className="lg:col-span-7">
                        <ProductGallery
                            imageUrl={product.image_url}
                            name={product.name}
                            isLimited={isLimited}
                        />
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <Breadcrumb
                                items={[
                                    { label: "Home", href: "/" },
                                    { label: "Shop", href: "/shop" },
                                    { label: product.name },
                                ]}
                            />

                            <div className="flex flex-col gap-2">
                                <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-[-0.48px] uppercase text-ink">
                                    {product.name}
                                </h1>
                                <p className="font-display font-bold text-2xl text-muted">
                                    ${product.price}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <span className="flex items-center gap-2 bg-surface-alt border border-line rounded-sm px-3.5 py-1.5">
                                    <svg
                                        width="13"
                                        height="8"
                                        viewBox="0 0 13 8"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M1 4L5 7L12 1"
                                            stroke="currentColor"
                                            strokeWidth="1.3"
                                        />
                                    </svg>
                                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                                        SKU: {sku}
                                    </span>
                                </span>

                                {highDemand ? (
                                    <span className="flex items-center gap-2 bg-accent/10 border border-accent/40 rounded-sm px-3.5 py-1.5">
                                        <svg
                                            width="9"
                                            height="11"
                                            viewBox="0 0 9 11"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M4.5 0.5C4.5 3 8 4 8 6.5C8 8.71 6.43 10 4.5 10C2.57 10 1 8.71 1 6.5C1 4 4.5 3 4.5 0.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-accent">
                                            High Demand
                                        </span>
                                    </span>
                                ) : (
                                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted border border-line rounded-sm px-3.5 py-1.5">
                                        {product.stock > 0
                                            ? `${product.stock} in stock`
                                            : "Out of stock"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <ProductSizeSelector />

                        <ProductAddToCart product={product} />

                        <div className="flex flex-col gap-6 border-t border-line pt-8">
                            <div className="flex flex-col gap-3">
                                <h4 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                                    Description
                                </h4>
                                <p className="text-muted text-base leading-relaxed whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <div className="flex-1 flex flex-col gap-1">
                                    <h5 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                                        Colorway
                                    </h5>
                                    <p className="font-mono text-xs tracking-[1.2px] text-muted">
                                        {categoryLabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedProducts
                category={product.category}
                excludeId={product.id}
            />

            <Footer />
        </main>
    );
}
