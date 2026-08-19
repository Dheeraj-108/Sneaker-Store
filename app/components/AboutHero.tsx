import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="relative h-[560px] w-full overflow-hidden flex items-end px-4 sm:px-6 lg:px-16 pb-12 sm:pb-20">
            <Image
                src="/images/about-hero.jpg"
                alt="Sneaker Co curated footwear"
                fill
                priority
                sizes="100vw"
                className="object-cover mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

            <div className="relative max-w-[1440px] mx-auto w-full flex flex-col gap-4">
                <span className="inline-flex w-fit bg-black text-white font-mono text-xs tracking-[1.2px] uppercase px-4 py-2">
                    Sneaker Co. Manifesto
                </span>

                <h1 className="font-display font-bold text-6xl sm:text-7xl lg:text-[72px] leading-[0.9] tracking-[-0.05em] uppercase text-ink max-w-4xl">
                    Beyond
                    <br />
                    The Box
                </h1>

                <p className="text-lg text-muted max-w-2xl leading-relaxed pt-2">
                    We don&apos;t just sell shoes; we curate culture. Born in
                    the heart of Singapore, Sneaker Co. is a sanctuary for the
                    discerning collector and the passionate newcomer alike.
                </p>
            </div>
        </section>
    );
}
