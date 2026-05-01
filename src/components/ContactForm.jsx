"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send, User, AtSign, MessageSquare, CheckCircle2,
  Loader2, Instagram, ArrowLeft, Palette, Heart, Monitor, Sparkles,
} from "lucide-react";
import { packageDetails } from "@/data/packageDetails";
import { colorOptions, themeOptions, vibeOptions } from "@/data/colorOptions";
import StepLabel from "./contact-form/StepLabel";
import ColorSwatchGrid from "./contact-form/ColorSwatchGrid";

// ─── Helper ──────────────────────────────────────────────────────────────────
const getPackageAccent = (pkg) =>
  pkg === "fullpack" ? "amber" : pkg === "pro" ? "purple" : "cyan";

const VALID_PACKAGES = ["starter", "essential", "creative", "pro", "fullpack"];

const EMPTY_FORM = (urlPackage) => ({
  name: "",
  email: "",
  social: "",
  package:
    urlPackage && VALID_PACKAGES.includes(urlPackage) ? urlPackage : "creative",
  favoriteColors: [],
  customColor: "",
  theme: "",
  vibe: "",
  references: "",
  message: "",
});

// ─── Main Form ───────────────────────────────────────────────────────────────
function ContactFormInner() {
  const searchParams = useSearchParams();
  const urlPackage = searchParams.get("package");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => EMPTY_FORM(urlPackage));

  const statusRef = useRef(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePackageChange = (pkg) => {
    setFormData((prev) => ({ ...prev, package: pkg }));
  };

  const toggleColor = (value) => {
    if (value === "surprise") {
      setFormData((prev) => ({
        ...prev,
        favoriteColors: prev.favoriteColors.includes("surprise") ? [] : ["surprise"],
        customColor: "",
      }));
      return;
    }
    setFormData((prev) => {
      const already = prev.favoriteColors.includes(value);
      const withoutSurprise = prev.favoriteColors.filter((c) => c !== "surprise");
      if (already) {
        return {
          ...prev,
          favoriteColors: withoutSurprise.filter((c) => c !== value),
          customColor: value === "custom" ? "" : prev.customColor,
        };
      }
      if (withoutSurprise.length >= 3) return prev;
      return { ...prev, favoriteColors: [...withoutSurprise, value] };
    });
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please tell me a bit about your project.";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Please write at least 20 characters.";
    }
    if (
      formData.favoriteColors.includes("custom") &&
      !formData.customColor.trim()
    ) {
      newErrors.customColor = "Please enter your custom color code.";
    }
    return newErrors;
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    const selectedPkg = packageDetails[formData.package];

    const colorSummary = formData.favoriteColors
      .map((c) => (c === "custom" ? `Custom: ${formData.customColor}` : c))
      .join(", ") || "Not specified";

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.email + (formData.social ? ` / ${formData.social}` : ""),
          package: selectedPkg.title,
          price: selectedPkg.price,
          message:
            `PREFERENCES:\n• Colors: ${colorSummary}\n• Theme: ${formData.theme || "Not specified"}\n• Vibe: ${formData.vibe || "Not specified"}\n• References: ${formData.references || "None"}\n\nMESSAGE:\n${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(EMPTY_FORM(urlPackage));
        setErrors({});
        // Scroll to success message
        setTimeout(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      } else {
        setSubmitStatus("error");
        setTimeout(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => statusRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = packageDetails[formData.package];
  const accent = getPackageAccent(formData.package);

  // ── Shared input className ─────────────────────────────────────────────────
  const inputCls = (hasError) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
        : "border-white/10 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
    }`;

  const fieldError = (key) =>
    errors[key] ? (
      <p role="alert" className="text-[11px] text-red-400 mt-1 font-medium">
        {errors[key]}
      </p>
    ) : null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-[11px] font-black uppercase tracking-widest transition-colors duration-200 mb-6 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="p-8 rounded-2xl bg-[#0a0a0c]/80 border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.05)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                style={{ width: `${(i + 1) * 14}px`, opacity: 0.4 + i * 0.15 }}
              />
            ))}
            <Sparkles className="w-3 h-3 text-cyan-400 mx-1" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"
                style={{ width: `${(5 - i) * 14}px`, opacity: 0.4 + (4 - i) * 0.15 }}
              />
            ))}
          </div>

          <h3 className="text-2xl font-black text-white mb-2">
            Let&apos;s Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Digital Stage
            </span>
          </h3>
          <p className="text-gray-500 text-xs tracking-widest uppercase font-bold">
            I&apos;ll reply within 12 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">

          {/* ── STEP 1: Contact Info ── */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-600">
                01 — Contact Info
              </div>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
              >
                <User className="w-3 h-3 text-cyan-400" /> Name / Pen Name
                <span className="text-red-400 text-[10px]">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name or alias"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputCls(errors.name)}
              />
              <span id="name-error">{fieldError("name")}</span>
            </div>

            {/* Email + Social */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
                >
                  <AtSign className="w-3 h-3 text-cyan-400" /> Email{" "}
                  <span className="text-red-400 text-[10px]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={inputCls(errors.email)}
                />
                <span id="email-error">{fieldError("email")}</span>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="social"
                  className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
                >
                  <Instagram className="w-3 h-3 text-purple-400" /> IG / Discord
                  <span className="text-gray-600 text-[10px] normal-case tracking-normal font-normal">
                    optional
                  </span>
                </label>
                <input
                  id="social"
                  type="text"
                  name="social"
                  value={formData.social}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20 transition-all"
                />
              </div>
            </div>
          </section>

          {/* ── STEP 2: Package ── */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-600">
                02 — Package
              </div>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {Object.keys(packageDetails).map((pkg) => {
                const isSelected = formData.package === pkg;
                const color = getPackageAccent(pkg);
                const colorMap = {
                  amber: isSelected
                    ? "bg-amber-500/10 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-500 hover:border-amber-400/30 hover:text-gray-300",
                  purple: isSelected
                    ? "bg-purple-500/10 border-purple-400 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-500 hover:border-purple-400/30 hover:text-gray-300",
                  cyan: isSelected
                    ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "bg-white/5 border-white/10 text-gray-500 hover:border-cyan-400/30 hover:text-gray-300",
                };
                return (
                  <button
                    key={pkg}
                    type="button"
                    onClick={() => handlePackageChange(pkg)}
                    aria-pressed={isSelected}
                    className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all duration-300 cursor-pointer ${colorMap[color]}`}
                  >
                    {pkg === "fullpack"
                      ? "Full Pack"
                      : pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                  </button>
                );
              })}
            </div>

            {/* Package details */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/5">
                <span className="text-sm font-black text-white">
                  {selectedPackage.title}
                </span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg ${
                    accent === "amber"
                      ? "text-amber-400 bg-amber-400/10"
                      : accent === "purple"
                      ? "text-purple-400 bg-purple-400/10"
                      : "text-cyan-400 bg-cyan-400/10"
                  }`}
                >
                  {selectedPackage.price}
                </span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedPackage.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        accent === "amber"
                          ? "text-amber-400/60"
                          : accent === "purple"
                          ? "text-purple-400/60"
                          : "text-cyan-400/60"
                      }`}
                    />
                    <span className="text-xs text-gray-400">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── STEP 3: Website Preferences ── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-600">
                03 — Website Preferences
              </div>
              <div className="flex-1 h-px bg-white/5" />
              <Sparkles className="w-3 h-3 text-cyan-400/50" />
            </div>

            {/* Colors */}
            <div>
              <StepLabel
                number="A"
                label="Favorite Colors — pick up to 3"
                icon={Palette}
                color="pink"
              />
              <ColorSwatchGrid
                colorOptions={colorOptions}
                selectedColors={formData.favoriteColors}
                onToggle={toggleColor}
              />

              {/* Custom color input — now properly controlled */}
              {formData.favoriteColors.includes("custom") && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-pink-400/30">
                  <label
                    htmlFor="customColor"
                    className="flex items-center gap-2 text-[11px] font-bold text-pink-300 uppercase tracking-wider mb-2"
                  >
                    Custom Color Code
                    <span className="text-red-400 text-[10px]">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="customColor"
                      type="text"
                      name="customColor"
                      value={formData.customColor}
                      onChange={handleChange}
                      placeholder="#FF5733 or rgba(255,87,51,1)"
                      aria-invalid={!!errors.customColor}
                      aria-describedby={errors.customColor ? "customColor-error" : undefined}
                      className={`flex-1 bg-white/5 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none transition-all ${
                        errors.customColor
                          ? "border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
                          : "border-white/10 focus:border-pink-400/50 focus:ring-1 focus:ring-pink-400/50"
                      }`}
                    />
                    <input
                      type="color"
                      aria-label="Color picker"
                      value={formData.customColor.startsWith("#") && formData.customColor.length === 7
                        ? formData.customColor
                        : "#ffffff"}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, customColor: e.target.value }))
                      }
                      className="w-10 h-10 rounded-lg bg-transparent border border-white/20 cursor-pointer"
                    />
                  </div>
                  <span id="customColor-error">{fieldError("customColor")}</span>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Enter hex code (#RRGGBB) or use color picker
                  </p>
                </div>
              )}
            </div>

            {/* Theme */}
            <div>
              <StepLabel number="B" label="Website Theme" icon={Monitor} color="cyan" />
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {themeOptions.map((t) => {
                  const Icon = t.icon;
                  const isSelected = formData.theme === t.value;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          theme: isSelected ? "" : t.value,
                        }))
                      }
                      className={`group relative py-3 px-2 rounded-xl text-[11px] font-bold border transition-all duration-200 cursor-pointer text-left overflow-hidden ${
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-400/60 text-white shadow-[0_0_14px_rgba(34,211,238,0.2)]"
                          : "bg-white/[0.03] border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent pointer-events-none" />
                      )}
                      <Icon
                        className={`w-4 h-4 mb-1.5 transition-transform group-hover:scale-110 ${
                          isSelected ? "text-cyan-400" : ""
                        }`}
                      />
                      <span className="leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vibe */}
            <div>
              <StepLabel number="C" label="Overall Vibe" icon={Heart} color="purple" />
              <div className="flex flex-wrap gap-2">
                {vibeOptions.map((v) => {
                  const isSelected = formData.vibe === v.value;
                  return (
                    <button
                      key={v.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          vibe: isSelected ? "" : v.value,
                        }))
                      }
                      className={`px-4 py-2 rounded-full text-[11px] font-bold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-purple-500/15 border-purple-400/60 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                          : "bg-white/[0.03] border-white/8 text-gray-500 hover:border-purple-400/30 hover:text-purple-300/70"
                      }`}
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── STEP 4: Brief ── */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-black tracking-[0.25em] uppercase text-gray-600">
                04 — Your Brief
              </div>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* References */}
            <div className="space-y-1">
              <label
                htmlFor="references"
                className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
              >
                <Monitor className="w-3 h-3 text-cyan-400" /> Reference Websites or Artstyle
                <span className="text-gray-600 text-[10px] normal-case tracking-normal font-normal">
                  optional
                </span>
              </label>
              <input
                id="references"
                type="text"
                name="references"
                value={formData.references}
                onChange={handleChange}
                placeholder="Sites you love the look of — e.g. pinterest.com/pin/xxx"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
              >
                <MessageSquare className="w-3 h-3 text-purple-400" /> Tell me about your project
                <span className="text-red-400 text-[10px]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your art style, what you create, what you want visitors to feel..."
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby="message-hint message-error"
                className={`${inputCls(errors.message)} resize-none`}
              />
              <div className="flex justify-between items-center">
                <span id="message-error">{fieldError("message")}</span>
                <span
                  id="message-hint"
                  className={`text-[10px] ml-auto ${
                    formData.message.length < 20 && formData.message.length > 0
                      ? "text-amber-400/70"
                      : "text-gray-600"
                  }`}
                >
                  {formData.message.length} chars{formData.message.length < 20 ? ` (min 20)` : ""}
                </span>
              </div>
            </div>
          </section>

          {/* ── Submit ── */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                Send Brief
              </>
            )}
          </button>

          {/* Status messages — scrolled into view automatically */}
          <div ref={statusRef}>
            {submitStatus === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="text-center p-4 rounded-xl bg-green-400/10 border border-green-400/20"
              >
                <p className="text-green-400 text-sm font-bold">
                  Brief sent! I&apos;ll get back to you within 12 hours 
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div
                role="alert"
                aria-live="assertive"
                className="text-center p-4 rounded-xl bg-red-400/10 border border-red-400/20"
              >
                <p className="text-red-400 text-sm font-bold">
                  Something went wrong. DM me on{" "}
                  <a
                    href="https://ig.me/m/kandaputrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-300 transition-colors"
                  >
                    Instagram
                  </a>
                  .
                </p>
              </div>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-[#0a0a0c]/80 border border-white/10 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
      }
    >
      <ContactFormInner />
    </Suspense>
  );
}