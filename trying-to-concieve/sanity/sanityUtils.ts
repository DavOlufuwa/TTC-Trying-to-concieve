import { createClient, groq } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-12-01",
  useCdn: true,
});

export const getAllPosts = async () => {
  const posts = await client.fetch(
    groq`*[_type == "posts"]{
    title,
    description,
    "slug": slug.current,
    tags,
    author,
    publishedAt,
    body,
    "image": image.asset->url,
  }`,
    {
      next: { revalidate: 3000 },
    }
  );
  return posts;
};


export const getPostBySlug = async (slug: string) => {
  
  const query =  groq`*[_type == "posts" && slug.current == $slug][0]{
    title,
    description,
    tags,
    author,
    publishedAt,
    body,
    "image": image.asset->url,
  }`
  
  const post = await client.fetch(query, {slug});
  
  return post;
}