import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(req: Request) {
  try {
    const body: LoginBody = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return (
        new Response(
          JSON.stringify({ error: "Email and password are required" })
        ),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return (
        new Response(JSON.stringify({ error: "Invalid credentials" })),
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN_ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
