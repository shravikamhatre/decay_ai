export const buildExplainPrompt = ({
  trend_name,
  platform,
  calendar_color,
  signals,
  trend_state, // "GOOD" or "DECLINING"
}) => {
  const signalText = Object.entries(signals)
    .map(([k, v]) => `- ${k} (${v})`)
    .join("\n");

  const baseSystemPrompt = `
You are an explainable AI system for social media trend analysis.
You must explain decisions using ONLY the provided signals.
Do not speculate or invent reasons.
Use clear, concise, business-friendly language.
`.trim();

  const userPrompt =
    trend_state === "GOOD"
      ? `
Trend: ${trend_name}
Platform: ${platform}
Calendar status: ${calendar_color}

Signals (all low-risk):
${signalText}

Explain:
1) Why this trend is a good opportunity right now
2) What makes it safe to invest in
3) Recommended creator action
`
      : `
Trend: ${trend_name}
Platform: ${platform}
Calendar status: ${calendar_color}

Decline signals:
${signalText}

Explain:
1) Primary reason for decline
2) Secondary contributing factors
3) Recommended creator action
`;

  return {
    systemPrompt: baseSystemPrompt,
    userPrompt: userPrompt.trim(),
  };
};
