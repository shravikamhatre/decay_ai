const { explainTrend } = require("./explainTrend");

(async () => {
  const result = await explainTrend({
    trend_name: "AI Yearbook Filter",
    base: "An AI-generated yearbook-style portrait trend popular on social platforms.",
    platform: "Instagram",
    calendar_color: "green",

    current_trend: {
      score: 82,
      velocity_change: 0.42,
      engagement: 0.78,
      saturation: 0.31,
      decay: 0.18,
      appearance: 0.64,
      novelty: 0.71,
    },

    recommended_trends: [
      {
        name: "AI Cartoon Avatars",
        score: 76,
        velocity_change: 0.55,
        engagement: 0.74,
        saturation: 0.28,
        decay: 0.15,
        novelty: 0.69,
      },
      {
        name: "Retro AI Portraits",
        score: 73,
        velocity_change: 0.48,
        engagement: 0.69,
        saturation: 0.33,
        decay: 0.21,
        novelty: 0.66,
      },
    ],
  });

  console.log("\n--- LLM OUTPUT ---\n");
  console.log(result.explanation);
})();
