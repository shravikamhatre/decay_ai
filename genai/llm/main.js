import { buildLLMInput } from "../src/xgb.adapter.js";
import { explainTrend } from "./explainTrend.js";

const args = process.argv.slice(2);

const niche = args[0] || "Tech";
const type = args[1] || "content";
const mode = args[2] || "declining";
const platform = args[3] || "Instagram";

console.log(`Generating explanation for: Niche=${niche}, Type=${type}, Mode=${mode}, Platform=${platform}`);

(async () => {
    try {
        const payload = buildLLMInput({
            niche,
            type,
            mode,
            platform,
            k: 3,
        });

        console.log("Payload built, asking DeepSeek...");
        const result = await explainTrend(payload);

        console.log("\n--- EXPLANATION ---\n");
        console.log(result.explanation);
        console.log("\n-------------------\n");

    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
})();
