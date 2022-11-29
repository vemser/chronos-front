import React, { createContext } from 'react'
import {
  IChildren,
  IAdminContext,
  IColaborador,
  toastConfig
} from '../utils/interfaces'
import { api } from '../utils/api'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'

export const AdminContext = createContext({} as IAdminContext)

export const AdminProvider = ({ children }: IChildren) => {
  const navigate = useNavigate()

  const criarDadosColaborador = async (colaborador: IColaborador) => {
    try {
      await api.post('/usuario', colaborador)
      toast.success('Usuário editado com sucesso!', toastConfig)
      navigate('/admin/listar')
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado, tente novamente', toastConfig)
    }
  }

  const buscarDadosColaborador = async () => {
    try {
      // api.defaults.headers.common['Authorization'] = token
      api.get('/usuario')
    } catch (error) {
      console.log(error)
    }
  }

  const deletarColaborador = async (idUsuario: number) => {
    try {
      // api.defaults.headers.common['Authorization'] = token
      await api.delete(`/usuario/${idUsuario}`)
      toast.success('Usuário deletado com sucesso!', toastConfig)
    } catch (error) {
      console.log(error)
    }
  }

  const editarColaborador = async (idUsuario: IColaborador) => {
    try {
      nProgress.start()

      await api.put(`update-cadastro/${idUsuario}`)
      toast.success('Usuário editado com sucesso!', toastConfig)
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  return <AdminContext.Provider value={{
    
  }}>{children}</AdminContext.Provider>
}
