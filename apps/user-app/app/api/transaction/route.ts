// pages/api/create-transaction.ts

import { NextRequest } from "next/server";
import { createOnRampTransaction } from "../../../lib/actions/createOnRampTransactions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, provider } = body;

    await createOnRampTransaction(amount, provider);

    return Response.json({ success: true });
  } catch (err) {
    console.error("Failed to create transaction", err);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
}
