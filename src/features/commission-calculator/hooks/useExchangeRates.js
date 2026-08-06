"use client";

// src/hooks/useExchangeRates.js
import { useState, useEffect } from "react";
import { EXCHANGE_RATES_FALLBACK } from "@/features/commission-calculator/data/calculatorData";

export function useExchangeRates() {
  const [rates, setRates] = useState(EXCHANGE_RATES_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function fetchRates() {
      try {
     
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/IDR"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setRates({
          IDR: 1,
          USD: 1 / data.rates.USD,
          MYR: 1 / data.rates.MYR,
          PHP: 1 / data.rates.PHP,
          SGD: 1 / data.rates.SGD,
        });
        setIsLive(true);
      } catch {
       
        setRates(EXCHANGE_RATES_FALLBACK);
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  return { rates, loading, isLive };
}