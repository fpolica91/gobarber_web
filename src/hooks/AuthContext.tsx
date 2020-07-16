import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface SignInCredentials {
  email: string
  password: string
}

interface AuthState {
  user: object
  token: string
}

interface AuthContextData {
  name: object
  signIn({ email, password }: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@goBarber:user')
    const token = localStorage.getItem('@goBarber:token')
    if (user && token) {
      return { user: JSON.parse(user), token }
    }
    return {} as AuthState
  })

  const signOut = useCallback(() => {
    localStorage.removeItem('@goBarber:user')
    localStorage.removeItem('@goBarber:token')
    setData({} as AuthState)
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { user, token } = response.data
    localStorage.setItem('@goBarber:token', token)
    localStorage.setItem('@goBarber:user', JSON.stringify(user))
    setData({ user, token })
  }, [])

  return (
    <AuthContext.Provider value={{ name: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { AuthContext, AuthProvider, useAuth }
