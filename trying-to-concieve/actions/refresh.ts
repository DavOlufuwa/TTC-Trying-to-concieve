"use server"

import axios from "@/lib/axios"

const config = {
  headers: {
    "siteName": "Strict"
  },
  withCredentials: true
}


export const refreshUser =  async () => {
  const response = await axios.get("/api/refresh", config)
  return response
}