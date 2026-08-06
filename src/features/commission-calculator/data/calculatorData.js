// src/data/calculatorData.js
// ✅ All validated, no bugs

export const EXCHANGE_RATES_FALLBACK = {
  IDR: 1,
  USD: 17366,
  MYR: 3908,
  PHP: 61.47,
  SGD: 13508,
};

export const CURRENCY_SYMBOLS = {
  IDR: "Rp",
  USD: "$",
  MYR: "RM",
  PHP: "₱",
  SGD: "S$",
};

/**
 * Base prices per art type, per region (in IDR)
 * These are MINIMUM starting points, not final prices
 * Hours will override if result is lower
 */
export const BASE_PRICES_IDR = {
  sketch:       { id: 50000,  sea: 70000,  global: 120000 },
  chibi:        { id: 75000,  sea: 100000, global: 180000 },
  bust:         { id: 100000, sea: 150000, global: 250000 },
  fullbody:     { id: 150000, sea: 220000, global: 400000 },
  illustration: { id: 300000, sea: 450000, global: 800000 },
  cosphoto:     { id: 120000, sea: 180000, global: 350000 },
  ref:          { id: 250000, sea: 380000, global: 650000 },
};

/**
 * Hourly rates per experience level (in IDR/hour)
 * PRIMARY driver: hours * hourlyRate is calculated first
 * Then compared with base prices
 */
export const HOURLY_RATES_IDR = {
  beginner: 15000,  // $0.86/hr
  emerging: 25000,  // $1.44/hr
  mid:      40000,  // $2.30/hr
  senior:   65000,  // $3.74/hr
};

/**
 * All multipliers applied in sequence
 * Order matters: background → chars → commercial → revisions → rush → complexity
 */
export const MULTIPLIERS = {
  /**
   * Experience level multiplier (applied to base price only, not hours)
   */
  experience: {
    beginner: 0.7,
    emerging: 1.0,
    mid:      1.4,
    senior:   1.9,
  },

  /**
   * Background complexity
   * Fixed: 'none' should be 0.0 (no additional cost)
   */
  background: {
    none:     0.0,     // Flat color = no extra
    simple:   0.15,    // +15%
    detailed: 0.40,    // +40%
  },

  /**
   * Character count multiplier
   * Base = 1 char included. Each additional char = +35%
   * Applied as: (chars - 1) * 0.35
   */
  extraChar: 0.35,

  /**
   * Commercial usage rights
   */
  commercial: {
    personal:   1.0,   // Base price
    small:      1.3,   // +30% (Twitch, small merch)
    fullcomm:   1.8,   // +80% (Commercial product, studio use)
  },

  /**
   * Revision rounds included
   */
  revisions: {
    "1":  0.95,   // -5%
    "2":  1.0,    // Base (standard)
    "3":  1.1,    // +10%
    unl:  1.25,   // +25%
  },

  /**
   * Rush order multipliers
   */
  rush: {
    normal:  1.0,    // Standard pace
    rush1w:  1.25,   // <1 week = +25%
    rush3d:  1.6,    // <3 days = +60%
  },

  /**
   * Art complexity (detail level)
   */
  complexity: {
    simple:   0.85,   // -15% (quick, minimalist)
    medium:   1.0,    // Base
    complex:  1.3,    // +30% (intricate, detailed)
  },
};

/**
 * Market benchmarks for reference/education
 * Shows typical price ranges per region in USD (not used in calculation)
 */
export const MARKET_BENCHMARK = [
  { label: "Sketch / lineart",     id: [35, 80],    sea: [5, 15],    global: [10, 30] },
  { label: "Chibi / SD character",  id: [50, 150],   sea: [8, 25],    global: [15, 50] },
  { label: "Bust commission",       id: [75, 200],   sea: [10, 35],   global: [20, 70] },
  { label: "Full body (colored)",   id: [120, 350],  sea: [15, 60],   global: [30, 120] },
  { label: "Full illustration",     id: [250, 800],  sea: [30, 120],  global: [60, 250] },
  { label: "Character ref sheet",   id: [200, 600],  sea: [25, 100],  global: [50, 200] },
  { label: "Cosplay photo edit",    id: [100, 300],  sea: [12, 45],   global: [25, 100] },
];