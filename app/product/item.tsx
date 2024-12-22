"use client";

import React from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

// interface ProductProps {
//   id: number;
//   code: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// }

interface Props {
  product: Product;
}

export default function ItemPage({ product }: Props) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await fetch("/api/product?id=" + id, {
      method: "DELETE",
    });

    // const data: ResponseProps = await response.json();

    router.refresh();
  };

  return (
    <div className="border-2 border-black p-3 rounded-md">
      {/* <h2 className="mb-2">ID: {product.id}</h2> */}
      <h1 className="text-xl font-semibold">{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price.toString()}</p>
      <div className="flex justify-end gap-3 mt-4 text-sm">
        <button
          className="font-semibold"
          onClick={() => router.push(`/product/update/${product.id}`)}
        >
          Update
        </button>
        <button
          className="font-semibold text-red-500"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
