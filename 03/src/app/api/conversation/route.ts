import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST() {
    const conversation = await prisma.conversation.create({
        data:{}
    })

     return NextResponse.json(conversation)
}