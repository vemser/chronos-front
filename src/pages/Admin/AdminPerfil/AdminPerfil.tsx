import React from 'react'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

import { EditarPerfil } from '../../../components/EditarPerfil/EditarPerfil'
import { Header } from '../../../components/Header/Header'

export const AdminPerfil = () => {
  return (
    <>
      <Header/>
      <EditarPerfil />
    </>
  )
}
