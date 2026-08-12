"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateProduct(productId: string, formData: FormData) {
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

    const updates: Record<string, unknown> = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        stock: parseInt(formData.get("stock") as string),
        category: formData.get("category") as string,
    };

    const imageFile = formData.get("image") as File;

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(fileName, imageFile);

        if (uploadError)
            throw new Error("Image upload failed: " + uploadError.message);

        const { data: publicUrlData } = supabase.storage
            .from("product-images")
            .getPublicUrl(fileName);

        updates.image_url = publicUrlData.publicUrl;
    }

    const { error: updateError } = await supabase
        .from("products")
        .update(updates)
        .eq("id", productId);

    if (updateError) {
        throw new Error("Failed to update product: " + updateError.message);
    }

    redirect("/admin");
}
