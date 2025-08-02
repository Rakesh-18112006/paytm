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
                mobile: { label: "Phone Number", type: "text", placeholder: "7337260458" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if(!credentials?.mobile || !credentials?.password) {
                    throw new Error('Phone Number and password are required');
                }
                const existuser = await prisma.user.findUnique({
                    where: {
                        mobile: credentials.mobile,

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
                    mobile: existuser.mobile,
                };
            }
        })
    ],
     callbacks: {
         async jwt({ token, user }) {
    if (user) {
      
        return {
            ...token,
            id: user.id,
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
                     id: token.id,
                    username: token.username,
                },
            };
        },
    },
}