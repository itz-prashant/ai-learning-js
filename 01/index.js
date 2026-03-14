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
                role: "user",
                content: "Hiii"
            }
        ]
    })

    console.log(response)
}
main()