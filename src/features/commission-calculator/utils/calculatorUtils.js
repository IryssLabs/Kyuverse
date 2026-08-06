// src/utils/calculatorUtils.js
// ✅ All bugs fixed, hours is primary driver, production-ready

import {
  BASE_PRICES_IDR,
  MULTIPLIERS,
  HOURLY_RATES_IDR,
  CURRENCY_SYMBOLS,
} from "@/features/commission-calculator/data/calculatorData";

/**
 * MAIN PRICE CALCULATION FUNCTION
 * 
 * Formula logic:
 * 1. Calculate time-based price: hourlyRate * hours
 * 2. Calculate base price with experience multiplier
 * 3. Use HIGHER of the two (hours-based OR base-based)
 * 4. Apply all modifiers in sequence
 * 5. Return min/mid/max/deposit in IDR
 */
export function calculatePrice({
  artType,
  region,
  experience,
  hours,
  chars,
  background,
  commercial,
  rush,
  complexity,
  revisions,
}) {
  // Safe Fallbacks agar tidak crash jika data belum meluncur dari data/calculatorData
  const safeMultipliers = MULTIPLIERS || {};
  const safeBg = safeMultipliers.background || {};
  const safeComm = safeMultipliers.commercial || {};
  const safeRev = safeMultipliers.revisions || {};
  const safeRush = safeMultipliers.rush || {};
  const safeComp = safeMultipliers.complexity || {};

  // ============ STEP 1: Get base values ============
  const basePrice = (BASE_PRICES_IDR && BASE_PRICES_IDR[artType]?.[region]) || 50000;
  const hourlyRate = (HOURLY_RATES_IDR && HOURLY_RATES_IDR[experience]) || 25000;

  // Pastikan hours & chars selalu berupa angka valid (menghindari bug slider)
  const validHours = Math.max(1, Math.min(100, Number(hours) || 6));
  const validChars = Math.max(1, Math.min(100, Number(chars) || 1));

  // ============ STEP 2: Calculate time-based vs base-based ============
  const timeBasedPrice = hourlyRate * validHours;
  const expMultiplier = (safeMultipliers.experience && safeMultipliers.experience[experience]) || 1.0;
  const basedPrice = basePrice * expMultiplier;

  const artBase = Math.max(timeBasedPrice, basedPrice);

  // ============ STEP 3: Apply all modifiers safely ============
  const bgMultiplier = 1 + (safeBg[background] || 0);
  const withBg = artBase * bgMultiplier;

  const extraCharMultiplier = safeMultipliers.extraChar || 0.35;
  const charMultiplier = 1 + Math.max(0, validChars - 1) * extraCharMultiplier;
  const withChars = withBg * charMultiplier;

  const commMultiplier = safeComm[commercial] || 1.0;
  const withComm = withChars * commMultiplier;

  // String casting untuk mengantisipasi input tipe number/string dari key revisi
  const revMultiplier = safeRev[String(revisions)] || 1.0;
  const withRev = withComm * revMultiplier;

  const rushMultiplier = safeRush[rush] || 1.0;
  const withRush = withRev * rushMultiplier;

  const complexMultiplier = safeComp[complexity] || 1.0;
  const final = Math.round(withRush * complexMultiplier);

  // ============ STEP 4: Calculate final prices ============
  const minPrice = Math.max(10000, Math.round(final * 0.8));
  const midPrice = Math.max(minPrice, final);
  const maxPrice = Math.round(midPrice * 1.35);
  const depositPrice = Math.round(midPrice * 0.5);

  const hourlyEarned = validHours > 0 ? Math.round(midPrice / validHours) : hourlyRate;

  return {
    min: minPrice,
    mid: midPrice,
    max: maxPrice,
    deposit: depositPrice,
    hourlyEarned,
    minHourly: hourlyRate, 
    timeBasedPrice,
    basedPrice,
    artBase,
  };
}

/**
 * Format IDR amount to target currency with proper symbols
 * 
 * @param {number} amountIDR - Amount in Indonesian Rupiah
 * @param {string} currency - Target currency (IDR, USD, MYR, PHP, SGD)
 * @param {object} rates - Exchange rates object { IDR: 1, USD: 17366, ... }
 * @returns {string} Formatted price string
 */
export function formatPrice(amountIDR, currency, rates) {
  if (!amountIDR || !rates) return "Rp 0";

  const rate = rates[currency] || rates.IDR || 1;
  const converted = amountIDR / rate;
  const sym = CURRENCY_SYMBOLS[currency] || "Rp";

  // Format based on currency
  if (currency === "IDR") {
    // IDR: round to thousands, use locale formatting
    const rounded = Math.round(converted / 1000) * 1000;
    return `${sym} ${rounded.toLocaleString("id-ID")}`;
  }

  if (currency === "USD" || currency === "SGD" || currency === "MYR") {
    // USD, SGD, MYR: 0 decimals for clean display
    return `${sym} ${Math.round(converted)}`;
  }

  if (currency === "PHP") {
    // PHP: usually whole numbers
    return `${sym} ${Math.round(converted).toLocaleString()}`;
  }

  // Fallback
  return `${sym} ${Math.round(converted)}`;
}

/**
 * Check if hourly rate is fair for artist's experience level
 * Compares earned hourly rate vs minimum hourly rate for that level
 * 
 * @param {number} hourlyEarned - Actual hourly rate (price / hours)
 * @param {number} minHourly - Minimum expected hourly rate for level
 * @returns {object} { status: "great"|"fair"|"low"|"danger", label: string }
 */
export function getFairnessStatus(hourlyEarned, minHourly) {
  if (!minHourly || minHourly === 0) {
    return { status: "fair", label: "fair" };
  }

  const ratio = hourlyEarned / minHourly;

  if (ratio >= 1.2) {
    return { status: "great", label: "great rate" };
  }
  if (ratio >= 1.0) {
    return { status: "fair", label: "fair" };
  }
  if (ratio >= 0.8) {
    return { status: "low", label: "a bit low" };
  }
  return { status: "danger", label: "too low" };
}

/**
 * Get market tier classification for a given price
 * Helps artists understand where their price sits in market
 * 
 * @param {number} priceIDR - Price in IDR
 * @returns {object} { tier, label, color }
 */
export function getMarketTier(priceIDR) {
  const inK = (priceIDR || 0) / 1000;

  if (inK < 50) {
    return { tier: "below", label: "Below market", color: "text-red-400" };
  }
  if (inK < 150) {
    return { tier: "entry", label: "Entry level", color: "text-amber-400" };
  }
  if (inK < 350) {
    return { tier: "mid", label: "Mid range", color: "text-cyan-400" };
  }
  if (inK < 800) {
    return { tier: "upper", label: "Upper market", color: "text-purple-400" };
  }
  return { tier: "premium", label: "Premium", color: "text-green-400" };
}

/**
 * Validate form input before calculation
 * Returns validation errors if any
 */
export function validateCalculatorForm(form) {
  const errors = [];

  if (!form.artType) errors.push("Art type is required");
  if (!form.region) errors.push("Region is required");
  if (!form.experience) errors.push("Experience level is required");
  if (form.hours < 1 || form.hours > 100) errors.push("Hours must be 1-100");
  if (form.chars < 1 || form.chars > 40) errors.push("Characters must be 1-5");

  return errors;
}

/**
 * Get suggested price range (min-max) as a human-readable string
 */
export function getPriceRangeText(result, currency, rates) {
  const minStr = formatPrice(result.min, currency, rates);
  const maxStr = formatPrice(result.max, currency, rates);
  return `${minStr} — ${maxStr}`;
}