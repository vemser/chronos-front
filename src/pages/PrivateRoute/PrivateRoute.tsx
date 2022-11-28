import React from 'react'
import { Outlet, Navigate } from 'react-router'

export const PrivateRouteAdmin = () => {

    const token = localStorage.getItem('token');
    return token ? <Outlet />  : <Navigate to='/' />
}

