// INTERFACES GLOBAIS

export interface IChildren {
  children?: React.ReactNode
}

export interface IUser {
  username: string
  password: string
}

// INTERFACES HEADER BUTTON 

export interface IHeaderButton {
  texto?: string
  url?: string
  id?: string
  cargos?: string
}

// INTERFACES AUTH

export interface IAuthContext {
  setRoles: (roles: string[]) => void
  roles: string[] | undefined
  handleLogin: (user: IUser) => Promise<void>
  handleLogout: () => Promise<void>
  dadosUsuarioLogado: any
  loggedUser: () => Promise<void>
  refreshAuth: (token: string) => void
}

// INTERFACES ADMIN

export interface IColaborador2 {
  login: string
  cargos: Object[]
}
export interface IEditarColaborador {
  cargos: Object[]
}

export interface IColaborador {
  login: string
  email: string
  cargos: any
  idCargo: number
  Administrador: string
  GestaoDePessoas: string
  Instrutor: string
  Gestor: string
  Aluno: string
  Colaborador: string
  idUsuario: number | any
  descricao: any
  status: string
}

export interface IUsuarioLogado {
  cargos: any,
  email: string,
  idUsuario: number,
  imagem: any,
  nome: string,
  status: string
}

export interface IAdminContext {
  criarDadosColaborador: (colaborador: IColaborador) => Promise<void>
  buscarDadosColaborador: (page: string) => Promise<void>
  dadosColaborador: IColaborador[] | undefined
  setDadosColaborador: any
  deletarColaborador: (idUsuario: number) => Promise<void>
  totalPages: number
  editarColaborador: (data: IColaborador, idUsuario: number) => Promise<void>
  alterarStatusColab: (idUsuario: IColaborador) => Promise<void>
  atualizarSenhaUsuario: (data: IColaborador) => Promise<void>
  inserirFotoUsuario: (data: any) => Promise<void>
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
  currentPage: any,
  setCurrentPage: any
  loading: boolean
}

export interface ICargos {
  administrador: boolean,
  gestaoDePessoas: boolean,
  instrutor: boolean,
  gestor: boolean,
  aluno: boolean,
  colaborador: boolean
}

export interface ICargos {
  administrador: boolean,
  gestaoDePessoas: boolean,
  instrutor: boolean,
  gestor: boolean,
  aluno: boolean,
  colaborador: boolean
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
  currentPage: any
  setCurrentPage: any,
  loading: boolean
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
  processos: IProcesso[]
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
  processoCritico: boolean | string
}

export interface IAreasEnvolvidas {
  nome: string
  idAreaEnvolvida: number
  value: any
}

export interface IResponsaveis {
  nome: string
  idResponsavel: number
}

// INTERFACES DIA NAO UTIL

export interface IDiaNaoUtilContext {
  diasNaoUteis: IDiaNaoUtil[],
  totalPages: number,
  getDiaNaoUtil: (page: string) => Promise<void>
  postDiaNaoUtil: (data: IDiaNaoUtil) => Promise<void>
  deleteDiaNaoUtil: (idDiaNaoUtil: number) => Promise<void>
  putDiaNaoUtil: (data: IDiaNaoUtil) => Promise<void>
  currentPage: any,
  setCurrentPage: any,
  setDiasNaoUteis: any,
  setTotalPages: any,
  loading: boolean
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
  calendarioEdicao: ICalendarioEdicao[]
  calendarioGeral: ICalendarioGeral[]
  getCalendarioPorEdicao: (idEdicao: IEdicao | undefined) => Promise<void>
  getCalendarioGeral: () => Promise<void>
  getExcelCalendario: (idEdicao: number) => Promise<void>,
  loading: boolean
}

export interface ICalendarioEdicao {
  dia: string,
  etapa: string | null,
  processo: string | undefined | null
  feriado: string | undefined | null
  idEtapa: number
  cor: string
  areas: string | string[]
  critico: string | boolean
}

export interface ICalendarioGeral {
  dia: string,
  etapa: string | null,
  processo: string | undefined | null
  feriado: string | undefined | null
  idEtapa: number
  idEdicao: number
}

// Confirmar Exclusão

export interface TOptionsConfirmDialog {
  isOpen: boolean,
  title: string,
  onConfirm(): void
}

export interface Props {
  confirmDialog: TOptionsConfirmDialog,
  setConfirmDialog(options: TOptionsConfirmDialog): void
}

export interface ICalendarioProcesso {
  date: string,
  title: string | null | undefined
}

// Busca colaboradores

export interface IBuscaContext {
  buscarColaborador: (pesquisa: any, buscarCargos: any, page: any) => Promise<void>
  isSearch: boolean,
  setIsSearch: any,
  searchPayload: any,
  setSearchPayload: any,
}

export interface IBuscaDiasContext {
  buscarDiasNaoUteis: (pesquisa: any, page: any) => Promise<void>
  isSearch: boolean,
  setIsSearch: any,
  searchPayload: any,
  setSearchPayload: any,
}