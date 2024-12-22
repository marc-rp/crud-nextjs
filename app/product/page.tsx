/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";
import Item from "@/app/product/item";

// interface ProductProps {
//   id: number;
//   code: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// }

// interface ResponseProps {
//   products: ProductProps[];
// }

const getProducts = async () => {
  // Because this is server components, we have to define the URL with http
  const response = await fetch("http://localhost:3000/api/product", {
    next: { revalidate: 0 },
  });
  // Define the output to json, because if only res, it will return by any type
  // const data: ResponseProps = await response.json();
  // console.log(data);
  const data = await response.json();
  return data;
};

const ListPage = async () => {
  const products = await getProducts();
  return (
    //This will link to the create page
    <div className="w-[1200px] mx-auto py-20">
      <Link
        href={"/product/create"}
        className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-md text-white"
      >
        Create
      </Link>
      <div className="grid grid-cols-3 gap-5 mt-8">
        {products?.products
          ?.map((product: any, i: number) => <Item key={i} product={product} />)
          .sort()
          .reverse()}
      </div>
    </div>
  );
};
export default ListPage;
