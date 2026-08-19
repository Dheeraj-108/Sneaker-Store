"use client";

import { useState } from "react";
import { Sparkles, Upload } from "lucide-react";
import { createProduct } from "@/app/admin/products/new/actions";
import { generateDescription } from "@/app/admin/products/new/generate-description";
import { CATEGORIES } from "@/lib/categories";

const inputClass =
    "border border-line rounded-lg p-3 w-full text-sm focus:outline-none focus:border-ink transition-colors";
const labelClass =
    "block font-mono text-[11px] uppercase tracking-wider text-muted mb-1.5";

export default function ProductForm() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [keywords, setKeywords] = useState("");
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [genError, setGenError] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    async function handleGenerate() {
        if (!name) {
            setGenError("Add a product name first");
            return;
        }
        setGenError("");
        setIsGenerating(true);
        try {
            const result = await generateDescription({
                name,
                category,
                keywords,
            });
            setDescription(result ?? "");
        } catch (err) {
            setGenError(
                err instanceof Error ? err.message : "Generation failed",
            );
        } finally {
            setIsGenerating(false);
        }
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    }

    return (
        <form action={createProduct} className="flex flex-col gap-5 max-w-lg">
            <div>
                <label className={labelClass}>Name</label>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="e.g. Runner Low"
                />
            </div>

            <div>
                <label className={labelClass}>Category</label>
                <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className={inputClass}
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="bg-bg border border-line rounded-lg p-4">
                <label className={labelClass}>
                    Keywords for AI{" "}
                    <span className="normal-case text-muted/70">
                        — not saved, just for generation
                    </span>
                </label>
                <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="lightweight, breathable mesh, everyday wear"
                    className={`${inputClass} bg-surface`}
                />

                <div className="flex justify-between items-center mt-4 mb-1.5">
                    <label className={`${labelClass} mb-0`}>Description</label>
                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-ink transition-colors disabled:text-muted"
                    >
                        <Sparkles
                            size={13}
                            className={isGenerating ? "animate-pulse" : ""}
                        />
                        {isGenerating ? "Generating…" : "Generate with AI"}
                    </button>
                </div>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className={`${inputClass} bg-surface resize-none`}
                    placeholder="Write your own, or generate one above"
                />
                {genError && (
                    <p className="text-accent text-xs mt-1.5">{genError}</p>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className={labelClass}>Price ($)</label>
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        required
                        className={inputClass}
                        placeholder="0.00"
                    />
                </div>
                <div className="flex-1">
                    <label className={labelClass}>Stock</label>
                    <input
                        name="stock"
                        type="number"
                        required
                        className={inputClass}
                        placeholder="0"
                    />
                </div>
            </div>

            <div>
                <label className={labelClass}>Product image</label>
                <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-line rounded-lg p-6 cursor-pointer hover:border-ink transition-colors bg-bg">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                    ) : (
                        <>
                            <Upload size={18} className="text-muted" />
                            <span className="text-xs text-muted">
                                Tap to choose a photo
                            </span>
                        </>
                    )}
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            </div>

            <button
                type="submit"
                className="bg-ink text-white rounded-lg py-3.5 font-medium hover:bg-accent transition-colors mt-2"
            >
                Add product
            </button>
        </form>
    );
}
