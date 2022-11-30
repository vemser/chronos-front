import { JoinFullTwoTone } from '@mui/icons-material'
import { applyInitialState } from '@mui/x-data-grid/hooks/features/columns/gridColumnsUtils'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { IAuthContext, IChildren, IUser } from '../utils/interfaces'

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()
  const [roles, setRoles] = useState<string[] | undefined>([])
  const [token, setToken] = useState<string | any>('')

  const parseJwt = async (token: any) => {
    try {
      let decodedJWT = JSON.parse(atob(token.split('.')[1]))
      let roleArray = decodedJWT.CARGOS

      return roleArray
    } catch (e) {
      return null
    }
  }

  const loggedUser = async () => {
    try {
      const { data } = await api.get('/usuario/logged-user')

      console.log(data.cargos);
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (user: IUser) => {
    try {
      console.log('iniciou')

      const { data } = await api.post('/login', user)

      api.defaults.headers.common['Authorization'] = data

      localStorage.setItem('token', data)
      localStorage.setItem('user', user.email)

      let rolesArray = await parseJwt(localStorage.getItem('token'))

      setRoles(rolesArray)

      loggedUser()



      if (rolesArray && rolesArray[0] === 'ROLE_ADMIN') {
        navigate(`/admin`)
      } else if (rolesArray && rolesArray[0] === 'ROLE_GESTAO_DE_PESSOAS') {
        navigate(`/gestao`)
      } else if (rolesArray && rolesArray[0] === 'ROLE_INSTRUTOR') {
        navigate(`/instrutor`)
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
    <AuthContext.Provider
      value={{ roles, handleLogin, handleLogout, loggedUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
