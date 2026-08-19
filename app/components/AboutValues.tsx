const VALUES = [
    {
        number: "01",
        title: "Authenticity",
        description:
            "Every pair passes a rigorous, multi-point verification process before it ever reaches our shelves. No exceptions, no shortcuts.",
        icon: (
            <path
                d="M12 2L3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6l-9-4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        ),
    },
    {
        number: "02",
        title: "Craft",
        description:
            "We celebrate the designers, cobblers, and cultural moments behind every silhouette — the story is as important as the shoe.",
        icon: (
            <path
                d="M12 2v20M2 12h20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        ),
    },
    {
        number: "03",
        title: "Community",
        description:
            "From first-time collectors to seasoned heads, our doors — physical and digital — are open to anyone who respects the culture.",
        icon: (
            <path
                d="M16 11a4 4 0 1 0-4-4M8 21v-2a4 4 0 0 1 4-4h0M2 21v-2a4 4 0 0 1 4-4M16 21v-2a4 4 0 0 0-3-3.87"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        ),
    },
];

export default function AboutValues() {
    return (
        <section className="bg-bg px-4 sm:px-6 lg:px-16 py-16 sm:py-24">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-16">
                <div className="max-w-2xl flex flex-col gap-4">
                    <span className="font-mono text-xs tracking-[1.2px] uppercase text-accent">
                        The Blueprint
                    </span>
                    <h2 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-[-0.48px] uppercase text-ink">
                        What We Stand On
                    </h2>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {VALUES.map((value, i) => (
                        <div
                            key={value.number}
                            className={`flex flex-col gap-6 bg-surface border border-line rounded-sm p-8 ${
                                i === 1 ? "sm:-translate-y-6" : ""
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs tracking-[1.2px] text-muted">
                                    {value.number}
                                </span>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    aria-hidden="true"
                                    className="text-accent"
                                >
                                    {value.icon}
                                </svg>
                            </div>

                            <h3 className="font-display font-bold text-2xl uppercase text-ink">
                                {value.title}
                            </h3>

                            <p className="text-muted text-sm leading-relaxed">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
