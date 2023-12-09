"use client";
import React, { useState } from "react";
import { loginData } from "@/types/users";
import { signInNewUser } from "@/actions/users";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

const page = () => {
  const router = useRouter();
  const { auth, setAuth } = useAuth();
  const [userData, setUserData] = useState<loginData>({
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
      const response = await signInNewUser(userData);
      console.log(response);

      if (response === "invalid username" || response === "invalid password") {
        alert("Invalid username or password");
        return;
      }

      setUserData({
        email: "",
        password: "",
      });

      setAuth(
        {
          ...auth,
          id: response.id,
          email: response.email,
          fullName: response.fullName,
          role: response.role,
          accessToken: response.accessToken,
        }
      )
      router.replace("/users/1232")
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
        <div>
          <p>
            Don't have an account?{" "}
            <Link href="/users/signup">Create an account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default page;
