import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "./actions";
import { notFound } from "next/navigation";

export default async function EditProductPage({
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

    const updateProductWithId = await updateProduct.bind(null, product.id);

    return (
        <div className="max-w-lg">
            <h1 className="text-xl font-semibold mb-6">Edit product</h1>

            <form action={updateProductWithId} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input
                        name="name"
                        type="text"
                        defaultValue={product.name}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        defaultValue={product.description}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Price ($)</label>
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            defaultValue={product.price}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Stock</label>
                        <input
                            name="stock"
                            type="number"
                            defaultValue={product.stock}
                            required
                            className="border rounded p-2 w-full"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1">Category</label>
                    <input
                        name="category"
                        type="text"
                        defaultValue={product.category}
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Current image</label>
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded mb-2"
                    />
                    <label className="block text-sm mb-1">
                        Replace image (optional)
                    </label>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="border rounded p-2 w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-black text-white rounded p-2 mt-2"
                >
                    Save changes
                </button>
            </form>
        </div>
    );
}
