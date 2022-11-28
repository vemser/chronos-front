import * as React from 'react'
import {
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow
} from '@mui/material'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import styles from './AdminListar.module.css'
import { AdminHeader } from '../../../components/Admin/AdminHeader/AdminHeader'

export const AdminListar: React.FC = () => {
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
            {/* {rows.map(row => ( */}
            <TableRow>
              <TableCell>Henrique Soares</TableCell>
              <TableCell>henrique@hotmail.com </TableCell>
              <TableCell>Gestor de Pessoas</TableCell>
              <TableCell>
                <ModeEditSharpIcon
                  sx={{ mr: 1, cursor: 'pointer' }}
                  className={styles.ButtonContainer}
                />
                <DeleteSharpIcon
                  sx={{ cursor: 'pointer' }}
                  className={styles.ButtonContainer}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Henrique Soares</TableCell>
              <TableCell>henrique@hotmail.com </TableCell>
              <TableCell>Gestor de Pessoas</TableCell>
              <TableCell>
                <ModeEditSharpIcon sx={{ mr: 1, cursor: 'pointer' }} />
                <DeleteSharpIcon sx={{ cursor: 'pointer' }} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Henrique Soares</TableCell>
              <TableCell>henrique@hotmail.com </TableCell>
              <TableCell>Gestor de Pessoas</TableCell>
              <TableCell>
                <ModeEditSharpIcon sx={{ mr: 1, cursor: 'pointer' }} />
                <DeleteSharpIcon sx={{ cursor: 'pointer' }} />
              </TableCell>
            </TableRow>

            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
