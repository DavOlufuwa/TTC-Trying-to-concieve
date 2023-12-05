"use client";
import { signUpSuperAdmin } from "@/actions/superadmin";
import { useState } from "react";
import { useRouter } from "next/navigation";


const page = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== formData.password) {
      setError("Passwords do not match");
    }
    else {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUpSuperAdmin(formData)
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="h-4">
            {error !== "" && <p className="text-red-500">{error}</p>}
          </div>
          <button type="submit" className="bg-red-500">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default page;
