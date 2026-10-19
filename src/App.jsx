import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { AdBanner } from "@/components/AdBanner";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <AdBanner slotId="auto-top" />
        <Projects />
        <AdBanner slotId="auto-middle" />
        <Experience />
        <Education />
        <AdBanner slotId="auto-bottom" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
