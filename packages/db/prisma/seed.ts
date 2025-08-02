import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcrypt";

async function main() {
  await prisma.user.deleteMany(); // Clean up for repeatable seeding
  await prisma.onRampTransaction.deleteMany();
  await prisma.balance.deleteMany();

  const users = await Promise.all([
    prisma.user.create({
      data: {
        mobile: '7337260458',
        username: 'rakhi',
        password: await bcrypt.hash('12345678', 10),
        OnRampTransaction: {
          create: {
            status: "success",
            token: 'token_1',
            provider: 'HDFC Bank',
            amount: 50,
            startTime: new Date('2023-06-15'),
          },
        },
        Balance: {
          create: {
            amount: 50,
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        mobile: '7702954977',
        username: 'harshith',
      password: await bcrypt.hash('12345678', 10),
        OnRampTransaction: {
          create: {
            status: "success",
            token: 'token_2',
            provider: 'Axis Bank',
            amount: 100,
            startTime: new Date('2023-06-10'),
          },
        },
        Balance: {
          create: {
            amount: 100,
          },
        },
      },
    }),
  ]);

  console.log('Seeded users:', users.map(u => u.mobile));
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
