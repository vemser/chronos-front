import React, { useContext, useEffect } from 'react'
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Box,
  Button,
  TableHead,
  Switch,
} from '@mui/material'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import styles from './GestaoEdicoes.module.css'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { UserContext } from '../../../context/UserContex'

export const GestaoEdicoes: React.FC = () => {

  const { edicoes, getEdicoesList } = useContext(UserContext);

  useEffect(() => {
    getEdicoesList('1')
  }, [])


  


  return (
    <>
      <GestaoHeader />


    

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>
          <Box className={styles.ContainerNova}>
            <Link to={'/gestao/cadastrar-edicao'}>
              <Button variant="contained"> + NOVA</Button>
            </Link>
          </Box>

          <div className={styles.ContainerTitle}>
            <h2>Edições do Vem Ser</h2>
          </div>
          <div className={styles.ContainerHead}>
            <h4>Edições</h4>
            <h4>Ações</h4>
          </div>
          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Edições</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">Ativo</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {edicoes?.map((edicao) => (
                  <TableRow
                    key={edicao.idEdicao}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {edicao.nome}
                    </TableCell>

                    
                    <TableCell component="th" scope="row">
                      
                    </TableCell>
                  
                    <TableCell align="right">
                      <Switch defaultChecked={false} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  )
}
