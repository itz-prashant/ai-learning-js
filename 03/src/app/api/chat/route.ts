import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(req:Request) {
    const body = await req.json();

    const completion = await client.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages:[
            {
                role: "user",
                content: body.message
            }
        ]
    })

    const reply = completion.choices[0].message.content;

    return NextResponse.json({
        reply
    })
}