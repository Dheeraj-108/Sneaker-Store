import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import FeaturedDrops from "./components/FeaturedDrops";
import CategoryGrid from "./components/CategoryGrid";
import Footer from "./components/Footer";

export default function Home() {
    return (
        <main className="pt-20">
            <Hero />
            <Marquee />
            <FeaturedDrops />
            <CategoryGrid />
            <Footer />
        </main>
    );
}
