import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@repo/db/client";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
   

    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({          
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }
                const existuser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,

                    } // ✅ Add this line
                })
                if (!existuser) {
                    throw new Error('User not found');
                }
                const isValid = await compare(credentials.password, existuser.password);
                if (!isValid) {
                    throw new Error('Invalid password');
                }
                return {
                    id: existuser.id,
                    username: existuser.username,
                    email: existuser.email,
                };
            }
        })
    ],
     callbacks: {
         async jwt({ token, user }) {
    if (user) {
      
        return {
            ...token,
            username: user.username,
        };
    }
    return token;
},
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                },
            };
        },
    },
}