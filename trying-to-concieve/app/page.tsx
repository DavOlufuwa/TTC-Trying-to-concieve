import { getAllPosts, getPostBySlug } from "@/sanity/sanityUtils";

import React from "react";

const page = async () => {
  const word = await fetch("http://localhost:5050/api/home", {
    cache: "no-store",
  }).then((res) => res.json());

  return <div>{word.message}</div>;
};

export default page;
