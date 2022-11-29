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
import { IColaborador, IAdminContext } from '../../../utils/interfaces'

export const AdminListar: React.FC = () => {
  const navigate = useNavigate()
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

  console.log(dadosColaborador)

  const { deletarColaborador } = useContext(AdminContext)

  useEffect(() => {
    buscarDadosColaborador()
  }, [])

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
            {dadosColaborador?.map((user: IColaborador) => {
              return (
                <TableRow key={user.email}>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.cargos[0].descricao} <br />
                    {user?.cargos[1]?.descricao}
                  </TableCell>
                  <TableCell>
                    <ModeEditSharpIcon
                      sx={{ mr: 1, cursor: 'pointer' }}
                      className={styles.ButtonContainer}
                    />
                    <DeleteSharpIcon
                      sx={{ cursor: 'pointer' }}
                      className={styles.ButtonContainer}
                      onClick={() => deletarColaborador(user.idUsuario)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
