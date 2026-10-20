import { Github, Linkedin, Gamepad2, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Tarekswd", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tarek-ahmadieh-05b4a3227/", label: "LinkedIn" },
  { icon: Gamepad2, href: "https://tatawek.itch.io/", label: "itch.io" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Trust & Availability Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-border/40 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span>Mount Lebanon, Lebanon • Available Globally (UTC+3 / Remote)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-xs font-medium text-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Open for Full-Stack &amp; Contract Roles</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">
              Tatawek<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Tarek Al Ahmadieh. All rights reserved.{" "}
              <a
                href={`${import.meta.env.BASE_URL}privacy.html`}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
