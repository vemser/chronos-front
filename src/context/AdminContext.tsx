import { createContext, useState, useContext } from 'react'
import {
  IChildren,
  IAdminContext,
  IColaborador,
  toastConfig,
  IColaborador2,
  IEditarColaborador
} from '../utils/interfaces'
import { api, authApi } from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import nProgress from 'nprogress'
import { AuthContext } from './AuthContext'

export const AdminContext = createContext({} as IAdminContext)

export const AdminProvider = ({ children }: IChildren) => {
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  const [dadosColaborador, setDadosColaborador] = useState<IColaborador[] | undefined>(undefined)
  const token = localStorage.getItem('token');
  const { dadosUsuarioLogado, loggedUser } = useContext(AuthContext)
  const [currentPage, setCurrentPage] = useState<any>(1)

  const [loading, setLoading] = useState<boolean>(false)


  const criarDadosColaborador = async (data: IColaborador) => {
    let dadosColaborador: IColaborador2 = {
      login: data.login,
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
    data.Gestor &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_GESTOR',
        descricao: 'Gestor'
      })
    data.Aluno &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_ALUNO',
        descricao: 'Aluno'
      })
    data.Colaborador &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_COLABORADOR',
        descricao: 'Colaborador'
      })

    try {
      nProgress.start()
      setLoading(true)
      toast.success('Usuário criado com sucesso!', toastConfig)
      navigate("/admin/colaboradores")
      setCurrentPage(1)
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 400) {
        toast.error(error.response.data.errors[0], toastConfig)

      } else {
        toast.error('Erro ao criar dado do colaborador, tente novamente', toastConfig)
      }
    } finally {
      nProgress.done()
      setLoading(false)
    }
  }

  const buscarDadosColaborador = async (page: string) => {
    try {
      nProgress.start();
      authApi.defaults.headers.common['Authorization'] = token
      const { data } = await authApi.get(`/usuario?pagina=${Number(page) - 1}&tamanho=8`)
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
      nProgress.start()
      setLoading(true)

      authApi.defaults.headers.common['Authorization'] = token
      await authApi.delete(`/usuario/${idUsuario}`)
      toast.success(`Usuário ${idUsuario} deletado com sucesso!`, toastConfig)
      buscarDadosColaborador('1')
      setCurrentPage(1)

    } catch (error) {
      toast.error(`Erro ao deletar o usuario ${idUsuario} , tente novamente!`, toastConfig)
      console.log(error)

    } finally {
      nProgress.done()
      setLoading(false)
    }
  }

  // Atualizar cadastro e cargo do usuário
  const editarColaborador = async (data: IColaborador, idUsuario: number) => {
    let dadosColaborador: IEditarColaborador = {
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
    data.Gestor &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_GESTOR',
        descricao: 'Gestor'
      })
    data.Aluno &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_ALUNO',
        descricao: 'Aluno'
      })
    data.Colaborador &&
      dadosColaborador.cargos.push({
        nome: 'ROLE_COLABORADOR',
        descricao: 'Colaborador'
      })

    try {
      nProgress.start()
      setLoading(true)
      authApi.defaults.headers.common['Authorization'] = token
      await authApi.put(`usuario/update-cargos/${idUsuario}`, dadosColaborador)
      toast.success('Usuário editado com sucesso!', toastConfig)
      navigate('/admin/colaboradores')
      setCurrentPage(1)
    } catch (error: any) {
      console.log(error)
      if (error.response.status === 400) {
        toast.error(error.response.data.errors[0], toastConfig)
      } else {
        toast.error('Erro ao criar dado do colaborador, tente novamente', toastConfig)
      }
    } finally {
      nProgress.done()
      setLoading(false)
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
        `Status do(a) colaborador(a) ${data.login} alterado para ${data.status}!`
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
      navigate('/')

    } catch (error: any) {
      console.log(error)
      if (error.response.status === 400) {
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
      authApi.defaults.headers.common['Authorization'] = token
      await authApi.put(`/foto/upload-image-perfil`, data)
      loggedUser()
      toast.success('Foto de perfil alterada com sucesso', toastConfig)

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
        setDadosColaborador,
        deletarColaborador,
        totalPages,
        editarColaborador,
        alterarStatusColab,
        atualizarSenhaUsuario,
        inserirFotoUsuario,
        setTotalPages,
        currentPage,
        setCurrentPage,
        loading
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}