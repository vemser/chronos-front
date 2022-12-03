import React, { useContext, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { Header } from '../../../components/Header/Header'



export const AdminHome: React.FC = () => {
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  return (
    <>
      <Header />
      <Link to='/gestao'>ACESSAR</Link>
    </>
  )
}
