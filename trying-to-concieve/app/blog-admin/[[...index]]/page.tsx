"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

const AdminPage = () => {

  return (
    <div>
      <NextStudio config={config} />;
    </div>
  );
};

export default AdminPage;
