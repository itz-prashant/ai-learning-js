import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type SignupBody = {
    name? : string;
    email: string;
    password:string
}

export async function POST(req:Request) {
    try {
        const body: SignupBody = await req.json()

    const { name, email, password } = body;

    if(!email || !password){
        return new Response(
            JSON.stringify({error: "Email and password are required"}),
            {status:400}
        )
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
        where:{email}
    })

    if(existingUser){
        if (password.length < 6) {
            return new Response(
                JSON.stringify({ error: "Password must be at least 6 characters" }),
                { status: 400 }
            );
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        },
        select:{
            id: true,
            email: true,
            name: true,
            createdAt:true
        }
    })
    return new Response(JSON.stringify(user), {
      status: 201,
    });
    } catch (error) {
        console.error("SIGNUP_ERROR:", error);

        return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500 }
        );
    }
}