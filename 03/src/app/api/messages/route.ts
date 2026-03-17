import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){
    const {searchParams}  = new URL(req.url)

    const conversationId = searchParams.get("conversationId")

    if(!conversationId){
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(messages);
}