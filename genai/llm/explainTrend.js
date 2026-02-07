import { buildExplainPrompt } from "./prompt.builder.js";
import { callDeepSeek } from "./deepseek.client.js";

export const explainTrend = async (trendData) => {
  const { systemPrompt, userPrompt } = buildExplainPrompt(trendData);
  const explanation = await callDeepSeek({ systemPrompt, userPrompt });

  return {
    trend_name: trendData.trend_name,
    explanation,
  };
};
