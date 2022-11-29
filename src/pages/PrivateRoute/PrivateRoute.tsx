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