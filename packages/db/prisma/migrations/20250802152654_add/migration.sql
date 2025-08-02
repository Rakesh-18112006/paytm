-- CreateTable
CREATE TABLE "public"."P2PTransfer" (
    "id" SERIAL NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "touserId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "P2PTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."P2PTransfer" ADD CONSTRAINT "P2PTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."P2PTransfer" ADD CONSTRAINT "P2PTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
