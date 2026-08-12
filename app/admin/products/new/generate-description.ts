"use server";

import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDescription({
    name,
    category,
    keywords,
}: {
    name: string;
    category: string;
    keywords: string;
}) {
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

    if (profile?.role !== "admin") throw new Error("Not authorized");
    if (!name)
        throw new Error("Product name is required to generate a description");

    const prompt = `Write a product description for an ecommerce store.

Product name: ${name}
Category: ${category || "not specified"}
Key details: ${keywords || "not specified"}

Write 2-3 short paragraphs. Be persuasive but factual — don't invent specific
technical claims that weren't given. Match the tone of a modern, clean
sneaker/streetwear brand. Return only the description text, no headers or labels.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    return response.text;
}
