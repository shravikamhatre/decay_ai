const { buildLLMInput } = require("../src/xgb.adapter");
const { explainTrend } = require("./explainTrend");

(async () => {
  const payload = buildLLMInput({
    niche: "Tech",
    type: "content", // or "music"
    mode: "declining", // or "good"
    platform: "Instagram",
    k: 2,
  });

  const result = await explainTrend(payload);
  console.log(result.explanation);
})();
