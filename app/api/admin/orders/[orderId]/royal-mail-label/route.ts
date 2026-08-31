import { getRoyalMailLabel } from "@/app/actions/admin";
import { db } from "@/db";
import { ordersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = {
   params: Promise<{ orderId: string }>
}

export async function GET(req: Request, { params }: Params) {
   const { orderId } = await params;

   const [order] = await db.select().from(ordersTable).where(eq(ordersTable.orderId, orderId)).limit(1);

   if (!order?.royalMailOrderId) {
      return NextResponse.json({ error: "No Royal Mail shipment found" }, { status: 404 });
   }

   const pdf = await getRoyalMailLabel(order.royalMailOrderId);

   return new Response(pdf, {
      headers: {
         "Content-Type": "application/pdf",
         "Content-Disposition": `inline; filename="royal-mail-${orderId}.pdf"`,
      },
   });
}