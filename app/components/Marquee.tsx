const items = [
    "[ System: Online ]",
    "New Arrivals Logged",
    "Worldwide Shipping Initiated",
];

export default function Marquee() {
    const track = [...items, ...items, ...items]; // repeated for a seamless loop

    return (
        <div className="w-full h-12 border-b border-line bg-bg overflow-hidden">
            <div className="flex items-center h-full gap-8 animate-marquee whitespace-nowrap">
                {track.map((text, i) => (
                    <span key={i} className="flex items-center gap-8">
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-muted">
                            {text}
                        </span>
                        <span className="size-1.5 rounded-full bg-line" />
                    </span>
                ))}
            </div>
        </div>
    );
}
