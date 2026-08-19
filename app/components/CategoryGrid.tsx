import Link from "next/link";
import Image from "next/image";

const categories = [
    {
        id: 1,
        label: "Category_01",
        name: "Lifestyle",
        image: "/images/category-lifestyle.jpg",
        href: "/shop?category=lifestyle",
        size: "large",
        overlay: "bg-black/20",
        tagStyle:
            "bg-black/80 backdrop-blur-sm border border-white/20 text-white",
    },
    {
        id: 2,
        label: "Category_02",
        name: "Performance",
        image: "/images/category-performance.jpg",
        href: "/shop?category=performance",
        size: "small",
        overlay: "bg-black/30",
        tagStyle:
            "bg-black/80 backdrop-blur-sm border border-white/20 text-white",
    },
    {
        id: 3,
        label: "Category_03",
        name: "Limited Editions",
        image: "/images/category-limited.jpg",
        href: "/shop?category=limited",
        size: "small",
        overlay: "bg-black/40",
        tagStyle: "bg-accent text-white",
    },
];

export default function CategoryGrid() {
    return (
        <section
            id="categories"
            className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-12 pb-24 sm:pb-32"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[624px]">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.href}
                        className={`relative border border-line overflow-hidden h-[300px] lg:h-auto ${
                            cat.size === "large"
                                ? "lg:col-span-7 lg:row-span-2"
                                : "lg:col-span-5"
                        }`}
                    >
                        <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            sizes={
                                cat.size === "large"
                                    ? "(max-width: 1024px) 100vw, 58vw"
                                    : "(max-width: 1024px) 100vw, 42vw"
                            }
                            className="object-cover"
                        />
                        <div className={`absolute inset-0 ${cat.overlay}`} />

                        <div
                            className={`absolute bottom-0 left-0 flex flex-col gap-2 ${cat.size === "large" ? "p-8" : "p-6"}`}
                        >
                            <span
                                className={`font-mono text-xs tracking-[1.2px] uppercase px-3 py-1 w-fit ${cat.tagStyle}`}
                            >
                                {cat.label}
                            </span>
                            <h3
                                className={`font-display font-bold uppercase text-white leading-none tracking-tight ${
                                    cat.size === "large"
                                        ? "text-4xl sm:text-5xl"
                                        : "text-3xl"
                                }`}
                            >
                                {cat.name}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
