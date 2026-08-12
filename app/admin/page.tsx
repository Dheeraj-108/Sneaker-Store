import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";
import ConfirmButton from "../components/ConfirmButton";
import Image from "next/image";
import Link from "next/link";

export default async function AdminDashboard() {
    const supabase = await createClient();
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-display text-xl">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="text-sm bg-ink text-white rounded-lg px-4 py-2 hover:bg-accent transition-colors"
                >
                    Add product
                </Link>
            </div>

            {/* Desktop: table */}
            <table className="w-full text-sm border-collapse hidden md:table">
                <thead>
                    <tr className="text-left border-b border-line text-muted font-mono text-xs uppercase tracking-wide">
                        <th className="py-2 font-normal">Image</th>
                        <th className="font-normal">Name</th>
                        <th className="font-normal">Price</th>
                        <th className="font-normal">Stock</th>
                        <th className="font-normal">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((p) => (
                        <tr key={p.id} className="border-b border-line">
                            <td className="py-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-line">
                                    <Image
                                        src={p.image_url}
                                        alt={p.name}
                                        fill
                                        unoptimized
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                </div>
                            </td>
                            <td>{p.name}</td>
                            <td className="font-mono">${p.price}</td>
                            <td className="font-mono">{p.stock}</td>
                            <td>
                                <div className="flex gap-4 py-3">
                                    <Link
                                        href={`/admin/products/${p.id}/edit`}
                                        className="text-xs font-mono uppercase text-muted hover:text-ink transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <form
                                        action={deleteProduct.bind(null, p.id)}
                                    >
                                        <ConfirmButton
                                            confirmText={`Delete "${p.name}"? This can't be undone.`}
                                        >
                                            Delete
                                        </ConfirmButton>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Mobile: stacked cards, no horizontal scroll at all */}
            <div className="flex flex-col gap-3 md:hidden">
                {products?.map((p) => (
                    <div
                        key={p.id}
                        className="flex gap-3 border border-line rounded-lg p-3"
                    >
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-line">
                            <Image
                                src={p.image_url}
                                alt={p.name}
                                fill
                                unoptimized
                                sizes="64px"
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {p.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="font-display text-sm">
                                    ${p.price}
                                </p>
                                <p className="font-mono text-xs text-muted">
                                    {p.stock} in stock
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <Link
                                    href={`/admin/products/${p.id}/edit`}
                                    className="text-xs font-mono uppercase text-muted hover:text-ink transition-colors"
                                >
                                    Edit
                                </Link>
                                <form
                                    action={deleteProduct.bind(null, p.id)}
                                    className="flex items-center"
                                >
                                    <ConfirmButton
                                        confirmText={`Delete "${p.name}"? This can't be undone.`}
                                    >
                                        Delete
                                    </ConfirmButton>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
