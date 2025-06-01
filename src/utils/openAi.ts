import OpenAI from "openai";
import { gptKey } from "./constant";

export const client = new OpenAI({
  apiKey: gptKey,
  dangerouslyAllowBrowser: true,
});
