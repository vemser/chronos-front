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
    roles: string[] | undefined,
    handleLogin: (user: IUser) => Promise<void>,
    handleLogout: () => Promise<void>,
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
    edicoes: IEdicao[],
    etapas: IEtapa[],
    totalPages: number,
    getEdicoesList: (page: string) => Promise<void>,
    deleteEdicao: (idEdicao: number) => Promise<void>,
    createEdicao: (edicao: IEdicao) => Promise<void>,
    editEdicao: (edicao: IEdicao) => Promise<void>,
    getEtapas: (idEdicao: number) => Promise<void>,
    deleteEtapa: (idEtapa: number, idEdicao: number) => Promise<void>,
    createEtapa: (etapa: IEtapa, idEdicao: number) => Promise<void>,
    editEtapa: (etapa: IEtapa, idEdicao: number) => Promise<void>,
    // getProcessos: (idEdicao: number, idEtapa: number) => Promise<void>
    // deleteProcesso: (idProcesso: number) => Promise<void>,
    // createProcesso: (processo: IProcesso) => Promise<void>,
    // editProcesso: (processo: IProcesso) => Promise<void>
    ativoInativo: (idEdicao: number) => Promise<void>
}


export interface IEdicao{
    nome: string,
    dataInicial: string,
    dataFinal: string,
    status: string,
    idEdicao: number
}

export interface IEtapa {
    nome: string,
    idEtapa: number,
}

export interface IProcesso {
  nome: string,
  idEtapa: number,
  areaEnvolvida: string[],
  responsavel: string[]
  duracaoProcesso: number,
  diasUteis: number,
  ordem: number
}

// INTERFACES DIA NAO UTIL

export interface IDiaNaoUtilContext {


}

export interface IDiaNaoUtil{
  totalElementos: number,
  quantidadePaginas: number,
  pagina: number,
  tamanho: number,
  elementos: []
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

export interface IPrivateRoute{
    roleRequired: any
}

