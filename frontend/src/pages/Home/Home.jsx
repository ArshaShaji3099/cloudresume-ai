import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Trusted from "../../components/landing/Trusted";
import Features from "../../components/landing/Features";
import DashboardPreview from "../../components/layout/DashboardPreview";
import HowItWorks from "../../components/landing/HowItWorks";
import Testimonials from "../../components/landing/Testimonials";
import FAQ from "../../components/landing/FAQ";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Trusted/>
            <Features/>
            <DashboardPreview/>
            <HowItWorks/>
            <Testimonials/>
            <FAQ/>
            <CTA/>
            <Footer/>
        </>
    );
}

export default Home;