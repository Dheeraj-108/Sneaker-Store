import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-[600px] min-h-[520px] w-full overflow-hidden">
            <Image
                src="/images/hero-sneakers.jpg"
                alt="Lifestyle photo of sneakers"
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="relative h-full max-w-[1440px] mx-auto flex items-end px-4 sm:px-6 lg:px-16 pb-12 sm:pb-20 pt-32">
                <div className="max-w-[672px]">
                    <div className="flex items-center gap-2 opacity-80 mb-6">
                        <span className="h-px w-8 bg-white" />
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-white">
                            FW24 Collection Manifest
                        </span>
                    </div>

                    <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[72px] leading-[0.9] tracking-tight uppercase text-white mb-6">
                        Step Into
                        <br />
                        The Drop
                    </h1>

                    <p className="text-lg text-[#E8E8E5] max-w-md mb-8 leading-relaxed">
                        Engineered for the streets. The new standard in
                        utilitarian aesthetics and all-day performance.
                    </p>

                    <Link
                        href="/shop"
                        className="inline-block bg-accent text-white font-mono text-xs tracking-[1.2px] uppercase px-8 py-4 hover:bg-ink transition-colors"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
