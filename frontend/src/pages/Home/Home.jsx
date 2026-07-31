import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Trusted from "../../components/landing/Trusted";
import Features from "../../components/landing/Features";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Trusted/>
            <Features/>
        </>
    );
}

export default Home;