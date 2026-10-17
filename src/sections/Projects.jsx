import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const GH = "https://github.com/Tarekswd";

const projects = [
  {
    title: "BraTS 2021 Multi-Paradigm Segmentation",
    category: "AI / ML",
    description:
      "PyTorch / MONAI implementation of a 300M-parameter foundation architecture for brain tumor segmentation that surpasses the BraTS 2021 benchmark, with zero-leakage cross-validation.",
    tags: ["Python", "PyTorch", "MONAI", "Medical Imaging"],
    github: `${GH}/brats2021-multiparadigm-segmentation`,
  },
  {
    title: "BraTS 2021 MGMT Radiogenomics",
    category: "AI / ML",
    description:
      "Research-grade deep learning with a 500M foundation architecture for pre-operative MGMT promoter methylation prediction in glioblastoma (BraTS 2021 Task 2).",
    tags: ["Python", "Deep Learning", "Radiogenomics"],
    github: `${GH}/brats2021-mgmt-radiogenomics`,
  },
  {
    title: "G-HRR for Gemma 4",
    category: "AI / ML",
    description:
      "Graph-Guided Hierarchical Repository Reasoning for local software-engineering agents. Official implementation for the Google Gemma 4 paper track.",
    tags: ["Python", "LLM Agents", "Gemma"],
    github: `${GH}/g-hrr-gemma4`,
  },
  {
    title: "Kaggle Playground S6E9 — Top 4.7%",
    category: "AI / ML",
    description:
      "Ranked 167 / 3,575 predicting EV purchases: synthetic-data forensics, leak-free in-fold target encoding and a LightGBM / XGBoost / CatBoost ensemble (0.94560 ROC-AUC).",
    tags: ["Python", "LightGBM", "XGBoost", "CatBoost"],
    github: `${GH}/Koggle-Playground_Series_S6E9`,
  },
  {
    title: "Neuropathy Detector",
    category: "AI / ML",
    description:
      "Detects neuropathy per step and per patient by comparing SVM, random forest, XGBoost, CatBoost, a custom CNN and a transfer-learned ResNet-18.",
    tags: ["Python", "scikit-learn", "CNN", "ResNet"],
    github: `${GH}/neuropathy_detector`,
  },
  {
    title: "Brain Tumor Detector",
    category: "AI / ML",
    description:
      "Convolutional neural network built with TensorFlow that classifies MRI brain scans for tumor detection.",
    tags: ["Python", "TensorFlow", "CNN"],
    github: `${GH}/brain_tumor_detector`,
  },
  {
    title: "Webchat",
    category: "Web",
    description:
      "Real-time chat application using React, NestJS, PostgreSQL and WebSockets, with authentication and database-backed user sessions.",
    image: `${import.meta.env.BASE_URL}projects/project1.png`,
    tags: ["React", "TypeScript", "NestJS", "WebSockets"],
    github: `${GH}/webchat`,
  },
  {
    title: "File Converter",
    category: "Web",
    description:
      "Full-stack app for converting images, PDFs and Office files. NestJS, React, PostgreSQL, JWT auth and a Dockerized backend using Sharp and PDF-Lib.",
    image: `${import.meta.env.BASE_URL}projects/project2.png`,
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Docker"],
    github: `${GH}/file-converter`,
  },
  {
    title: "Music Time",
    category: "Web",
    description: "A music website built on the MERN stack.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    github: `${GH}/music_time`,
  },
  {
    title: "Runeblade",
    category: "Games",
    description:
      "An action-packed top-down pixel-art survival adventure, playable in the browser.",
    image: "https://img.itch.zone/aW1nLzI5OTMyODQ0LmpwZw==/315x250%23c/n0s9Lu.jpg",
    tags: ["Godot", "GDScript", "Pixel Art"],
    link: "https://tatawek.itch.io/runeblade",
  },
  {
    title: "Golfyio",
    category: "Games",
    description:
      "Fast-paced indie action RPG golf game with special abilities and combat.",
    image: "https://img.itch.zone/aW1nLzI5NDMyMTgyLnBuZw==/315x250%23c/2PE3In.png",
    tags: ["Godot", "GDScript", "Action RPG"],
    link: "https://tatawek.itch.io/rpg-golfball",
  },
  {
    title: "Dungeon Soldier",
    category: "Games",
    description:
      "Short text-based web RPG: fight monsters, then face the dragon boss.",
    image: "https://img.itch.zone/aW1nLzIyOTU4ODkzLmpwZw==/315x250%23c/bD%2Bf93.jpg",
    tags: ["JavaScript", "RPG"],
    link: "https://tatawek.itch.io/dungeon-soldier",
    github: `${GH}/Dungeon-Soldier`,
  },
  {
    title: "Dereled",
    category: "Games",
    description:
      "A Mario-like 2D platformer built in Godot: collect coins, jump on enemies and beat the boss.",
    image: `${import.meta.env.BASE_URL}projects/project3.png`,
    tags: ["Godot", "GDScript", "Platformer"],
    link: "https://tatawek.itch.io/dereled",
  },
  {
    title: "Frosty",
    category: "Systems (C)",
    description: "A fun conversational AI bot written purely in C.",
    tags: ["C", "AI"],
    github: `${GH}/Frosty`,
  },
  {
    title: "HTTP Server",
    category: "Systems (C)",
    description: "A simple HTTP server built entirely in C.",
    tags: ["C", "Networking", "Sockets"],
    github: `${GH}/http_server`,
  },
  {
    title: "QR Code Generator",
    category: "Systems (C)",
    description:
      "QR code generator in C using Nayuki's QR library and TinyPngOut.",
    tags: ["C", "Image Encoding"],
    github: `${GH}/QR_Code_Generator`,
  },
  {
    title: "Image Viewer",
    category: "Systems (C)",
    description: "A lightweight image viewer written in C.",
    tags: ["C", "Graphics"],
    github: `${GH}/Image_viewer`,
  },
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const shown =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-32 relative overflow-hidden"
    >
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <header className="text-center mx-auto max-w-3xl mb-12">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground"
          >
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            From medical-imaging AI research and Kaggle competitions to
            full-stack web apps, indie games on itch.io and low-level C
            projects.
          </p>
        </header>

        {/* Filters */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shown.map((project) => (
            <li key={project.title}>
              <article className="group glass rounded-2xl overflow-hidden h-full">
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  {project.image || project.github ? (
                    <img
                      // Repos without a screenshot use their GitHub preview card, saved as public/projects/<repo>.png.
                      src={
                        project.image ||
                        `${import.meta.env.BASE_URL}projects/${project.github.split("/").pop()}.png`
                      }
                      alt={`${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-surface to-highlight/10">
                      <span className="text-2xl font-serif italic text-white/80">
                        {project.category}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Play ${project.title} on itch.io`}
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code on GitHub`}
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-primary whitespace-nowrap mt-1">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* View All CTA */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <AnimatedBorderButton href={`${GH}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            All repos on GitHub
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
          <AnimatedBorderButton href="https://tatawek.itch.io/" target="_blank" rel="noopener noreferrer">
            All games on itch.io
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
