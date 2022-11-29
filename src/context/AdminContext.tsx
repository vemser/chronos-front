import React, { createContext, useState, useContext } from 'react'
import {
  IChildren,
  IAdminContext,
  IColaborador,
  toastConfig,
  IColaborador2
} from '../utils/interfaces'
import { api } from '../utils/api'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'

export const AdminContext = createContext({} as IAdminContext)

export const AdminProvider = ({ children }: IChildren) => {
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  const [dadosColaborador, setDadosColaborador] = useState<
    IColaborador[] | undefined
  >(undefined)
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  )

  const criarDadosColaborador = async (colaborador: IColaborador) => {
    let dadosColaborador: IColaborador2 = {
      nome: colaborador.nome,
      email: colaborador.email,
      cargos: []
    }
    colaborador.Administrador && dadosColaborador.cargos.push('ROLE_ADMIN')
    colaborador.GestaoDePessoas &&
      dadosColaborador.cargos.push('ROLE_GESTAO_DE_PESSOAS')
    colaborador.Instrutor && dadosColaborador.cargos.push('ROLE_INSTRUTOR')

    try {
      await api.post('/usuario', dadosColaborador)
      toast.success('Usuário editado com sucesso!', toastConfig)
      navigate('/admin/listar')
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado, tente novamente', toastConfig)
    }
  }

  const buscarDadosColaborador = async (page: string) => {
    try {
      api.defaults.headers.common['Authorization'] = token
      const { data } = await api.get(`/usuario?pagina=${page}&tamanho=5`)
      setTotalPages(data.totalPages)
      setDadosColaborador(data.elementos)
    } catch (error) {
      console.log(error)
    }
  }

  const deletarColaborador = async (idUsuario: number) => {
    try {
      api.defaults.headers.common['Authorization'] = token
      await api.delete(`/usuario/${idUsuario}`)
      toast.success('Usuário deletado com sucesso!', toastConfig)
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
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

  return (
    <AdminContext.Provider
      value={{
        criarDadosColaborador,
        buscarDadosColaborador,
        dadosColaborador,
        deletarColaborador,
        totalPages
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
