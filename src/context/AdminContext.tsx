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
import { AuthContext } from './AuthContext'

export const AdminContext = createContext({} as IAdminContext)

export const AdminProvider = ({ children }: IChildren) => {
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  const [dadosColaborador, setDadosColaborador] = useState<
    IColaborador[] | undefined
  >(undefined)

  const token  = localStorage.getItem('token');

  const { dadosUsuarioLogado, loggedUser } = React.useContext<any>(AuthContext)

  const criarDadosColaborador = async (data: IColaborador) => {
    let dadosColaborador: IColaborador2 = {
      nome: data.nome,
      email: data.email,
      cargos: []
    }
    data.Administrador &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_ADMIN',
        descricao: 'Administrador'
      })
    data.GestaoDePessoas &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_GESTAO_DE_PESSOAS',
        descricao: 'GestaoDePessoas'
      })
    data.Instrutor &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_INSTRUTOR',
        descricao: 'Instrutor'
      })

    try {
      dadosColaborador.nome = data.nome.replace(/[^a-zA-Z\wÀ-ú ]/g, '')
      const retorno = await api.post('/usuario', dadosColaborador)
      toast.success('Usuário editado com sucesso!', toastConfig)
    } catch (error: any) {
      console.log(error)
      if(error.response.status === 400){
        toast.error(error.response.data.errors[0], toastConfig)
      } else {
        toast.error('Erro ao criar dado do colaborador, tente novamente', toastConfig)
      }
    }
  }

  const buscarDadosColaborador = async (page: string) => {
    try {
      nProgress.start();

      api.defaults.headers.common['Authorization'] = token
      const { data } = await api.get(`/usuario?pagina=${Number(page) - 1 }&tamanho=5`)
        
      setTotalPages(data.quantidadePaginas)
      setDadosColaborador(data.elementos)

    } catch (error) {
      console.log(error)
      toast.error('Houve um erro ao exibir as informações, por favor tente novamente.')

    } finally {
      nProgress.done()
    }
  }

  const deletarColaborador = async (idUsuario: number) => {
    try {
      api.defaults.headers.common['Authorization'] = token
      await api.delete(`/usuario/${idUsuario}`)
      toast.success('Usuário deletado com sucesso!', toastConfig)
      buscarDadosColaborador('1')
    } catch (error) {
      toast.error(`Erro ao deletar o usuario ${idUsuario} , tente novamente!`, toastConfig)
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
    data.Administrador &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_ADMIN',
        descricao: 'Administrador'
      })
    data.GestaoDePessoas &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_GESTAO_DE_PESSOAS',
        descricao: 'GestaoDePessoas'
      })
    data.Instrutor &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_INSTRUTOR',
        descricao: 'Instrutor'
      })
    
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token

      await api.put(`usuario/update-cadastro/${idUsuario}`, dadosColaborador)

      toast.success('Usuário editado com sucesso!', toastConfig)
      navigate('/admin/colaboradores')
    } catch (error: any) {
      console.log(error)
      if(error.response.status === 400){
        toast.error(error.response.data.errors[0], toastConfig)
      } else {
        toast.error('Erro ao criar dado do colaborador, tente novamente', toastConfig)
      }
    } finally {
      nProgress.done()
    }
  }

  // Alterar status do usuário
  const alterarStatusColab = async (data: IColaborador) => {
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      await api.put(`usuario/enable-disable/${data.idUsuario}`)
      if (data.status === 'ATIVO') {
        data.status = 'Inativo'
      } else {
        data.status = 'Ativo'
      }

      toast.success(
        `Status da edição ${data.nome} alterado para ${data.status}!`
      )
      buscarDadosColaborador('1')
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  // Atualizar perfil do PRÓPRIO usuário

  const atualizarSenhaUsuario = async (data: IColaborador) => {
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token
      await api.put(`usuario/update-perfil`, data)
      toast.success('Usuário editado com sucesso!', toastConfig)
    } catch (error: any) {
      console.log(error)
      if(error.response.status === 400){
        toast.error(error.response.data.errors[0], toastConfig)
      } else {
        toast.error('Erro ao criar dado do colaborador, tente novamente', toastConfig)
      }
    } finally {
      nProgress.done()
    }
  }

  // Inserir foto ao usuário
  const imagemBase = dadosUsuarioLogado.imagem

  // Atualizar foto do PRÓPRIO usuário
  const inserirFotoUsuario = async (data: any) => {
    try {
      nProgress.start()
      api.defaults.headers.common['Authorization'] = token

      await api.put(`/foto/upload-image-perfil`, data)

      toast.success('Usuário editado com sucesso!', toastConfig)
      console.log('funcionou!')
    } catch (error) {
      toast.error('Houve algum error, tente novamente!', toastConfig)
      console.log(error)
    } finally {
      nProgress.done()
    }
  }

  //(ADMIN) Colocar uma foto no colaborador específico

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
