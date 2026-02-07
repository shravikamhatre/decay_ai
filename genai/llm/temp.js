import { explainTrend } from "./explainTrend.js";

const result = await explainTrend({
  trend_name: "AI Yearbook Filter",
  platform: "Instagram",
  calendar_color: "yellow",
  signals: {
    CONTENT_SATURATION: 0.02,
    ENGAGEMENT_DECAY: 0.08,
    ALGO_PULLBACK: 0.09,
  },
});

console.log("\n--- LLM OUTPUT ---\n");
console.log(result.explanation);
