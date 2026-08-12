"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") redirect("/");

    const { data: product } = await supabase
        .from("products")
        .select("image_url")
        .eq("id", productId)
        .single();

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) throw new Error("Failed to delete product: " + error.message);

    if (product?.image_url) {
        const fileName = product.image_url.split("/").pop();
        if (fileName) {
            await supabase.storage.from("product-images").remove([fileName]);
        }
    }

    revalidatePath("/admin");
}
