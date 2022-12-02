import React, { useContext, useLayoutEffect } from 'react'
import styles from './AdminHome.module.css'
import { Box } from '@mui/system'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'
import { AdminListar } from '../AdminListar/AdminListar'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
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

      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'80%'}>
          <AdminListar />
          <div>
            <PaginacaoColaborador />
          </div>
        </Box>
      </Box>
    </>
  )
}
