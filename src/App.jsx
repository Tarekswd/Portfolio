import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Education } from "@/sections/Education";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { AdBanner } from "@/components/AdBanner";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <AdBanner slotId="8127573814" />
        <Projects />
        <AdBanner slotId="8127573814" />
        <Experience />
        <Education />
        <AdBanner slotId="8127573814" />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
