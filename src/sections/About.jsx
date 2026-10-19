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
                I am a full-stack software engineer and deep learning researcher with over 2 years
                of hands-on development experience. My primary web stack is built on{" "}
                <strong className="text-foreground font-semibold">React</strong>,{" "}
                <strong className="text-foreground font-semibold">TypeScript</strong>,{" "}
                <strong className="text-foreground font-semibold">NestJS</strong>,{" "}
                <strong className="text-foreground font-semibold">Prisma ORM</strong>, and{" "}
                <strong className="text-foreground font-semibold">PostgreSQL</strong>. During my internships
                at <strong className="text-foreground font-semibold">MednMind</strong>, I engineered core financial
                settlement features, cash-flow analytics, detailed patient workflows, and role-based access control (RBAC).
              </p>

              <p>
                In the AI domain, I focus on clinical and medical imaging challenges. With{" "}
                <strong className="text-foreground font-semibold">TogetherforChehim</strong>, I developed CNN and
                ResNet-18 transfer learning models to classify diabetic peripheral neuropathy from plantar pressure maps,
                evaluating them with stratified cross-validation and explainable AI (SHAP, Grad-CAM, and Occlusion Sensitivity).
                I also reproduced winning foundation architectures for the <strong className="text-foreground font-semibold">BraTS 2021</strong> brain
                tumor segmentation benchmark and earned a <strong className="text-foreground font-semibold">Top 4.7% rank on Kaggle</strong> (Playground S6E9)
                with a multi-model ensemble (LightGBM, CatBoost, XGBoost).
              </p>

              <p>
                Beyond high-level web frameworks, I love low-level systems programming in{" "}
                <strong className="text-foreground font-semibold">C</strong> and{" "}
                <strong className="text-foreground font-semibold">x86 Assembly</strong>, having built custom HTTP servers
                on Linux TCP sockets and command-line PNG QR encoders. I also design and ship indie 2D games using{" "}
                <strong className="text-foreground font-semibold">Godot &amp; GDScript</strong>, with titles such as{" "}
                <em className="text-foreground">Dereled</em>, <em className="text-foreground">Runeblade</em>, and{" "}
                <em className="text-foreground">Golfyio</em> published on itch.io.
              </p>

              <p>
                Currently completing my <strong className="text-foreground font-semibold">Bachelor of Business Computer</strong> at{" "}
                the <strong className="text-foreground font-semibold">Lebanese University (Faculty of Technology, Abey)</strong>,
                I combine rigorous engineering fundamentals with sharp business and problem-solving insight.
              </p>
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
