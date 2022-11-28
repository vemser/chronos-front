import React, { createContext } from 'react'
import { IChildren, IUserContext } from '../utils/interfaces'


export const UserContext = createContext({} as IUserContext);   


export const UserProvider = ({ children }: IChildren) => {




  return (
    <UserContext.Provider value={{ }}>
        { children }
    </UserContext.Provider>
  )
}
