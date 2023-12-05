import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email : { label: "Email", type: "text", autoComplete: false, required: true },
        password : { label: "Password", type: "password", autoComplete: false, required: true },
      }, 
      async authorize(credentials, req) {
        const response = await axios.post('/auth/login', credentials);
        const user = response.data;
      }
    })
  ]
})