import { callLlm } from "./services/llmService.js";


const messages = [
  {
    role: "system",
    content: "You are a helpful AI tutor."
  }
];

export async function chat(userInput) {

  messages.push({
    role: "user",
    content: userInput
  });

  const response = await callLlm(messages);

  messages.push({
    role: "assistant",
    content: response
  });

  return response;

}