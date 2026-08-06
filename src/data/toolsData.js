export const TOOL_CATEGORIES = [
  { id: "all", label: "All Tools" },
  { id: "calculator", label: "Calculators" },
  { id: "converter", label: "Converter & File" },
  { id: "generator", label: "Generators" },
  { id: "planner", label: "Checklist & Planners" },
];

export const TOOLS_LIST = [
  // --- CATEGORY 1: CALCULATORS ---
  {
    id: "commission-calculator",
    title: "Commission Pricing Calculator",
    category: "calculator",
    categoryLabel: "Calculator",
    description:
      "Calculate cost of production, profit margins, and optimal commission rates for digital art, crafting, and cosplay projects.",
    href: "/tools/commission-calculator",
    badge: "Popular",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    status: "active",
    iconName: "Calculator", // Nama icon dari Lucide
  },
  {
    id: "booth-profit-calculator",
    title: "Artist Alley Booth Profit Calculator",
    category: "calculator",
    categoryLabel: "Calculator",
    description:
      "Simulate break-even points (BEP), sales targets, and merchandise inventory profit for anime conventions.",
    href: "/tools/booth-profit-calculator",
    status: "coming-soon",
    iconName: "TrendingUp",
  },
  {
    id: "convention-budget-planner",
    title: "Convention Travel & Event Budget Planner",
    category: "calculator",
    categoryLabel: "Calculator",
    description:
      "Plan travel expenses, tickets, accommodation, and booth merchandise costs without exceeding your budget.",
    href: "/tools/convention-budget-planner",
    status: "coming-soon",
    iconName: "Wallet",
  },

  // --- CATEGORY 2: CONVERTER / FILE TOOLS ---
  {
    id: "print-spec-converter",
    title: "Print-Spec Merch Converter",
    category: "converter",
    categoryLabel: "Converter & File",
    description:
      "Convert merch artwork (acrylic stands, stickers, prints) into print-ready specs (CMYK, 300 DPI, Bleed margins).",
    href: "/tools/print-spec-converter",
    badge: "Next Priority",
    badgeColor: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    status: "coming-soon",
    iconName: "Printer",
  },
  {
    id: "asset-resizer",
    title: "Streamer & Creator Social Asset Resizer",
    category: "converter",
    categoryLabel: "Converter & File",
    description:
      "Instantly resize images into precise dimensions for Twitch panels, Discord emotes, YouTube banners, and Twitter headers.",
    href: "/tools/asset-resizer",
    status: "coming-soon",
    iconName: "Scaling",
  },

  // --- CATEGORY 3: GENERATORS ---
  {
    id: "invoice-generator",
    title: "Creator Commission Invoice Generator",
    category: "generator",
    categoryLabel: "Generator",
    description:
      "Generate professional PDF invoices and deposit receipts instantly for clients without requiring registration.",
    href: "/tools/invoice-generator",
    status: "coming-soon",
    iconName: "FileText",
  },

  // --- CATEGORY 4: CHECKLIST / PLANNER ---
  {
    id: "convention-checklist",
    title: "Artist Alley & Event Creator Checklist",
    category: "planner",
    categoryLabel: "Checklist & Planner",
    description:
      "Comprehensive packing list and setup checklist for artists, cosplayers, and convention booth managers.",
    href: "/tools/convention-checklist",
    badge: "Phase 2",
    badgeColor: "bg-gray-500/10 border-gray-500/30 text-gray-400",
    status: "coming-soon",
    iconName: "ClipboardCheck",
  },
];