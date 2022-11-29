// INTERFACES GLOBAIS

export interface IChildren {
  children?: React.ReactNode
}

export interface IUser {
  email: string
  senha: string
}

// INTERFACES AUTH

export interface IAuthContext {
  handleLogin: (user: IUser) => Promise<void>
  handleLogout: () => Promise<void>
}

// INTERFACES ADMIN

export interface IColaborador2 {
  nome: string
  email: string
  cargos: string[]
}

export interface IColaborador {
  nome: string
  email: string
  idCargo: number
  Administrador: string
  GestaoDePessoas: string
  Instrutor: string
  imagem: string
  idUsuario: number
}

export interface IAdminContext {
  criarDadosColaborador: (colaborador: IColaborador) => Promise<void>
}

// INTERFACES USER

export interface IUserContext {
  edicoes: IEdicoes[]
  etapas: IEtapas[]
  totalPages: number
  getEdicoesList: (page: string) => Promise<void>
  deleteEdicao: (idEdicao: number) => Promise<void>
  createEdicao: (edicao: IEdicao) => Promise<void>
  editEdicao: (edicao: IEdicao) => Promise<void>
  getEtapas: (idEdicao: number) => Promise<void>
  deleteEtapa: (idEtapa: number) => Promise<void>
  createEtapa: (etapa: IEtapa) => Promise<void>
  editEtapa: (etapa: IEtapa) => Promise<void>
  getProcessos: (idEdicao: number, idEtapa: number) => Promise<void>
  deleteProcesso: (idProcesso: number) => Promise<void>
  createProcesso: (processo: IProcesso) => Promise<void>
  editProcesso: (processo: IProcesso) => Promise<void>
}

export interface IEdicoes {}
export interface IEdicao {
  id: number
}

export interface IEtapas {}
export interface IEtapa {
  id: number
  idEdicao: number
}

export interface IProcesso {
  idEdicao: number
  idEtapa: number
  idProcesso: number
}

// CONFIG TOASTIFY

export const toastConfig: object = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light'
}
