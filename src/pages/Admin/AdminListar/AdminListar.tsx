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
import { useNavigate } from 'react-router-dom'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'

import styles from './AdminListar.module.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import { AdminContext } from '../../../context/AdminContext'
import {
  IColaborador,
  IAdminContext,
  IChildren
} from '../../../utils/interfaces'

import { userFormSchema } from '../../../utils/schemas'
import Switch from '@mui/material/Switch'
import { AuthContext } from '../../../context/AuthContext'

export const AdminListar: React.FC = () => {
  const { dadosUsuarioLogado } = useContext<any>(AuthContext)

  const navigate = useNavigate()
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

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

              <TableCell sx={{ color: '#fff' }} align="right">
                Ativo
              </TableCell>
              <TableCell sx={{ color: '#fff' }} align="right">
                Editar
              </TableCell>

              <TableCell sx={{ color: '#fff' }} align="right">
                Excluir
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dadosColaborador?.map((user: IColaborador) => {
              console.log(user)
              if (user.status === 'ATIVO') {
                var status = true
              } else {
                var status = false
              }
              return (
                <TableRow key={user.idUsuario}>
                  <TableCell component="th" scope="row" align="justify">
                    {user.nome}
                  </TableCell>
                  <TableCell component="th" scope="row" align="justify">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user?.cargos?.map((cargo: IColaborador) => {
                      return <p>{cargo.descricao}</p>
                    })}
                  </TableCell>

                  <TableCell align="right" width={'40px'}>
                    <Switch
                      checked={status}
                      defaultChecked={status}
                      onClick={() => alterarStatusColab(user)}
                    />
                  </TableCell>
                  <TableCell align="right" width={'40px'}>
                    <ModeEditSharpIcon
                      sx={{ mr: 1, cursor: 'pointer' }}
                      className={styles.ButtonContainer}
                      onClick={() => {
                        navigate('/admin/editar-colaborador/:colaborador', {
                          state: user
                        })
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" width={'40px'} sx={{ pr: 3 }}>
                    <HighlightOffIcon
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
