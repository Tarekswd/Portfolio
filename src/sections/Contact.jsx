import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit3,
  Bold,
  Italic,
  Code,
  Heading,
  List,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "tarek.ahmadieh2006@gmail.com",
    href: "mailto:tarek.ahmadieh2006@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+961 76 447 535",
    href: "tel:+96176447535",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mount Lebanon, Lebanon",
    href: "https://www.google.com/maps/place/Mount+Lebanon",
  },
];

// Safe Markdown to HTML renderer for preview
function renderSafeMarkdown(text) {
  if (!text) return '<p class="text-muted-foreground italic">Nothing to preview yet...</p>';
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Multi-line code block: ```code```
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="bg-surface/90 p-3 rounded-lg overflow-x-auto text-xs my-2 font-mono text-primary border border-border/40"><code>$1</code></pre>'
  );

  // Inline code: `code`
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-surface/90 px-1.5 py-0.5 rounded text-xs font-mono text-primary border border-border/40">$1</code>'
  );

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-foreground mt-3 mb-1">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-foreground mt-4 mb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-foreground mt-4 mb-2">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

  // Safe links [text](http...)
  html = html.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">$1</a>'
  );

  // Bullet items
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="ml-4 list-disc text-muted-foreground">$1</li>');

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return html;
}

// Safe HTML sanitizer for preview (strips scripts, iframes, and on* event handlers)
function sanitizeHtml(rawHtml) {
  if (!rawHtml) return '<p class="text-muted-foreground italic">Nothing to preview yet...</p>';
  let clean = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, "")
    .replace(/javascript:[^"'\s]+/gi, "#");

  return clean;
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Body format: 'plain' | 'markdown' | 'html'
  const [messageMode, setMessageMode] = useState("markdown");
  // Tab view: 'write' | 'preview'
  const [activeTab, setActiveTab] = useState("write");
  const textareaRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  // Quick formatting insert helper
  const handleInsertFormatting = (syntax) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = formData.message;
    const selected = current.substring(start, end);

    let replacement = "";
    if (messageMode === "markdown") {
      switch (syntax) {
        case "bold":
          replacement = `**${selected || "bold text"}**`;
          break;
        case "italic":
          replacement = `*${selected || "italic text"}*`;
          break;
        case "heading":
          replacement = `\n### ${selected || "Heading"}\n`;
          break;
        case "code":
          replacement = selected.includes("\n")
            ? `\n\`\`\`\n${selected || "code"}\n\`\`\`\n`
            : `\`${selected || "code"}\``;
          break;
        case "list":
          replacement = `\n- ${selected || "List item"}\n`;
          break;
        default:
          break;
      }
    } else if (messageMode === "html") {
      switch (syntax) {
        case "bold":
          replacement = `<strong>${selected || "bold text"}</strong>`;
          break;
        case "italic":
          replacement = `<em>${selected || "italic text"}</em>`;
          break;
        case "heading":
          replacement = `<h3>${selected || "Heading"}</h3>`;
          break;
        case "code":
          replacement = `<code>${selected || "code"}</code>`;
          break;
        case "list":
          replacement = `<ul>\n  <li>${selected || "Item"}</li>\n</ul>`;
          break;
        default:
          break;
      }
    }

    const updated = current.substring(0, start) + replacement + current.substring(end);
    setFormData({ ...formData, message: updated });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot guard for bots
    if (e.target.website?.value) {
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      return;
    }

    // Explicit client-side validation for all modes (including Preview mode)
    if (!formData.name.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter your name.",
      });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a message before sending.",
      });
      setActiveTab("write");
      setTimeout(() => textareaRef.current?.focus(), 50);
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables."
        );
      }

      const finalMessage =
        messageMode === "plain"
          ? formData.message
          : `[Format: ${messageMode.toUpperCase()}]\n\n${formData.message}`;

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: finalMessage,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setActiveTab("write");
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.text ||
          error.message ||
          "Failed to send message. Please reconnect Gmail or try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>
          <h2
            id="contact-heading"
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground"
          >
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form Card */}
          <div className="glass p-5 sm:p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Spam Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Message Body with Markdown / HTML Controls */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>

                  {/* Format Selector: Plain, Markdown, HTML */}
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface border border-border/50 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setMessageMode("plain");
                        setActiveTab("write");
                      }}
                      className={`px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium text-[11px] sm:text-xs ${
                        messageMode === "plain"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Plain
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageMode("markdown")}
                      className={`px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium text-[11px] sm:text-xs ${
                        messageMode === "markdown"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Markdown (MD)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageMode("html")}
                      className={`px-2 sm:px-2.5 py-1 rounded-md transition-all font-medium text-[11px] sm:text-xs ${
                        messageMode === "html"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      HTML
                    </button>
                  </div>
                </div>

                {/* Rich Formatting Toolbar (when Markdown or HTML selected) */}
                {messageMode !== "plain" && (
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-surface/80 border border-border/40 text-xs">
                    <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("bold")}
                        title="Bold"
                        className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("italic")}
                        title="Italic"
                        className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("heading")}
                        title="Heading"
                        className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Heading className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("code")}
                        title="Code"
                        className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInsertFormatting("list")}
                        title="Bullet List"
                        className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-foreground transition-all"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Write vs Preview Tab Toggle */}
                    <div className="flex items-center gap-1 bg-surface px-1.5 py-0.5 rounded-lg border border-border/40 shrink-0 ml-auto sm:ml-0">
                      <button
                        type="button"
                        onClick={() => setActiveTab("write")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-all ${
                          activeTab === "write"
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Edit3 className="w-3 h-3" />
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("preview")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-all ${
                          activeTab === "preview"
                            ? "bg-primary text-primary-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                    </div>
                  </div>
                )}

                {/* Editor or Preview Pane */}
                {activeTab === "write" ? (
                  <textarea
                    ref={textareaRef}
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={
                      messageMode === "markdown"
                        ? "Write in Markdown... (e.g. **bold**, *italic*, ### Heading, `code`, - item)"
                        : messageMode === "html"
                        ? "Write in HTML... (e.g. <p>Hello</p>, <strong>Bold</strong>, <h3>Title</h3>)"
                        : "Your message..."
                    }
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-sm font-sans"
                  />
                ) : (
                  <div
                    className="w-full min-h-[140px] max-h-[220px] overflow-y-auto px-4 py-3 bg-surface/90 rounded-xl border border-border/60 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        messageMode === "markdown"
                          ? renderSafeMarkdown(formData.message)
                          : sanitizeHtml(formData.message),
                    }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              {/* Submit Status Notification */}
              {submitStatus.type && (
                <div
                  role="status"
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border border-green-500/20 text-green-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information & Availability */}
          <div className="space-y-6 animate-fade-in animation-delay-400">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6">
                Contact Information
              </h3>
              <address className="space-y-4 not-italic">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium text-foreground">{item.value}</div>
                    </div>
                  </a>
                ))}
              </address>
            </div>

            {/* Availability Card */}
            <div className="glass rounded-3xl p-6 sm:p-8 border border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm currently open to new opportunities and exciting projects.
                If you have something in mind, don't hesitate to reach out. I'm always eager to collaborate and create amazing things together.
                Let's talk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
