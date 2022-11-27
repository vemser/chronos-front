// INTERFACES GLOBAIS

export interface IChildren {
    children?: React.ReactNode
}


// INTERFACES AUTH

export interface IAuthContext {
    userSignup: (newUser: IUser) => Promise<void>,
    handleLogin: (user: IUser) => Promise<void>,
    handleLogout: () => Promise<void>,
}

export interface IUser {
    email: string,
    senha: string
}