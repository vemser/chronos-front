import React, { createContext } from 'react'
import { IChildren, IAdminContext } from '../utils/interfaces'


export const AdminContext = createContext({} as IAdminContext);   


export const AdminProvider = ({ children }: IChildren) => {




  return (
    <AdminContext.Provider value={{ }}>
        { children }
    </AdminContext.Provider>
  )
}
