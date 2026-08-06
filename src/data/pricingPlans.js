import { Sparkles as SparklesIcon, Globe, MessageSquareHeart, Layers, BarChart3, Palette, Code2, Zap, Users, ShoppingCart, BookOpen, Mail, Star, Check, Pallate, Smartphone, Image, Clock, CreditCard, FileText, Search, } from "lucide-react";

// Audience type icons (Lucide components)
export const audienceIcons = {
  cosplayer: Users,
  artist: Palette,
  both: SparklesIcon,
};

// Pricing Plans Data
export const plans = [
  {
    id: "starter",
    label: "Starter",
    tagline: "Go online fast — single page, ready for commissions",
    priceIDR: "Rp 2.500.000",
    priceUSD: "$160",
    originalPriceIDR: "Rp 3.500.000",
    originalPriceUSD: "$220",
    featured: false,
    isPopular: false,
    accentColor: "gray",
    badge: null,
    idealFor: ["artist", "cosplayer"],

    featureGroups: [
      {
        groupLabel: "Your Platform",
        features: [
          {
            icon: Palette,
            text: "Commission-ready landing page",
            detail: "Single-page site built to showcase your work and invite inquiries. Everything a first-time client needs to see.",
          },
          {
            icon: Smartphone,
            text: "Looks perfect on any device",
            detail: "Fully responsive — phone, tablet, or desktop. Your portfolio won't break on mobile.",
          },
          {
            icon: SparklesIcon,
            text: "Custom branding & color identity",
            detail: "Your palette, your typography, your aesthetic. Not a template.",
          },
        ],
      },
      {
        groupLabel: "Performance & Reach",
        features: [
          {
            icon: Zap,
            text: "Loads fast — meets Google's quality standards",
            detail: "Core Web Vitals optimized. Fast sites rank higher on search and keep visitors from bouncing.",
          },
          {
            icon: Zap,
            text: "CDN — fast loading worldwide",
            detail: "Content Delivery Network (CDN) serves your site from servers closest to each visitor — Jakarta, Tokyo, New York. Fast everywhere.",
          },
          {
            icon: Code2,
            text: "Domain + server setup included",
            detail: "We handle deployment, DNS, and hosting setup. Free domain for the first year.",
          },
        ],
      },
      {
        groupLabel: "Storage & Traffic",
        features: [
          {
            icon: Check,
            text: "5GB storage + 10GB bandwidth",
            detail: "5GB = ~2,500 high-res images. 10GB bandwidth = comfortable for ~1,000 visitors/month.",
          },
          {
            icon: Clock,
            text: "7-day revision period",
            detail: "Request changes within 7 days of launch. Covered with no extra charge.",
          },
        ],
      },
    ],

    notIncluded: ["Multi-page portfolio", "Art gallery", "Commission waitlist", "CMS / self-edit", "Order system"],
    cta: "Start Here",
  },

  {
    id: "creative",
    label: "Creative",
    tagline: "The full package — portfolio, commissions, and control",
    priceIDR: "Rp 7.500.000",
    priceUSD: "$480",
    originalPriceIDR: "Rp 12.000.000",
    originalPriceUSD: "$750",
    featured: true,
    isPopular: true,
    accentColor: "cyan",
    badge: "Recommended",
    idealFor: ["artist", "cosplayer"],

    featureGroups: [
      {
        groupLabel: "Your Platform",
        features: [
          {
            icon: Layers,
            text: "Multi-page portfolio — up to 5 pages",
            detail: "Separate pages for gallery, commissions, about, and contact. Clients can navigate without confusion.",
          },
          {
            icon: Image,
            text: "Interactive art gallery — up to 50 images",
            detail: "Full-screen lightbox gallery. Visitors can browse your work in a proper viewing experience, not just a grid of thumbnails.",
          },
          {
            icon: ShoppingCart,
            text: "Commission showcase + waitlist",
            detail: "Display your commission types and pricing. When your slots are full, clients join a waitlist automatically — no more managing DMs manually.",
          },
          {
            icon: Users,
            text: "Fan connect / guestbook section",
            detail: "Let fans leave messages. Build a sense of community around your work.",
          },
          {
            icon: MessageSquareHeart,
            text: "All your socials connected",
            detail: "Twitter/X, Instagram, Ko-fi, Linktree — linked and embedded where relevant so fans can follow you everywhere.",
          },
          {
            icon: SparklesIcon,
            text: "Custom branding & color identity",
            detail: "Your palette, your typography, your aesthetic. Not a template.",
          },
        ],
      },
      {
        groupLabel: "Performance & Reach",
        features: [
          {
            icon: Search,
            text: "People can find you on Google",
            detail: "SEO-optimized pages. When someone searches your name or art style, your site shows up — not just your Twitter profile.",
          },
          {
            icon: Globe,
            text: "Advanced SEO + Open Graph",
            detail: "When your link is shared on Twitter/X or Discord, it shows a rich preview with image and description — not just a raw URL.",
          },
          {
            icon: Zap,
            text: "Images load fast without losing quality",
            detail: "Image optimization + lazy loading. Artwork is compressed smartly, and only loads when scrolled into view — fast for visitors, easy on bandwidth.",
          },
          {
            icon: Zap,
            text: "CDN — fast loading worldwide",
            detail: "Content Delivery Network (CDN) serves your site from servers closest to each visitor — Jakarta, Tokyo, New York. Fast everywhere.",
          },
          {
            icon: Code2,
            text: "Domain + server setup included",
          },
        ],
      },
      {
        groupLabel: "Storage & Traffic",
        features: [
          {
            icon: Check,
            text: "25GB storage + 50GB bandwidth",
            detail: "25GB = ~12,500 high-res images. 50GB bandwidth = comfortable for ~5,000 visitors/month. Solid for an active commission artist.",
          },
          {
            icon: Clock,
            text: "14-day revision period",
          },
        ],
      },
    ],

    notIncluded: ["CMS / self-edit", "Payment gateway", "Order management system"],
    cta: "Go Creative",
  },

  {
    id: "fullpack",
    label: "Full Pack",
    tagline: "Your complete commission studio — automated, professional, fully yours",
    priceIDR: "Rp 32.000.000",
    priceUSD: "$2.000",
    originalPriceIDR: "Rp 45.000.000",
    originalPriceUSD: "$2.800",
    featured: false,
    isPopular: false,
    accentColor: "gold",
    badge: "Complete Solution",
    idealFor: ["artist", "cosplayer"],

    featureGroups: [
      {
        groupLabel: "Your Platform",
        features: [
          {
            icon: Layers,
            text: "Everything in Creative",
          },
          {
            icon: BookOpen,
            text: "Update your site yourself — no coding",
            detail: "CMS (Content Management System) built-in. Upload new artwork, change text, post updates anytime. Simple interface, no technical knowledge needed.",
          },
          {
            icon: ShoppingCart,
            text: "Full commission order system",
            detail: "Clients book, pay, and track their commission entirely on your site. No back-and-forth DMs, no manual invoicing.",
          },
          {
            icon: CreditCard,
            text: "Payment Gateway Integrated (Zero Agency Markup)",
            detail: "Direct integration with Midtrans/Xendit. You receive 100% of payments via e-wallet or bank transfer directly to your account. (Standard payment provider transaction fees apply).",
          },
          {
            icon: Users,
            text: "Client portal — every client tracks their own order",
            detail: "CRM + client portal. Each client gets a login to see commission progress. You manage everything from one dashboard.",
          },
          {
            icon: FileText,
            text: "Auto-invoice and payment receipts",
            detail: "Professional invoices and receipts sent to clients automatically after payment via free-tier transactional emails. Zero manual work.",
          },
        ],
      },
      {
        groupLabel: "Performance & Reach",
        features: [
          {
            icon: Mail,
            text: "Build and notify your fanbase via email",
            detail: "Newsletter + email automation included up to standard free tier limits. Easy scaling with your own API key as your fanbase grows.",
          },
          {
            icon: BarChart3,
            text: "Know exactly who's visiting and what they love",
            detail: "Analytics dashboard — track visitor count, traffic sources, and which artwork gets the most views. Sales and revenue analytics too.",
          },
          {
            icon: Zap,
            text: "CDN — fast loading worldwide",
            detail: "Content Delivery Network (CDN) serves your site from servers closest to each visitor — Jakarta, Tokyo, New York. Fast everywhere.",
          },
        ],
      },
      {
        groupLabel: "Storage & Traffic",
        features: [
          {
            icon: Check,
            text: "75GB storage + 150GB bandwidth — Tiered Managed Hosting",
            detail: "High capacity for scaling. First 6 months hosting included. Post-6-months transitions to our transparent Micro/Active Tiered Maintenance based on actual traffic.",
          },
          {
            icon: Clock,
            text: "30-day revision period",
          },
          {
            icon: Star,
            text: "6 months priority support",
            detail: "Half a year of direct support. We're your technical partner, not just the people who built the site.",
          },
        ],
      },
    ],

    notIncluded: [],
    cta: "Go Full Pack",
  },
];

// Footer stats - replace vague words with something honest
export const stats = [
  { value: "< 24h", label: "Response Time", color: "cyan" },
  { value: "100%", label: "Custom Design", color: "purple" },
  { value: "Free", label: "1st Year Domain", color: "cyan" },
];

// Designer info for clients who are artists themselves
export const artistSelfDesignNote = {
  title: "Already an Artist?",
  description: "Send us your own logo & designs — we'll integrate them into your site at no extra cost.",
  icon: Palette,
};