import React from 'react'
import styles from './AdminHome.module.css'

import { Row } from '../../../components/Row/Row'
import { Box } from '@mui/system'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

export const AdminHome: React.FC = () => {
  return (
    <>
      <AdminHeader />
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'80%'}>
          <Row />
        </Box>
      </Box>
    </>
  )
}
