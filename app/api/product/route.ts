import prisma from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

// Action to read
export async function GET() {
  const products = await prisma.product.findMany({});

  return NextResponse.json({
    products,
  });
}

// Action to create
export const POST = async (request: NextRequest) => {
  try {
    const { code, name, description, image, price } = await request.json();
    // In a production setting you'd want to validate the incoming data here

    const product = await prisma.product.create({
      data: {
        code: code,
        name: name,
        description: description,
        image: image,
        price: Number(price),
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product." },
      { status: 500 }
    );
  }
};

// Action to delete
export const DELETE = async (request: NextRequest) => {
  const url = new URL(request.url).searchParams;
  const id = Number(url.get("id")) || 0;

  const product = await prisma.product.delete({
    where: {
      id: id,
    },
  });

  if (!product) {
    return NextResponse.json(
      {
        message: "Error",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({});
};

// Action to update or edit
export const PUT = async (request: NextRequest) => {
  const { code, name, description, image, price, id } = await request.json();

  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },

    data: {
      code,
      name,
      description,
      image,
      price,
    },
  });

  return NextResponse.json({
    product,
  });
};
