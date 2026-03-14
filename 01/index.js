// import ollama  from "ollama";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const messages = [
  {
    role: "system",
    content: "You are a helpful AI tutor.",
  },
];

async function chat(userInput) {
    messages.push({
        role: "user",
        content: userInput
    })

    const response = await client.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages
    })
      const aiResponse = response.choices[0].message.content;
      messages.push({
        role: "assistant",
        content: aiResponse
      })
      console.log(aiResponse);
}

async function main() {
  await chat("Who is Elon Musk?");
  await chat("Where was he born?");
}
main();
