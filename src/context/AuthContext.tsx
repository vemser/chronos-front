import { applyInitialState } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { IAuthContext, IChildren, IUser } from '../utils/interfaces'

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()
  const [role, setRole] = useState(null)

  const handleLogin = async (user: IUser) => {
    try {
      const { data } = await api.post('/login', user)

      api.defaults.headers.common['Authorization'] = data

      localStorage.setItem('token', data)
      localStorage.setItem('user', user.email)

      setRole(data.role)

      if (data?.role === 'ROLE_ADMIN') {
        navigate(`/home/admin}`)
      } else if (data?.role === 'ROLE_GESTAO_DE_PESSOAS') {
        navigate(`/home/gestao}`)
      } else if (data?.role === 'ROLE_INSTRUTOR') {
        navigate(`/home/instrutor}`)
      } else {
        navigate(`/`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.defaults.headers.common['Authorization'] = undefined
  }

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
