"use client";
import React, { useState } from "react";
import { loginData } from "@/types/users";
import { useRouter } from "next/navigation";

const page = () => {
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

  return (
    <div>
      <h1>Users</h1>
      <form>
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
