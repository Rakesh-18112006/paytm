import { NextResponse } from 'next/server';
import prisma from '@repo/db/client'; // Adjust the import path as necessary
import { hash } from 'bcrypt';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// Define Zod schema
const signupSchema = z.object({
  username: z.string()
    .min(2, 'Username must be at least 2 characters')
    .max(100),
  email: z.string()
    .email('Invalid email'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = body;

        // Validate using Zod
        const result = signupSchema.safeParse({ username, email, password });

        if (!result.success) {
            return NextResponse.json({
                error: result.error.message,
            });
        }
        if (!username || !email || !password) {
            return NextResponse.json({
                error: "Missing required fields",
            });
        }
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUserByEmail) {
            return NextResponse.json({
                error: "User already exists",
            });
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (existingUserByUsername) {
            return NextResponse.json({
                error: "User already exists",
            });
        }

        const hashedPassword = await hash(password, 10);


        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password:hashedPassword,
            },
        });

        const { password : newUserPassword, ...userWithoutPassword } = newUser; // Exclude password from the response

        return NextResponse.json({
            user: userWithoutPassword,
            message: "user Created successfully",
            status: 200
        });
    } catch (error) {
    console.error("Error in user registration:", error);  // Add this for debugging
    return NextResponse.json({
        error: "Internal server error",
    }, { status: 500 });
}

}
