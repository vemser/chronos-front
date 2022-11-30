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
      navigate('/admin')
    } catch (error) {
      console.log(error)
      toast.error('Algo deu errado, tente novamente', toastConfig)
    }
  }

  const buscarDadosColaborador = async (page: string) => {
    try {
      api.defaults.headers.common['Authorization'] = token
      const { data } = await api.get(
        `/usuario?pagina=${Number(page) - 1}&tamanho=10`
      )

      console.log(data.elementos)
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
      buscarDadosColaborador('1')
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    }
  }

  // Atualizar cadastro e cargo do usuário
  const editarColaborador = async (data: IColaborador, idUsuario: number) => {
    let dadosColaborador: IColaborador2 = {
      nome: data.nome,
      email: data.email,
      cargos: []
    }
    data.Administrador && dadosColaborador.cargos.push('ROLE_ADMIN')
    data.GestaoDePessoas &&
      dadosColaborador.cargos.push('ROLE_GESTAO_DE_PESSOAS')
    data.Instrutor && dadosColaborador.cargos.push('ROLE_INSTRUTOR')
    console.log(dadosColaborador)
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      await api.put(`usuario/update-cadastro/${idUsuario}`, dadosColaborador)
      toast.success('Usuário editado com sucesso!', toastConfig)
      navigate('/admin')
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  // Alterar status do usuário
  const alterarStatusColab = async (idUsuario: number) => {
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      await api.put(`usuario/enable-disable/${idUsuario}`)
      buscarDadosColaborador('1')
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  // Atualizar perfil do usuário

  const atualizarSenhaUsuario = async (data: IColaborador) => {
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      toast.success('Usuário editado com sucesso!', toastConfig)
      await api.put(`usuario/update-perfil`, data)
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  // Inserir foto ao usuário

  const inserirFotoUsuario = async (idUsuario: number) => {
    console.log(idUsuario)
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      toast.success('Usuário editado com sucesso!', toastConfig)
      await api.put(`/usuario/upload-image`, idUsuario)
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
        totalPages,
        editarColaborador,
        alterarStatusColab,
        atualizarSenhaUsuario,
        inserirFotoUsuario
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
