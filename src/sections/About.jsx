import { Code2, Brain, Terminal, Gamepad2 } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Web Systems",
    description:
      "Production web apps with React, NestJS, TypeScript, Prisma ORM, and PostgreSQL. Experienced in financial engines, RBAC, and analytics dashboards.",
  },
  {
    icon: Brain,
    title: "AI & Medical Deep Learning",
    description:
      "PyTorch, MONAI, and CNN architectures for medical imaging (BraTS 2021) and neuropathy diagnosis. Top 4.7% finish in Kaggle Playground.",
  },
  {
    icon: Terminal,
    title: "Systems & Low-Level C",
    description:
      "Linux TCP socket programming, HTTP servers built from scratch in C, image encoding, and x86 Assembly fundamentals.",
  },
  {
    icon: Gamepad2,
    title: "Indie Game Development",
    description:
      "Published 2D action/adventure titles built in Godot Engine and GDScript (Dereled, Runeblade, Golfyio) on itch.io.",
  },
];

export const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Narrative grounded in CV */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground"
            >
              Engineering systems,
              <span className="font-serif italic font-normal text-white">
                {" "}
                from low-level sockets to deep learning.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200 leading-relaxed text-sm sm:text-base">
              <p>
                I am a full-stack software engineer and machine learning researcher with over 2 years
                of hands-on development experience. My work bridges responsive frontend architecture with
                high-throughput backend services, robust relational database modeling, and applied deep learning.
              </p>

              <p>
                During my software engineering internships at <strong className="text-foreground font-semibold">MednMind</strong>,
                I engineered production financial settlement features, real-time cash-flow reporting, patient care workflows,
                and role-based access control (RBAC) using <strong className="text-foreground font-semibold">React</strong>,{" "}
                <strong className="text-foreground font-semibold">NestJS</strong>,{" "}
                <strong className="text-foreground font-semibold">TypeScript</strong>, and{" "}
                <strong className="text-foreground font-semibold">PostgreSQL</strong>.
              </p>

              <p>
                Beyond full-stack web applications, I have a deep passion for low-level systems programming in{" "}
                <strong className="text-foreground font-semibold">C</strong>, exploratory deep learning research in medical
                diagnostics, and designing indie game mechanics in <strong className="text-foreground font-semibold">Godot</strong>.
                I approach every project with an emphasis on clean architecture, verifiable benchmarks, and real-world utility.
              </p>

              <p>
                Currently completing my <strong className="text-foreground font-semibold">Bachelor of Business Computer</strong> at{" "}
                the <strong className="text-foreground font-semibold">Lebanese University (Faculty of Technology, Abey)</strong>,
                I combine rigorous computer science fundamentals with practical business problem solving.
              </p>

              <div className="pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                >
                  <span className="underline underline-offset-4 group-hover:text-primary">
                    See featured engineering projects &amp; benchmarks below
                  </span>
                  <span className="group-hover:translate-y-0.5 transition-transform">&darr;</span>
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-base sm:text-lg font-medium italic text-foreground">
                "Bridging full-stack engineering with medical deep learning and systems architecture — building software that is scalable, intelligent, and crafted for real-world impact."
              </p>
            </div>
          </div>

          {/* Right Column: 4 CV Pillars */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 flex flex-col justify-between animate-fade-in group"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
