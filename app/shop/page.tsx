import { Suspense } from "react";
import ShopHero from "../components/ShopHero";
import FilterSortBar from "../components/FilterSortBar";
import ShopProductGrid from "../components/ShopProductGrid";
import Footer from "../components/Footer";

const PAGE_SIZE = 12;

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string; limit?: string }>;
}) {
    const { category, sort, limit } = await searchParams;
    const resolvedLimit = limit ? parseInt(limit) : PAGE_SIZE;

    return (
        <main className="pt-20">
            <ShopHero />

            <Suspense
                fallback={<div className="h-[57px] border-b border-line" />}
            >
                <FilterSortBar />
            </Suspense>

            <ShopProductGrid
                category={category}
                sort={sort}
                limit={resolvedLimit}
            />

            <Footer />
        </main>
    );
}
