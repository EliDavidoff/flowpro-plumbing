import Hero from "./components/Hero";
import SectionNav from "./components/SectionNav";
import Services from "./components/Services";
import About from "./components/About";
import Reviews from "./components/Reviews";
import GoogleBusinessCard from "./components/GoogleBusinessCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <SectionNav />
      <Hero />
      <main>
        <Services />
        <About />
        <Reviews />
        <GoogleBusinessCard />
      </main>
      <Footer />
    </>
  );
}
