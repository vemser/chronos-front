import * as React from 'react'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  Button
} from '@mui/material'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import styles from './GestaoEdicoes.module.css'
import { Header } from '../../../components/Header/Header'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import SearchIcon from '@mui/icons-material/Search'

export const GestaoEdicoes: React.FC = () => {
  return (
    <>
      <Header />

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>
          <Box className={styles.ContainerNova}>
            <Button variant="contained"> + NOVA</Button>{' '}
          </Box>
          <div className={styles.ContainerTitle}>
            <h2>Edições do Vem Ser</h2>
          </div>
          <div className={styles.ContainerHead}>
            <h4>Edições</h4>
            <h4>Ações</h4>
          </div>
          <TableContainer
            sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}
          >
            <Table>
              <TableBody>
                {/* {rows.map(row => ( */}
                <TableRow>
                  <TableCell>Fluxo Vem Ser 9 edição</TableCell>

                  <TableCell className={styles.ContainerButton}>
                    <SearchIcon className={styles.ButtonSearch} />

                    <CheckBoxIcon className={styles.ButtonContainer} />
                    {/* <IndeterminateCheckBoxIcon
                      className={styles.ButtonContainer}
                    /> */}
                    <FileCopyIcon className={styles.ButtonContainer} />
                    <ModeEditSharpIcon className={styles.ButtonContainer} />
                    <DeleteSharpIcon
                      color="success"
                      className={styles.ButtonContainer}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Fluxo Vem Ser 9 edição</TableCell>

                  <TableCell className={styles.ContainerButton}>
                    <SearchIcon className={styles.ButtonSearch} />

                    <CheckBoxIcon className={styles.ButtonContainer} />
                    {/* <IndeterminateCheckBoxIcon
                      className={styles.ButtonContainer}
                    /> */}
                    <FileCopyIcon className={styles.ButtonContainer} />
                    <ModeEditSharpIcon className={styles.ButtonContainer} />
                    <DeleteSharpIcon
                      color="success"
                      className={styles.ButtonContainer}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Fluxo Vem Ser 9 edição</TableCell>

                  <TableCell className={styles.ContainerButton}>
                    <SearchIcon className={styles.ButtonSearch} />

                    <CheckBoxIcon className={styles.ButtonContainer} />
                    {/* <IndeterminateCheckBoxIcon
                      className={styles.ButtonContainer}
                    /> */}
                    <FileCopyIcon className={styles.ButtonContainer} />
                    <ModeEditSharpIcon className={styles.ButtonContainer} />
                    <DeleteSharpIcon
                      color="success"
                      className={styles.ButtonContainer}
                    />
                  </TableCell>
                </TableRow>

                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  )
}
