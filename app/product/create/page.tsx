/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateProductPage = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    // Because this is a client side (because we use 'use client on top'), so we don't have to add http in the api
    await fetch("/api/product", {
      method: "POST", // Method put is to create
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        name,
        description,
        image,
        price,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    setIsLoading(false);
    router.push("/product");
  };

  return (
    <form
      className="w-[500px] mx-auto pt-20 flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Input your title"
        value={code}
        // name="code"
        onChange={(e) => setCode(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Input your content"
        value={name}
        // name="name"
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Input your content"
        value={description}
        // name="description"
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Input your content"
        value={image}
        // name="image"
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Input your content"
        value={price}
        // name="price"
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded-md"
      />
      <button disabled={isLoading}>
        {isLoading ? "Loading ..." : "Submit"}
      </button>
    </form>
  );
};
export default CreateProductPage;
