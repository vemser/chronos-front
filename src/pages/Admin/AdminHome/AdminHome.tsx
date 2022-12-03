import React, { useContext, useLayoutEffect } from 'react'

import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'


export const AdminHome: React.FC = () => {
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  return (
    <>
      <AdminHeader />
    </>
  )
}
