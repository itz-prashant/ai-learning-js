import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
})

export async function callLlm(messages) {
    
    const res = await client.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages
    })

    return res.choices[0].message.content;
}