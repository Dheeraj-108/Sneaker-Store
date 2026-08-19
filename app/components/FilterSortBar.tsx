"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";

const SORT_OPTIONS = [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

export default function FilterSortBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") ?? "";
    const currentSort = searchParams.get("sort") ?? "newest";

    function updateParam(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("limit"); // reset pagination whenever filters/sort change
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="sticky top-20 z-30 backdrop-blur-md bg-bg/95 border-b border-line px-4 sm:px-6 lg:px-16 py-4">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 overflow-x-auto">
                <div className="flex items-center gap-6 shrink-0">
                    <span className="font-mono text-xs tracking-[0.6px] uppercase text-ink">
                        Filters
                    </span>
                    <span className="h-4 w-px bg-line" />

                    <select
                        value={currentCategory}
                        onChange={(e) =>
                            updateParam("category", e.target.value)
                        }
                        className="font-mono text-xs tracking-[1.2px] uppercase bg-transparent border-b border-transparent hover:border-muted focus:outline-none focus:border-ink text-muted pb-px cursor-pointer"
                    >
                        <option value="">Category</option>
                        {CATEGORIES.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>

                    <span
                        className="font-mono text-xs tracking-[1.2px] uppercase text-muted/50 cursor-not-allowed"
                        title="Coming soon"
                    >
                        Size
                    </span>
                    <span
                        className="font-mono text-xs tracking-[1.2px] uppercase text-muted/50 cursor-not-allowed"
                        title="Coming soon"
                    >
                        Color
                    </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                        Sort by:
                    </span>
                    <select
                        value={currentSort}
                        onChange={(e) => updateParam("sort", e.target.value)}
                        className="font-mono text-xs tracking-[1.2px] uppercase bg-transparent border-b border-dashed border-black focus:outline-none pb-px cursor-pointer text-ink"
                    >
                        {SORT_OPTIONS.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
