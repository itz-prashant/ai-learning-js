import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();

  const { conversationId, content } = body;

  await prisma.message.create({
    data: {
      content,
      role: "user",
      conversationId,
    },
  });

  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });

  if (messages.length > 20) {
    const oldMessages = messages.slice(0, -10);

    const summaryPrompt: any = [
  {
    role: "system",
    content: "Summarize the conversation briefly for memory.",
  },
  ...oldMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  })),
];

    const summaryRes = await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: summaryPrompt,
    });

    const summaryText = summaryRes.choices[0].message.content || "";

    // DB में save
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        summary: summaryText,
      },
    });
  }

  const formattedMessages: any[] = [];

  if (conversation?.summary) {
    formattedMessages.push({
      role: "system",
      content: `Conversation summary so far:\n${conversation.summary}`,
    });
  }
  const recentMessages = messages.slice(-10);

  formattedMessages.push(
    ...recentMessages.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }))
  );

  const completion = await client.chat.completions.create({
    model: "meta-llama/llama-3-8b-instruct",
    messages: formattedMessages,
    stream: true,
  });

  const encoder = new TextEncoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullText += content;
        controller.enqueue(encoder.encode(content));
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
}
