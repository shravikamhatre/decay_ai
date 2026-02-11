function buildExplainPrompt(trendData) {
  const {
    trend_name,
    base,
    platform,
    calendar_color,
    current_trend,
    recommended_trends = [],
  } = trendData;

  const {
    score,
    velocity_change,
    engagement,
    saturation,
    decay,
    appearance,
    novelty,
  } = current_trend;

  const trend_state = calendar_color === "green" ? "GOOD" : "DECLINING";

  const signalBlock = `
Velocity change: ${velocity_change}
Engagement level: ${engagement}
Appearance level: ${appearance}
Novelty: ${novelty}
Saturation level: ${saturation}
Decay level: ${decay}
`.trim();

  const alternativesBlock =
    recommended_trends.length === 0
      ? "None"
      : recommended_trends
          .map((t, i) =>
            `
${i + 1}. ${t.name}
Score: ${t.score}
Velocity change: ${t.velocity_change}
Engagement: ${t.engagement}
Saturation: ${t.saturation}
Decay: ${t.decay}
Novelty: ${t.novelty}
`.trim(),
          )
          .join("\n\n");

  const systemPrompt = `
You are an explainable AI assistant for social media trend analysis.
Your job is to explain trend decisions clearly and confidently to creators and marketers.
Do not use markdown, bullet symbols, or emojis.
Do not mention machine learning, models, or probabilities.
Explain decisions using plain language and observable signals only.
Keep the tone calm, confident, and actionable.
`.trim();

  const userPrompt =
    trend_state === "GOOD"
      ? `
Trend name: ${trend_name}
Platform: ${platform}
Summary: ${base}
Calendar status: ${calendar_color}
Performance score: ${score}

Current signals:
${signalBlock}

Task:
Explain why this trend is a good opportunity right now.
Explain why it is safe to invest creator effort in it.
Describe what kind of content strategy would work best at this stage.
If relevant, mention one complementary rising trend from the alternatives list.
Avoid warning language.
`.trim()
      : `
Trend name: ${trend_name}
Platform: ${platform}
Summary: ${base}
Calendar status: ${calendar_color}
Performance score: ${score}

Current signals:
${signalBlock}

Alternative rising trends:
${alternativesBlock}

Task:
Explain why this trend is beginning to weaken using the signals.
Explicitly reference velocity change, engagement, appearance, and decay.

Then compare it directly against ONE alternative trend from the list.
You must compare signals, not describe the alternative in isolation.

When describing the alternative:
- If velocity_change <= 0, describe it as “more stable than the current trend”
- If velocity_change > 0, describe it as “healthier momentum”

Decay interpretation rules (mandatory):
- High decay means a short-term opportunity
- Low decay means a longer runway

Do not describe any trend as strong, booming, or growing unless velocity_change > 0.
Keep the explanation constructive and forward-looking.

If signals conflict, prioritize velocity change and decay over all other signals.

`.trim();

  return {
    systemPrompt,
    userPrompt,
  };
}

module.exports = { buildExplainPrompt };
