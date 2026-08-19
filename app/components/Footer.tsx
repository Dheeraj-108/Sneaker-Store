import Link from "next/link";
import Image from "next/image";

const columns = [
    {
        heading: "Shop",
        links: ["New Arrivals", "Best Sellers", "Release Calendar", "Sale"],
    },
    {
        heading: "Support",
        links: [
            "Shipping & Returns",
            "Order Tracking",
            "Size Guide",
            "Contact Us",
        ],
    },
    {
        heading: "Company",
        links: ["Our Story", "Sustainability", "Careers", "Stores"],
    },
];

export default function Footer() {
    return (
        <footer className="bg-surface-alt border-t border-line pt-20 pb-20">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col gap-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {columns.map((col) => (
                        <div key={col.heading} className="flex flex-col gap-6">
                            <h4 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                                {col.heading}
                            </h4>
                            <nav className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <Link
                                        key={link}
                                        href="#"
                                        className="text-sm text-muted hover:text-ink transition-colors"
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}

                    <div className="flex flex-col gap-6">
                        <h4 className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                            Newsletter
                        </h4>
                        <p className="text-sm text-muted leading-relaxed">
                            Get first access to drops and exclusive SG community
                            events.
                        </p>
                        <form className="flex items-end border-b border-black pb-2 pt-2 gap-2">
                            <input
                                type="email"
                                required
                                placeholder="Email address"
                                className="flex-1 min-w-0 font-mono text-sm bg-transparent placeholder:text-muted/60 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="font-mono text-xs tracking-[1.2px] uppercase shrink-0"
                            >
                                Join
                            </button>
                        </form>
                        <div className="flex gap-4 pt-2">
                            <Image
                                src="/icons/social-1.svg"
                                alt="Social link"
                                width={18}
                                height={20}
                            />
                            <Image
                                src="/icons/social-2.svg"
                                alt="Social link"
                                width={20}
                                height={20}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-line pt-8">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icons/shipping.svg"
                            alt=""
                            width={22}
                            height={16}
                        />
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                            Same-Day Delivery Available in SG
                        </span>
                    </div>
                    <p className="font-mono text-[10px] tracking-[1px] uppercase text-muted">
                        © 2024 Sneaker Co. Worldwide shipping enabled. Built for
                        the culture.
                    </p>
                </div>
            </div>
        </footer>
    );
}
