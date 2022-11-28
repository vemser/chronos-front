// INTERFACES GLOBAIS

export interface IChildren {
  children?: React.ReactNode
}

// INTERFACES AUTH

export interface IAuthContext {
  userSignup: (newUser: IUser) => Promise<void>
  handleLogin: (user: IUser) => Promise<void>
  handleLogout: () => Promise<void>
}

export interface IColaborador {}

export interface IAdminContext {}

export interface IUser {
  email: string
  senha: string
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
