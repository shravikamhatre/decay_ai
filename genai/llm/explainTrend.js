import { buildExplainPrompt } from "./prompt.builder.js";
import { callDeepSeek } from "./deepseek.client.js";

/**
 * Entry point for trend explainability
 * Input: structured trend + ML signals
 * Output: UI-ready natural language explanation
 */

// Cache explanations per trend
const explanationCache = new Map();

// Single-flight lock
let inFlight = false;

async function explainTrend(trendData) {
  if (!trendData) {
    throw new Error("trendData is required");
  }

  const cacheKey = `${trendData.platform}:${trendData.trend_name}`;

  // ✅ Return cached result instantly
  if (explanationCache.has(cacheKey)) {
    return explanationCache.get(cacheKey);
  }

  // 🟡 Prevent concurrent LLM calls
  if (inFlight) {
    return {
      trend_name: trendData.trend_name,
      platform: trendData.platform,
      calendar_color: trendData.calendar_color,
      explanation: "Analyzing trend… please wait a moment.",
      pending: true,
    };
  }

  try {
    inFlight = true;

    const { systemPrompt, userPrompt } = buildExplainPrompt(trendData);

    const explanation = await callDeepSeek({
      systemPrompt,
      userPrompt,
    });

    const result = {
      trend_name: trendData.trend_name,
      platform: trendData.platform,
      calendar_color: trendData.calendar_color,
      explanation: explanation.trim(),
    };

    // ✅ Cache result
    explanationCache.set(cacheKey, result);

    return result;
  } finally {
    inFlight = false;
  }
}

export { explainTrend };
