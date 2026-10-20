import { ArrowUpRight, Github, ChevronLeft, ChevronRight, Table as TableIcon, LayoutGrid } from "lucide-react";
import { useState, useMemo } from "react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const GH = "https://github.com/Tarekswd";

const projects = [
  {
    title: "File Converter",
    category: "Web",
    outcome: "15+ formats converted in <2s with NestJS, Sharp & Docker",
    description:
      "Full-stack file conversion platform for images, documents, and PDFs featuring asynchronous processing, JWT authentication, and Dockerized microservices.",
    image: `${import.meta.env.BASE_URL}projects/project2.png`,
    tags: ["React", "NestJS", "TypeScript", "PostgreSQL", "Docker", "Sharp"],
    github: `${GH}/file-converter`,
  },
  {
    title: "Kaggle Playground S6E9 — Top 4.7%",
    category: "AI / ML",
    outcome: "Ranked 167 / 3,575 worldwide (0.94560 ROC-AUC)",
    description:
      "Ranked in top 4.7% globally predicting EV purchases: forensic synthetic-data feature engineering, leak-free target encoding, and an ensemble of LightGBM, CatBoost & XGBoost.",
    tags: ["Python", "LightGBM", "XGBoost", "CatBoost", "Kaggle"],
    github: `${GH}/Koggle-Playground_Series_S6E9`,
  },
  {
    title: "Runeblade",
    category: "Games",
    outcome: "Playable in-browser • Pixel-art survival adventure on itch.io",
    description:
      "Action-packed top-down survival game in Godot Engine featuring responsive combat physics, wave-based AI state machines, and real-time boss battles.",
    image: "https://img.itch.zone/aW1nLzI5OTMyODQ0LmpwZw==/315x250%23c/n0s9Lu.jpg",
    tags: ["Godot", "GDScript", "Pixel Art", "2D Physics"],
    link: "https://tatawek.itch.io/runeblade",
    liveLabel: "Play Live",
  },
  {
    title: "BraTS 2021 Multi-Paradigm Segmentation",
    category: "AI / ML",
    outcome: "Surpasses BraTS 2021 benchmark with 300M foundation architecture",
    description:
      "PyTorch / MONAI foundation architecture for 3D multi-parametric MRI brain tumor segmentation, verified under zero-leakage cross-validation.",
    tags: ["Python", "PyTorch", "MONAI", "Medical Imaging"],
    github: `${GH}/brats2021-multiparadigm-segmentation`,
  },
  {
    title: "Golfyio",
    category: "Games",
    outcome: "Playable in-browser • Action-RPG golf physics hybrid",
    description:
      "Fast-paced indie action RPG combining golf trajectory physics with special player abilities, combat arenas, and gamepad support.",
    image: "https://img.itch.zone/aW1nLzI5NDMyMTgyLnBuZw==/315x250%23c/2PE3In.png",
    tags: ["Godot", "GDScript", "Action RPG", "Physics"],
    link: "https://tatawek.itch.io/rpg-golfball",
    liveLabel: "Play Live",
  },
  {
    title: "BraTS 2021 MGMT Radiogenomics",
    category: "AI / ML",
    outcome: "500M foundation model for pre-operative genomic prediction",
    description:
      "Research-grade deep learning architecture for non-invasive MGMT promoter methylation prediction in glioblastoma brain tumors (BraTS 2021 Task 2).",
    tags: ["Python", "Deep Learning", "Radiogenomics", "Medical AI"],
    github: `${GH}/brats2021-mgmt-radiogenomics`,
  },
  {
    title: "Neuropathy Detector",
    category: "AI / ML",
    outcome: "Clinical 5-fold CV with ResNet-18 & SHAP/Grad-CAM interpretability",
    description:
      "Plantar pressure classification for diabetic neuropathy comparing CatBoost, XGBoost, custom CNNs, and transfer-learned ResNet-18 with clinical saliency maps.",
    tags: ["Python", "scikit-learn", "CNN", "ResNet-18", "SHAP"],
    github: `${GH}/neuropathy_detector`,
  },
  {
    title: "HTTP Server in C",
    category: "Systems (C)",
    outcome: "Zero-dependency high-concurrency server on Linux TCP sockets",
    description:
      "Complete HTTP/1.1 web server written entirely from scratch in C, implementing POSIX socket operations, HTTP request parsing, and response formatting.",
    tags: ["C", "Linux Sockets", "TCP/IP", "Networking"],
    github: `${GH}/http_server`,
  },
  {
    title: "QR Code Generator in C",
    category: "Systems (C)",
    outcome: "Native CLI PNG generator with zero external library footprint",
    description:
      "Fast command-line QR matrix encoder in pure C leveraging Nayuki's algorithm and TinyPngOut for binary image rendering.",
    tags: ["C", "Image Encoding", "Algorithms"],
    github: `${GH}/QR_Code_Generator`,
  },
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];
const ITEMS_PER_PAGE = 6;

