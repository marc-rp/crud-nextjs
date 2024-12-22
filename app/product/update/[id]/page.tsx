"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePage = ({ params }: { params: { id: string } }) => {
  // The update page will need an id in a url
  const id = params.id;
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // Because this is a client side (because we use 'use client on top'), so we don't have to add http in the api
    await fetch("/api/product", {
      method: "PUT", // Method put is to update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        name: name,
        description: description,
        image: image,
        price: price,
        id: id,
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

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetch("/api/product/" + id);
    const json = await res.json();

    if (!json) {
      router.push("/404");
      return;
    }

    setCode(json.product.code);
    setName(json.product.name);
    setDescription(json.product.description);
    setImage(json.product.image);
    setPrice(json.product.price);
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
        {isLoading ? "Loading ..." : "Update"}
      </button>
    </form>
  );
};
export default UpdatePage;
