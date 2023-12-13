"use client"

import { signUpAdmin } from '@/actions/admin'
import { Adminform } from '@/types/admins'
import { useState } from 'react'

const page = () => {
  const [formData, setFormData] = useState<Adminform>({
    fullName: "",
    email: "",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")


  const { fullName, email, password } = formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleConfirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  
    if (password !== confirmPassword) {
      setError("Passwords do not match")
    } else {
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signUpAdmin(formData)

      setFormData({
        fullName: "",
        email: "",
        password: "",
      })
      
    }catch(error: any) {
      console.log(error.response.data.error)
    }

  }
  


  return (
    <div>
      <h1>Signup Admin</h1>
      <form>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            autoComplete="off"
            value={fullName}
            onChange={handleChange}
            required
          />
        </div>
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
            required
          />
        </div>
        <div>
          {
            error && <p>{error}</p>
          }
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default page