const getProjectImage = (project) => {
  if (project.image) return project.image;
  if (project.github) {
    const repo = project.github.split("/").pop();
    return `${import.meta.env.BASE_URL}projects/${repo}.png`;
  }
  return null;
};

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  const filtered = useMemo(() => {
    return filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // Reset to first page when filtering
  const handleFilterChange = (category) => {
    setFilter(category);
    setCurrentPage(1);
  };

  // Safe current page clamp
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-32 relative overflow-hidden"
    >
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl pointer-events-none" />

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

        {/* Toolbar: Filters & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap justify-center sm:justify-start gap-2"
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => handleFilterChange(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-surface/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div
            role="group"
            aria-label="Switch projects layout"
            className="flex items-center gap-1 p-1 rounded-xl glass border border-border/50 self-center sm:self-auto"
          >
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-label="Table view"
              title="Table view"
              className={`p-2 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                viewMode === "table"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
              }`}
            >
              <TableIcon className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              title="Grid view"
              className={`p-2 rounded-lg text-sm transition-all flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>

        {/* Authentic Table View */}
        {viewMode === "table" ? (
          <div className="glass rounded-2xl border border-border/50 overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" aria-label="Projects table">
                <thead>
                  <tr className="border-b border-border/60 bg-surface/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th scope="col" className="py-4 px-6 min-w-[240px]">
                      Project
                    </th>
                    <th scope="col" className="py-4 px-6 min-w-[120px] hidden sm:table-cell">
                      Category
                    </th>
                    <th scope="col" className="py-4 px-6 hidden md:table-cell">
                      Description
                    </th>
                    <th scope="col" className="py-4 px-6 min-w-[180px] hidden lg:table-cell">
                      Built With
                    </th>
                    <th scope="col" className="py-4 px-6 text-right min-w-[100px]">
                      Links
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30 text-sm">
                  {paginatedProjects.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground">
                        No projects found in this category.
                      </td>
                    </tr>
                  ) : (
                    paginatedProjects.map((project) => {
                      const projectImg = getProjectImage(project);
                      const primaryHref = project.link || project.github;

                      return (
                        <tr
                          key={project.title}
                          className="group hover:bg-primary/5 transition-colors duration-200"
                        >
                          {/* Project Name + Preview */}
                          <td className="py-4 px-6 align-middle">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface border border-border/50 shrink-0 shadow-inner">
                                {projectImg ? (
                                  <img
                                    src={projectImg}
                                    alt={`${project.title} preview`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-highlight/10 text-xs font-bold text-white/70">
                                    {project.category.slice(0, 3)}
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0">
                                {primaryHref ? (
                                  <a
                                    href={primaryHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5"
                                  >
                                    <span className="truncate">{project.title}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </a>
                                ) : (
                                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors block truncate">
                                    {project.title}
                                  </span>
                                )}
                                {project.outcome && (
                                  <div className="text-[11px] text-primary/90 font-medium flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                                    <span className="truncate max-w-[280px] sm:max-w-none">{project.outcome}</span>
                                  </div>
                                )}
                                {/* Mobile subtitle */}
                                <div className="sm:hidden flex flex-wrap items-center gap-2 mt-1">
                                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {project.category}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-4 px-6 align-middle hidden sm:table-cell">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                              {project.category}
                            </span>
                          </td>

                          {/* Description */}
                          <td className="py-4 px-6 align-middle hidden md:table-cell">
                            <p className="text-muted-foreground text-xs leading-relaxed max-w-md line-clamp-2">
                              {project.description}
                            </p>
                          </td>

                          {/* Built With */}
                          <td className="py-4 px-6 align-middle hidden lg:table-cell">
                            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                              {project.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="px-2.5 py-0.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground whitespace-nowrap"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </td>

                          {/* Links */}
                          <td className="py-4 px-6 align-middle text-right">
                            <div className="flex items-center justify-end gap-2">
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Play / View live demo for ${project.title}`}
                                  title="Open live link"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary/15 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 text-xs font-semibold transition-all shadow-sm"
                                >
                                  <span>{project.liveLabel || "Live"}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${project.title} source code on GitHub`}
                                  title="View source code on GitHub"
                                  className="p-2 rounded-lg glass text-muted-foreground hover:text-primary-foreground hover:bg-primary transition-all duration-200"
                                >
                                  <Github className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls in Table Footer */}
            <div className="border-t border-border/40 bg-surface/30 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filtered.length === 0 ? 0 : startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                projects
              </div>

              {totalPages > 1 && (
                <nav
                  aria-label="Projects pagination"
                  className="flex items-center gap-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={activePage === 1}
                    aria-label="Previous page"
                    className="p-2 rounded-lg glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      aria-current={activePage === pageNum ? "page" : undefined}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[34px] h-[34px] rounded-lg text-xs font-medium transition-all ${
                        activePage === pageNum
                          ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                          : "glass text-muted-foreground hover:text-foreground hover:bg-surface/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={activePage === totalPages}
                    aria-label="Next page"
                    className="p-2 rounded-lg glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </div>
          </div>
        ) : (
          /* Grid View fallback */
          <div>
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project) => {
                const projectImg = getProjectImage(project);

                return (
                  <li key={project.title}>
                    <article className="group glass rounded-2xl overflow-hidden h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-video">
                        {projectImg ? (
                          <img
                            src={projectImg}
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
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <span className="text-xs text-primary whitespace-nowrap mt-1">
                              {project.category}
                            </span>
                          </div>
                          {project.outcome && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 text-xs font-medium mb-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                              {project.outcome}
                            </div>
                          )}
                          <p className="text-muted-foreground text-sm">
                            {project.description}
                          </p>
                        </div>
                        <div className="space-y-3 pt-2">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-primary/15 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 text-xs font-semibold transition-all shadow-sm group/btn"
                            >
                              <span>{project.liveLabel || "Play Live"}</span>
                              <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </a>
                          )}
                          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                            {project.tags.map((tag) => (
                              <li
                                key={tag}
                                className="px-3 py-1 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            {/* Pagination Controls in Grid View */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 glass p-4 rounded-xl border border-border/50">
                <div className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.length === 0 ? 0 : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-foreground">
                    {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                  projects
                </div>

                <nav
                  aria-label="Projects pagination"
                  className="flex items-center gap-1.5"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={activePage === 1}
                    aria-label="Previous page"
                    className="p-2 rounded-lg glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      aria-current={activePage === pageNum ? "page" : undefined}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`min-w-[34px] h-[34px] rounded-lg text-xs font-medium transition-all ${
                        activePage === pageNum
                          ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/25"
                          : "glass text-muted-foreground hover:text-foreground hover:bg-surface/80"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={activePage === totalPages}
                    aria-label="Next page"
                    className="p-2 rounded-lg glass text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}

        {/* View All CTA */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <AnimatedBorderButton
            href={`${GH}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
          >
            All repos on GitHub
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
          <AnimatedBorderButton
            href="https://tatawek.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            All games on itch.io
            <ArrowUpRight className="w-5 h-5" />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};
