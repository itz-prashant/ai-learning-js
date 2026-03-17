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
        messages: body.messages,
        stream: true
    })

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller){
            for await(const chunk of completion){
                const content = chunk.choices[0]?.delta?.content || "";
                controller.enqueue(encoder.encode(content))
            }
            controller.close()
        }
    })

    return new Response(stream)
}