import Image from "next/image";

export default function ProductGallery({
    imageUrl,
    name,
    isLimited,
}: {
    imageUrl: string;
    name: string;
    isLimited: boolean;
}) {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="relative w-full aspect-square sm:aspect-[3/2] bg-surface-alt rounded-xl overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                    priority
                />

                {isLimited && (
                    <span className="absolute top-4 left-4 flex items-center gap-2 backdrop-blur-[2px] bg-bg/80 border border-line rounded-full px-3.5 py-1.5">
                        <span className="size-2 rounded-full bg-accent" />
                        <span className="font-mono text-xs tracking-[1.2px] uppercase text-ink">
                            Limited Edition
                        </span>
                    </span>
                )}
            </div>

            <div className="grid grid-cols-4 gap-4 w-full">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`relative aspect-square bg-surface-alt rounded-lg overflow-hidden ${
                            i === 0 ? "border border-ink" : "opacity-60"
                        }`}
                    >
                        <Image
                            src={imageUrl}
                            alt=""
                            fill
                            unoptimized
                            sizes="15vw"
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
