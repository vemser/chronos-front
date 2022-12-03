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
  setRoles: (roles: string[]) => void
  roles: string[] | undefined
  handleLogin: (user: IUser) => Promise<void>
  handleLogout: () => Promise<void>
  dadosUsuarioLogado: any
  loggedUser: () => Promise<void>
}

// INTERFACES ADMIN

export interface IColaborador2 {
  nome: string
  email: string
  cargos: Object[]
}


export interface IColaborador {
  nome: string
  email: string
  cargos: any
  idCargo: number
  Administrador: string
  GestaoDePessoas: string
  Instrutor: string
  imagem: string | File
  idUsuario: number | any
  descricao: any
  senhaAtual: string
  novaSenha: string
  confirmacaoNovaSenha: string
  status: string
}

export interface IAdminContext {
  criarDadosColaborador: (colaborador: IColaborador) => Promise<void>
  buscarDadosColaborador: (page: string) => Promise<void>
  dadosColaborador: IColaborador[] | undefined
  deletarColaborador: (idUsuario: number) => Promise<void>
  totalPages: number
  editarColaborador: (data: IColaborador, idUsuario: number) => Promise<void>
  alterarStatusColab: (idUsuario: IColaborador) => Promise<void>
  atualizarSenhaUsuario: (data: IColaborador) => Promise<void>
  inserirFotoUsuario: (data: any) => Promise<void>
 
}

// INTERFACES USER

export interface IUserContext {
  edicoes: IEdicao[]
  etapas: IEtapa[]
  totalPages: number
  areasEnvolvidas: IAreasEnvolvidas[]
  responsaveis: IResponsaveis[]

  getEdicoesList: (page: string) => Promise<void>
  deleteEdicao: (idEdicao: number, nomeEdicao: string) => Promise<void>
  createEdicao: (edicao: IEdicao) => Promise<void>
  editEdicao: (edicao: IEdicao) => Promise<void>
  cloneEdicao: (edicao: IEdicao) => Promise<void>
  ativoInativo: (data: IEdicao) => Promise<void>

  getEtapas: (idEdicao: number) => Promise<void>
  deleteEtapa: (idEtapa: number, idEdicao: number) => Promise<void>
  createEtapa: (etapa: IEtapa, idEdicao: number) => Promise<void>
  editEtapa: (etapa: IEtapa, idEdicao: number) => Promise<void>

  getProcessos: (idEdicao: number, idEtapa: number) => Promise<void>
  deleteProcesso: (idProcesso: number, idEdicao: number) => Promise<void>
  createProcesso: (processo: IProcesso, area: string[], responsaveis: string[], idEtapa: number, idEdicao: number) => Promise<void>
  editProcesso: (processo: IProcesso, area: string[], responsaveis: string[], idEdicao: number) => Promise<void>

  getAreaEnvolvida: () => Promise<void>
  getResponsavel: () => Promise<void>
}

export interface IEdicao {
  nome: string
  dataInicial: string
  dataFinal: string
  status: string
  idEdicao: number
}

export interface IEtapa {
  nome: string
  ordemExecucao: number
  idEtapa: number
}

export interface IProcesso {
  nome: string
  idEtapa: number
  areasEnvolvidas: string[]
  responsaveis: string[]
  duracaoProcesso: number
  diasUteis: number
  ordemExecucao: number
  idProcesso: number
}

export interface IAreasEnvolvidas {
  nome: string
  idResponsavel: number
  value: any
}

export interface IResponsaveis {
  nome: string
  idAreaEnvolvida: number
}

// INTERFACES DIA NAO UTIL

export interface IDiaNaoUtilContext {
  diasNaoUteis: IDiaNaoUtil[]
  getDiaNaoUtil: () => Promise<void>
  postDiaNaoUtil: (data: IDiaNaoUtil) => Promise<void>
  deleteDiaNaoUtil: (idDiaNaoUtil: number) => Promise<void>
  putDiaNaoUtil: (data: IDiaNaoUtil) => Promise<void>
}

export interface IDiaNaoUtil {
  descricao: string
  dataInicial: string
  dataFinal: string
  idDiaNaoUtil: number
  repeticaoAnual: boolean | string
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

// PRIVATE ROUTES

export interface IPrivateRoute {
  roleRequired: any
}

// CALENDARIO CONTEXT

export interface ICalendarioContext {
  
}