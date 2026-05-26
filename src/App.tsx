import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Reviews from "./components/Reviews";
import GoogleBusinessCard from "./components/GoogleBusinessCard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
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
