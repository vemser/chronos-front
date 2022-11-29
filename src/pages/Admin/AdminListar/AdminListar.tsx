import * as React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import {
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import styles from './AdminListar.module.css'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'
import { AdminContext } from '../../../context/AdminContext'
import { IAdminContext, IColaborador2 } from '../../../utils/interfaces'

export const AdminListar: React.FC = () => {
  const navigate = useNavigate()
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<any>(AdminContext)

  useEffect(() => {
    buscarDadosColaborador()
  }, [buscarDadosColaborador])

  return (
    <>
      <AdminHeader />

      <TableContainer
        sx={{ boxShadow: 2, width: 'auto', mt: 2, borderRadius: '5px' }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: '#1e62fe', borderRadius: '8px' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Colaborador(a)</TableCell>
              <TableCell sx={{ color: '#fff' }}>E-mail</TableCell>
              <TableCell sx={{ color: '#fff' }}>Cargo</TableCell>
              <TableCell sx={{ color: '#fff' }}>Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dadosColaborador?.map((user: any) => {
              return <h1>{user.nome}</h1>
              // <TableRow>
              //   <TableCell>{user.nome}</TableCell>
              //   <TableCell>{user.email}</TableCell>
              //   <TableCell>{user.cargos}</TableCell>
              //   <TableCell>
              //     <ModeEditSharpIcon
              //       sx={{ mr: 1, cursor: 'pointer' }}
              //       className={styles.ButtonContainer}
              //     />
              //     <DeleteSharpIcon
              //       sx={{ cursor: 'pointer' }}
              //       className={styles.ButtonContainer}
              //     />
              //   </TableCell>
              // </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
