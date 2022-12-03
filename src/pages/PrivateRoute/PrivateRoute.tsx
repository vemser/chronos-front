import React, { useContext, useState } from 'react'
import { Outlet, Navigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { IPrivateRoute } from '../../utils/interfaces'

const useAuth = () => {
    

    const { roles } = useContext(AuthContext);



    const user = localStorage.getItem('user')

    if(user) {
        return {
            auth: true,
            role: roles // ['ROLE_ADMIN']
        }
    }   else {
        return {
            auth: false,
            role: null
        }
    }
}


export const PrivateRoute = (props: IPrivateRoute) => {
    const {auth, role} = useAuth()


    if(props.roleRequired) {

        return auth ? (
            role?.includes(props.roleRequired) ? (
                <Outlet />
            ) : (
                <Navigate to={'/'} />
            )
        )   :   (
            <Navigate to={'/'} />
        )
    } else {
        return auth ? <Outlet /> : <Navigate to={'/'} />
    }

}

export const AccessRoute = () => {
    const { role } = useAuth()
    let access = false

    role?.includes('ROLE_ADMIN') ? access = true : access = false
    role?.includes('ROLE_GESTAO_DE_PESSOAS') ? access = true : access = false
    role?.includes('ROLE_INSTRUTOR') ? access = true : access = false
     
    
    if (access = true) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}