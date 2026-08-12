import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/app/components/BreadCrumb";
import ProductActions from "@/app/components/ProductActions";

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

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <Breadcrumb
                items={[
                    { label: "Home", href: "/" },
                    ...(product.category
                        ? [
                              {
                                  label: product.category,
                                  href: `/?category=${product.category}`,
                              },
                          ]
                        : []),
                    { label: product.name },
                ]}
            />

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface border border-line">
                    <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        {product.category && (
                            <span className="font-mono text-[10px] uppercase tracking-wider border border-line rounded-full px-2.5 py-1 text-muted">
                                {product.category}
                            </span>
                        )}
                        <span
                            className={`font-mono text-[10px] uppercase tracking-wider rounded-full px-2.5 py-1 ${
                                product.stock > 0
                                    ? "text-ink border border-line"
                                    : "text-white bg-muted"
                            }`}
                        >
                            {product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"}
                        </span>
                    </div>

                    <h1 className="font-display text-2xl sm:text-3xl leading-tight mb-2">
                        {product.name}
                    </h1>
                    <p className="font-display text-xl mb-6">
                        ${product.price}
                    </p>

                    <p className="text-muted leading-relaxed mb-8 whitespace-pre-line">
                        {product.description}
                    </p>

                    <ProductActions product={product} />
                </div>
            </div>
        </main>
    );
}
