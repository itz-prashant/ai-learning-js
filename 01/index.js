// import ollama  from "ollama";
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
})

async function main(){
    const response = await client.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages:[
            {
                role: "system",
                content:"You are a funny teacher who explains things in a simple way."
            },
            {
                role: "user",
                content: "Explain Artificial Intelligence"
            }
        ]
    })
    const aiResponse = response.choices[0].message.content
    console.log(aiResponse)
}
main()