"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";



export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    console.log(session);
    const token = Math.random().toString();
    const userId = session?.user?.id;
    console.log(userId);
    if (!userId) {
        return {
            message : 'user not logged in'
        }  
    }
    await prisma.onRampTransaction.create(
        {
            data: {
                userId,
                amount,
                status: "processing",
                startTime: new Date(),
                provider,
                token,

           }
       }
   )
}
