import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Safe tanh normalization
 */
function normTanh(x, scale = 1) {
  if (typeof x !== "number") return 0;
  return Math.tanh(x / scale);
}

/**
 * Normalize score within a bucket
 */
function normalizeScore(score, min, max) {
  if (max === min) return 0.5;
  return (score - min) / (max - min);
}

/**
 * Map raw ML trend → LLM contract trend
 */
function mapTrend(trend, scoreMin, scoreMax) {
  const s = trend.signals;

  return {
    name: trend.name,
    score: normalizeScore(trend.score, scoreMin, scoreMax),
    velocity_change: normTanh(s.velocity_pct, 50),
    engagement: normTanh(s.engagement_pct),
    saturation: normTanh(s.saturation_pct),
    appearance: normTanh(s.appearance_pct),
    decay: s.decay_score,
    novelty: s.novelty,
  };
}

/**
 * Build LLM payload from daily JSON
 *
 * options:
 *  - niche: "Tech"
 *  - type: "content" | "music"
 *  - mode: "declining" | "good"
 *  - platform: "Instagram"
 *  - k: number of alternatives
 */
function buildLLMInput({ niche, type, mode, platform = "Instagram", k = 3 }) {
  const filePath = path.join(__dirname, "..", `daily_${niche}.json`);

  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const bucketKey =
    type === "music"
      ? mode === "declining"
        ? "top_music_declining"
        : "top_music_good"
      : mode === "declining"
        ? "top_trends_declining"
        : "top_trends_good";

  const trends = raw[bucketKey];
  if (!trends || trends.length === 0) {
    throw new Error("No trends found for given configuration");
  }

  // Score normalization bounds
  const scores = trends.map((t) => t.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  // Current trend = first item in requested bucket
  const currentRaw = trends[0];
  const currentTrend = mapTrend(currentRaw, minScore, maxScore);

  // Alternatives = highest velocity_change excluding current
  const alternatives = trends
    .slice(1)
    .sort((a, b) => b.signals.velocity_pct - a.signals.velocity_pct)
    .slice(0, k)
    .map((t) => mapTrend(t, minScore, maxScore));

  return {
    trend_name: currentRaw.name,
    base: currentRaw.base,
    platform,
    calendar_color: mode === "declining" ? "red" : "green",

    current_trend: currentTrend,
    recommended_trends: alternatives,
  };
}

export { buildLLMInput };
