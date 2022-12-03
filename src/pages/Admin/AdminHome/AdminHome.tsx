import React, { useContext, useLayoutEffect } from 'react'
import styles from './AdminHome.module.css'
import { Box } from '@mui/system'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'
import { AdminListar } from '../AdminListar/AdminListar'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { UserContext } from '../../../context/UserContex'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'

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
