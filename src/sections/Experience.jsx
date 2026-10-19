const experiences = [
  {
    period: "Jul 2026 — Oct 2026",
    role: "Full Stack Developer Intern",
    company: "MednMind",
    description:
      "Developed full-stack financial features with React, NestJS, TypeScript, and PostgreSQL (commission/salary settlements, running balances, and custom income/expense tracking). Built financial and patient reporting with cash-flow analytics and configurable date-range filtering. Implemented patient management workflows, diagnosis autocomplete, medicine suggestions, RBAC access control, patient groups, and per-organization WhatsApp tracking.",
    technologies: ["React", "NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "RBAC", "Reporting"],
  },
  {
    period: "Jun 2026 — Sep 2026",
    role: "Machine & Deep Learning Project",
    company: "TogetherforChehim",
    description:
      "Machine and deep learning classification of diabetic peripheral neuropathy from plantar pressure data, both binary and 4-class (GC, GD, NL, NS). Compared CatBoost, XGBoost, SVM, Random Forest, and Linear Regression. Designed and trained a custom CNN with Stratified 5-Fold Cross-Validation, adapted ResNet-18 to multi-channel pressure maps, and visualized model attention with SHAP, Grad-CAM, Grad-CAM++, and Occlusion Sensitivity.",
    technologies: ["Python", "CNN", "ResNet-18", "CatBoost", "XGBoost", "SHAP", "Grad-CAM"],
  },
  {
    period: "Apr 2026 — Jul 2026",
    role: "Full Stack Web Development Intern",
    company: "MednMind",
    description:
      "Developed the Admin Dashboard with responsive frontend and backend APIs for user management, patient statistics, and trial period administration. Built the Report Page with Revenue, Staff, and Insurance reports, creating frontend components and extending backend APIs and database queries.",
    technologies: ["React", "NestJS", "TypeScript", "PostgreSQL", "Admin Dashboard", "Backend APIs"],
  },
  {
    period: "2025 — Present",
    role: "Game Developer",
    company: "Freelance",
    description:
      "Designed and developed indie games using Godot and GDScript, including Dereled (a 2D Mario-inspired platformer with responsive mechanics and boss fights), Runeblade (a top-down survival adventure with pixel art), and Golfyio (a fast-paced action-RPG golf game with special abilities and combat). Responsible for game mechanics, physics, level design, and release.",
    technologies: ["Godot", "GDScript", "Game Design", "Level Design", "2D Physics"],
    current: true,
  },
];

export const Experience = () => {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span>
          <h2
            id="experience-heading"
            className="text-4xl md:text-5xl font-bold
           mt-4 mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Experience that{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              speaks volumes.
            </span>
          </h2>

          <p
            className="text-muted-foreground
           animate-fade-in animation-delay-200"
          >
            My internship, research, and freelance work, from full-stack
            dashboards to medical machine learning and indie games.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${idx % 2 === 0
                    ? "md:pr-16 md:text-right"
                    : "md:col-start-2 md:pl-16"
                    }`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "md:justify-end" : ""
                        }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
