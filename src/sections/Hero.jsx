import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Gamepad2,
  Download,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const skills = [
  "React",
  "Nest.js",
  "TypeScript",
  "GraphQL",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Tailwind CSS",
  "Prisma",
  "Jest",
  "GitHub Actions",
  "Python",
  "PyTorch",
  "C",
  "Godot",
  "Machine Learning",
  "Deep Learning",
  "X86 Assembly"
];

// Generated once at load so the dots don't jump on every re-render.
const dots = Array.from({ length: 30 }, () => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
  animationDelay: `${Math.random() * 5}s`,
}));

export const Hero = () => {
  return (
    <section id="home" aria-label="Introduction" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{ backgroundColor: "#20B2A6", ...dot }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Full-Stack Developer • AI/ML • Systems &amp; Games
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Crafting <span className="text-primary glow-text">digital</span>
                <br />
                experiences with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I am <strong className="text-foreground font-semibold">Tarek Al Ahmadieh</strong> — a Full-Stack Developer &amp; Software Engineer specializing in React, NestJS, TypeScript, Python, and C. I build scalable web systems, medical deep learning research, and published indie games.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">

         
              <Button size="lg" href="#contact">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton
                href={`${import.meta.env.BASE_URL}Tarek-Al-Ahmadieh-CV.pdf`}
                download
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                Download CV
              </AnimatedBorderButton>
              <AnimatedBorderButton href="#projects">
                Check my work
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[


                { icon: Github, href: "https://github.com/Tarekswd", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/tarek-ahmadieh-05b4a3227/", label: "LinkedIn" },
                { icon: Gamepad2, href: "https://tatawek.itch.io/", label: "itch.io" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {/* Right Column - Profile Image */}
          <div className="relative animate-fade-in animation-delay-300">
            {/* Profile Image */}
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute inset-0 
              rounded-3xl bg-gradient-to-br 
              from-primary/30 via-transparent 
              to-primary/10 blur-2xl animate-pulse"
              />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img
                  src={`${import.meta.env.BASE_URL}profile-photo.jpg`}
                  alt="Portrait of Tarek Al Ahmadieh, software engineer"
                  width="448"
                  height="560"
                  className="w-full aspect-[4/5] object-cover rounded-2xl"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-3 sm:-bottom-4 -right-2 sm:-right-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 animate-float shadow-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs sm:text-sm font-medium">
                      Available for work
                    </span>
                  </div>
                </div>
                {/* Stats Badge */}
                <div className="absolute -top-3 sm:-top-4 -left-2 sm:-left-4 glass rounded-xl px-3 sm:px-4 py-2 sm:py-3 animate-float animation-delay-500 shadow-lg">
                  <div className="text-xl sm:text-2xl font-bold text-primary">2+</div>
                  <div className="text-[11px] sm:text-xs text-primary">
                    Years Exp.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-gradient-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-gradient-to-l from-background to-transparent z-10"
            />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
