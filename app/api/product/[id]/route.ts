import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  params: { params: Promise<{ id: string }> }
) => {
  const id = (await params.params).id;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ product });
};
