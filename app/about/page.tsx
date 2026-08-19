import AboutHero from "@/app/components/AboutHero";
import AboutStory from "@/app/components/AboutStory";
import AboutValues from "@/app/components/AboutValues";
import AboutCTA from "@/app/components/AboutCTA";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
    return (
        <main className="pt-20">
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <AboutCTA />
            <Footer />
        </main>
    );
}
