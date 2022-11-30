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

import { AdminContext } from '../../../context/AdminContext'
import {
  IColaborador,
  IAdminContext,
  IChildren
} from '../../../utils/interfaces'
import { PaginacaoColaborador } from '../../../context/PaginacaoColaborador'

import { userFormSchema } from '../../../utils/schemas'
import Switch from '@mui/material/Switch'

export const AdminListar: React.FC = () => {
  const navigate = useNavigate()
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

  console.log(dadosColaborador)

  const { deletarColaborador } = useContext(AdminContext)

  useEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  const { alterarStatusColab } = useContext(AdminContext)

  return (
    <>
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
                    {user?.cargos?.map((cargo: IColaborador) => {
                      return <p>{cargo.descricao}</p>
                    })}
                  </TableCell>
                  <TableCell>
                    <ModeEditSharpIcon
                      sx={{ mr: 1, cursor: 'pointer' }}
                      className={styles.ButtonContainer}
                      onClick={() => {
                        navigate('/admin/editar-colaborador/:colaborador', {
                          state: user
                        })
                      }}
                    />

                    <DeleteSharpIcon
                      sx={{ cursor: 'pointer' }}
                      className={styles.ButtonContainer}
                      onClick={() => deletarColaborador(user.idUsuario)}
                    />
                    <Switch
                      onClick={() => alterarStatusColab(user.idUsuario)}
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
