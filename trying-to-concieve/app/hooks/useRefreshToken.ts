"use client"
import useAuth from './useAuth'
import { refreshUser } from '@/actions/refresh'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const refresher = async () => {
    const response = await refreshUser()

    if (response.data.accessToken) {
      setAuth(
        (prev) => {
          return {
            ...prev,
            id: response.data.id,
            email: response.data.email,
            fullName: response.data.fullName,
            role: response.data.role,
            accessToken: response.data.accessToken,
          }
        }
      )
    }
    return response.data.accessToken
  }

  return refresher
}

export default useRefreshToken