import OpenAI from "openai";
// import { gptKey } from "./constant";
console.log(process.env.NEXT_PUBLIC_GPT_KEY, "key");
export const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_KEY,
  dangerouslyAllowBrowser: true,
});
