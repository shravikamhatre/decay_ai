import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  baseURL: process.env.FEATHERLESS_API_URL,
  apiKey: process.env.FEATHERLESS_API_KEY,
});

/**
 * Calls DeepSeek via Featherless (OpenAI-compatible)
 */
export const callDeepSeek = async ({ systemPrompt, userPrompt }) => {
  const response = await openai.chat.completions.create({
    model: "deepseek-ai/DeepSeek-V3-0324",
    temperature: 0.3,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0].message.content;
};
