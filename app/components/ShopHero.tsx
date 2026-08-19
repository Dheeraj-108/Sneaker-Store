import { createClient } from "@/lib/supabase/server";

export default async function ShopHero() {
    const supabase = await createClient();
    const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

    return (
        <div className="border-b border-line flex flex-col items-center justify-center pt-16 pb-12 px-4 sm:px-6 lg:px-16">
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[72px] leading-[1.1] tracking-tight uppercase text-center mix-blend-difference text-ink pb-4">
                All Footwear
            </h1>
            <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                    [ {count ?? 0} Results ]
                </span>
                <span className="size-1 rounded-full bg-black" />
                <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                    Winter Drop 2024
                </span>
            </div>
        </div>
    );
}
