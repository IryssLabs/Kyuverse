// Pricing card accent color styles
export const getAccentClasses = (plan) => {
  if (plan.featured) {
    return {
      label: "text-cyan-400",
      border: "border-cyan-400/50",
      bg: "bg-gradient-to-b from-cyan-950/70 to-[#0a0a0c]/80",
      shadow: "shadow-[0_0_60px_rgba(34,211,238,0.15)]",
      iconBg: "bg-cyan-400/15 border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]",
      iconColor: "text-cyan-400",
      badge: "bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.6)]",
      cta: "bg-cyan-500 text-black hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]",
    };
  }
  if (plan.accentColor === "purple") {
    return {
      label: "text-purple-400",
      border: "border-purple-400/20 hover:border-purple-400/40",
      bg: "bg-[#0a0a0c]/80",
      shadow: "",
      iconBg: "bg-purple-400/15 border border-purple-400/30",
      iconColor: "text-purple-400",
      badge: "bg-purple-500 text-white",
      cta: "border border-purple-400/30 text-purple-400 hover:border-purple-400 hover:bg-purple-400/10",
    };
  }
  if (plan.accentColor === "gold") {
    return {
      label: "text-amber-400",
      border: "border-amber-400/30 hover:border-amber-400/60",
      bg: "bg-gradient-to-b from-amber-950/30 to-[#0a0a0c]/80",
      shadow: "shadow-[0_0_40px_rgba(251,191,36,0.08)]",
      iconBg: "bg-amber-400/15 border border-amber-400/30",
      iconColor: "text-amber-400",
      badge: "bg-amber-500 text-black",
      cta: "border border-amber-400/40 text-amber-400 hover:border-amber-400 hover:bg-amber-400/10",
    };
  }
  if (plan.accentColor === "cyan") {
    return {
      label: "text-cyan-500/70",
      border: "border-white/10 hover:border-cyan-400/30",
      bg: "bg-[#0a0a0c]/80",
      shadow: "",
      iconBg: "bg-cyan-400/10 border border-cyan-400/20",
      iconColor: "text-cyan-500/70",
      badge: "bg-cyan-500 text-black",
      cta: "border border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-white",
    };
  }
  // gray / default
  return {
    label: "text-gray-500",
    border: "border-white/10 hover:border-white/20",
    bg: "bg-[#0a0a0c]/80",
    shadow: "",
    iconBg: "bg-white/5 border border-white/10",
    iconColor: "text-gray-400",
    badge: "bg-gray-500 text-white",
    cta: "border border-white/10 text-gray-300 hover:border-white/30 hover:text-white",
  };
};
