import Image from "next/image";

export default function AboutStory() {
    return (
        <section className="bg-surface-alt px-4 sm:px-6 lg:px-16 py-16 sm:py-24">
            <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-6 lg:gap-6 items-center">
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                            Est. 2018
                        </span>
                        <h2 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-[-0.48px] uppercase text-ink">
                            Elevating
                            <br />
                            The Culture
                        </h2>
                    </div>

                    <p className="text-muted text-base leading-relaxed">
                        What started as a covert operation out of a cramped
                        shophouse has evolved into SG&apos;s premier destination
                        for rare, archival, and culturally significant footwear.
                        We source meticulously, verify ruthlessly, and present
                        with an unwavering commitment to the craft. Every pair
                        in our vault tells a story of design, subculture, and
                        global influence.
                    </p>

                    <div className="flex gap-4">
                        <div className="flex-1 bg-bg px-6 pt-6 pb-10">
                            <p className="font-display font-bold text-5xl text-ink">
                                5K+
                            </p>
                            <p className="font-mono text-xs tracking-[1.2px] uppercase text-muted pt-2">
                                Pairs Verified
                            </p>
                        </div>
                        <div className="flex-1 bg-bg px-6 pt-6 pb-6">
                            <p className="font-display font-bold text-5xl text-ink">
                                100%
                            </p>
                            <p className="font-mono text-xs tracking-[1.2px] uppercase text-muted pt-2">
                                Authenticity
                                <br />
                                Guarantee
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                    <div className="relative aspect-[3/4] bg-line overflow-hidden">
                        <Image
                            src="/images/about-story-1.jpg"
                            alt="Sneaker Co store interior"
                            fill
                            sizes="(max-width: 1024px) 50vw, 30vw"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative aspect-[3/4] bg-line overflow-hidden mt-12">
                        <Image
                            src="/images/about-story-2.jpg"
                            alt="Sneaker detail close-up"
                            fill
                            sizes="(max-width: 1024px) 50vw, 30vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
