import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, content } = await req.json();

    if (!conversationId || !content) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    await prisma.message.create({
      data: {
        content,
        role: "user",
        conversationId,
      },
    });

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (messages.length > 20) {
      const oldMessages = messages.slice(0, -10);

      const summaryPrompt: any = [
        {
          role: "system",
          content: "Summarize this conversation briefly for memory.",
        },
        ...oldMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      const summaryRes = await client.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages: summaryPrompt,
      });


      const summaryText = summaryRes.choices[0]?.message?.content || "";

      await prisma.conversation.update({
        where: { id: conversationId },
        data: {
        summary: summaryText,
        },
    });
    }

    const formatted: {
        role: "system" | "user" | "assistant";
        content: string;
        }[] = [];

    if (conversation?.summary) {
  formatted.push({
    role: "system",
    content: `Conversation summary:\n${conversation.summary}`,
  });
}

const recentMessages = messages.slice(-10);

formatted.push(
  ...recentMessages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }))
);

    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: formatted,
      stream: true,
    });

    const encoder = new TextEncoder();
    let fullText = "";

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || "";
          fullText += text;
          controller.enqueue(encoder.encode(text));
        }
        await prisma.message.create({
          data: {
            content: fullText,
            role: "assistant",
            conversationId,
          },
        });
        controller.close();
      },
    });
    return new Response(stream);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
