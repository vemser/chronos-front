import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import { IPrivateRoute } from '../../utils/interfaces'

const useAuth = () => {

    const { roles, setRoles } = useContext(AuthContext);
    let userToken = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    let userRoles = parseJwt(userToken);

    if (user) {
        return {
            auth: true,
            authRoles: roles
        }
    } else {
        return {
            auth: false,
            authRoles: null
        }
    }
}

const parseJwt = async (token: any) => {
    try {
        let decodedJWT = JSON.parse(atob(token.split('.')[1]));
        let roleArray = decodedJWT.cargos;

        return roleArray;

    } catch (e) {
        return null;

    };
};

export const PrivateRoute = (props: IPrivateRoute) => {

    const { auth, authRoles } = useAuth()

    if (props.roleRequired) {
        return auth ? (
            authRoles?.includes(props.roleRequired) ? (
                <Outlet />
            ) : (
                <Navigate to={'/'} />
            )
        ) : (
            <Navigate to={'/'} />
        )
    } else {
        return auth ? <Outlet /> : <Navigate to={'/'} />
    }

}

export const NewPrivateRoute = (props: IPrivateRoute) => {

    const { refreshAuth } = useContext(AuthContext);
    let userToken = localStorage.getItem('token')

    useEffect(() => {
        userToken && refreshAuth(userToken)
    }, [])


    if (localStorage.getItem('token')) {

        let userToken = localStorage.getItem('token')

        if (userToken) {
            let decodedJWT = JSON.parse(atob(userToken.split('.')[1]))
            let userRoles = decodedJWT.cargos;


            if (userRoles?.includes(props.roleRequired)) {
                return <Outlet />
            } else {
                return <Navigate to={'/'} />
            }
        } else {
            return <Navigate to={'/'} />
        }
    } else {
        return <Navigate to={'/'} />
    }


}

export const AccessRoute = () => {
    const { authRoles } = useAuth()
    let access = false

    authRoles?.includes('ROLE_ADMIN') ? access = true : access = false
    authRoles?.includes('ROLE_GESTAO_DE_PESSOAS') ? access = true : access = false
    authRoles?.includes('ROLE_INSTRUTOR') ? access = true : access = false

    if (access = true) {
        return <Outlet />
    } else {
        return <Navigate to={'/'} />
    }
}