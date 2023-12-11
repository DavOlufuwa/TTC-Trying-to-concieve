"use client"

import React, { useState } from "react";
import { loginData } from "@/types/users";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import { signInAdmin } from "@/actions/admin";

const page = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const [ userData, setUserData ] = useState<loginData>({
    email: "",
    password: "",
  });

  const { email, password } = userData;
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signInAdmin(userData);
      setAuth({
        ...auth,
        id: response.data.id,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
        accessToken: response.data.accessToken,
      });

      setUserData({
        email: "",
        password: "",
      });
      router.replace("/admin/1232");

    } catch (error: any) {  
      console.log(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Sign in to your User account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default page;
