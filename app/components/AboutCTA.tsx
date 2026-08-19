import Link from "next/link";

export default function AboutCTA() {
    return (
        <section className="relative bg-ink overflow-hidden px-4 sm:px-6 lg:px-16 py-20 sm:py-28">
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.06]"
                aria-hidden="true"
                preserveAspectRatio="none"
            >
                <defs>
                    <pattern
                        id="about-cta-grid"
                        width="48"
                        height="48"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M48 0H0V48"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#about-cta-grid)" />
            </svg>

            <div className="relative max-w-[1440px] mx-auto flex flex-col items-center text-center gap-8">
                <span className="font-mono text-xs tracking-[1.2px] uppercase text-white/60">
                    The Collection Awaits
                </span>

                <h2 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em] uppercase text-white max-w-3xl">
                    Enter The Vault
                </h2>

                <p className="text-white/70 text-lg max-w-xl leading-relaxed">
                    Every drop is verified, every pair has a story. Step in and
                    find the one that&apos;s yours.
                </p>

                <Link
                    href="/shop"
                    className="inline-block bg-accent text-white font-mono text-xs tracking-[1.2px] uppercase px-8 py-4 hover:bg-white hover:text-ink transition-colors"
                >
                    Back to Shop
                </Link>
            </div>
        </section>
    );
}
