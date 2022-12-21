import React from 'react'
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
import styles from './AdminColaboradoresTable.module.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { AdminContext } from '../../../context/AdminContext'
import {
  IColaborador,
  IAdminContext,
  TOptionsConfirmDialog
} from '../../../utils/interfaces'
import Switch from '@mui/material/Switch'
import { ConfirmDialog } from '../../ConfirmDialog'


export const AdminColaboradoresTable = () => {

  const navigate = useNavigate()
  const {
    dadosColaborador,
    buscarDadosColaborador,
    deletarColaborador,
    alterarStatusColab
  } = useContext<IAdminContext>(AdminContext)

  useEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  const [confirmDialog, setConfirmDialog] = React.useState<TOptionsConfirmDialog>({
    isOpen: false,
    title: "",
    onConfirm: () => { }
  });

  return (
    <>
      <TableContainer className={styles.tableContainer}
        sx={{ boxShadow: 2, width: 'auto', mt: 2, borderRadius: '5px' }}
      >
        <Table>
          <TableHead sx={{ 
            backgroundColor: '#fff', 
            borderRadius: '8px'                 
          }}>
            <TableRow>
              <TableCell >Colaborador(a)</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell align="right">Editar</TableCell>
              <TableCell align="right">Excluir</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dadosColaborador?.map((user: IColaborador) => {
              if (user.status === 'ATIVO') {
                var status = true
              } else {
                var status = false
              }
              return (
                <TableRow key={user.idUsuario}>

                  <TableCell data-title='Colaborador(a)'>
                    {user.login}
                    {user.login}
                  </TableCell>
              
                  
                  <TableCell data-title='Cargo'>
                    {user?.cargos?.map((cargo: IColaborador) => {
                      return <p key={cargo.idCargo}>{cargo.descricao}</p>
                    })}
                  </TableCell>


                  <TableCell data-title='Editar' align="right">
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
                  <TableCell data-title='Excluir' sx={{ pr: 3 }} align="right">
                    <HighlightOffIcon
                      onClick={(event) => {
                        setConfirmDialog({
                          isOpen: true,
                          title: `Confirma a exclusão do colaborador ${user.login}?`,
                          onConfirm: () => {
                            setConfirmDialog({
                              ...confirmDialog,
                              isOpen: false
                            })
                            deletarColaborador(user.idUsuario)
                          }
                        });
                      }} sx={{
                        cursor: 'pointer',
                        width: '25px',
                        height: '25px',
                        "&:hover": { color: 'red', transform: 'scale(1.05)' },
                        "& :active": {
                          transform: 'scale(.99)',
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </TableContainer>
    </>
  )
}
