import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { pexelsImageAsset } from "sanity-plugin-asset-source-pexels";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  title: "trying-to-concieve",
  apiVersion: "2023-12-01",
  basePath: "/blog-admin",
  plugins: [
    deskTool(),
    unsplashImageAsset(),
    pexelsImageAsset({
      API_KEY: process.env.NEXT_PUBLIC_PEXELS_API_KEY as string,
    }),
  ],
  schema: {
    types: schemas,
  },
});

export default config;
