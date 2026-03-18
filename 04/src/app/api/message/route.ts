import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req: Request){
    try {
        const session  = await getServerSession(authOptions)
        if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const {searchParams}  = new URL(req.url)
    const conversationId = searchParams.get("conversationId")

    if(!conversationId){
        return NextResponse.json(
        { error: "conversationId required" },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
    }
}