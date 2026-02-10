const { buildExplainPrompt } = require("./prompt.builder");
const { callDeepSeek } = require("./deepseek.client");

/**
 * Entry point for trend explainability
 * Input: structured trend + ML signals
 * Output: UI-ready natural language explanation
 */
async function explainTrend(trendData) {
  if (!trendData) {
    throw new Error("trendData is required");
  }

  const { systemPrompt, userPrompt } = buildExplainPrompt(trendData);

  const explanation = await callDeepSeek({
    systemPrompt,
    userPrompt,
  });

  return {
    trend_name: trendData.trend_name,
    platform: trendData.platform,
    calendar_color: trendData.calendar_color,
    explanation: explanation.trim(),
  };
}

module.exports = { explainTrend };
