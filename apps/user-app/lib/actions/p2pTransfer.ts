'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function p2pTransfer(to : string ,amount : number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;

    if (!from) {
        return {
            message: 'ERR: While Sending money',
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            mobile : to
        }
    })

    if (!toUser) {
        return {
            message : 'Error invalid number | user not found'
        }
    }

    await prisma.$transaction(async (tx) => {
                // Lock both accounts
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE`;
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${toUser.id} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: {
                userId : from
            }
        })

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error(" Insufficient Funds ")
        }

        await tx.balance.update({
            where: {
                userId: from
            },
            data: {
                amount: { decrement: amount }
            }
        });

        await tx.balance.update({
            where: {
                userId: toUser.id
            },
            data: {
                amount: {
                    increment : amount
                }
            }
        }
        )
        await tx.p2PTransfer.create(
            {
                data: {
                    fromUserId: from,
                    toUserId: toUser.id,
                    amount,
                    timestamp : new Date()
                }
            }
        )
    })
} 