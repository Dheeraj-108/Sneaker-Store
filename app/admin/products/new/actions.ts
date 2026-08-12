"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, imageFile);

    if (uploadError) {
        throw new Error("Image upload failed: " + uploadError.message);
    }

    const {
        data: { publicUrl },
    } = await supabase.storage.from("product-images").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("products").insert({
        name,
        description,
        price,
        stock,
        category,
        image_url: publicUrl,
    });

    if (insertError) {
        throw new Error("Failed to save product: " + insertError.message);
    }

    redirect("/admin");
}
