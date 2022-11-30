import React, { useContext, useLayoutEffect } from 'react'
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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import styles from './GestaoEdicoes.module.css'
import { Link } from 'react-router-dom'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { UserContext } from '../../../context/UserContex'

export const GestaoEdicoes: React.FC = () => {

  const { edicoes, getEdicoesList, ativoInativo, deleteEdicao } = useContext(UserContext);


  useLayoutEffect(() => {
    getEdicoesList('1')
  }, [])

  return (
    <>
      <GestaoHeader />

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>

          
          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Edições do Vem Ser</h2>
            </div>

            <Link to={'/gestao/cadastrar-edicao'}>
              <Button variant="contained"> ADICIONAR EDIÇÃO</Button>
            </Link>
          </Box>

          

          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Edições</TableCell>
                  <TableCell align="right">Ativo</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Clonar</TableCell>
                  <TableCell align="right">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {edicoes?.map((edicao) => {

                  if(edicao.status === 'ATIVO') {
                      var status = true
                  } else {
                    var status = false
                  }

                  return(
                  <TableRow
                    key={edicao.idEdicao}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="justify">
                      {edicao.nome}
                    </TableCell>
 
                    <TableCell align="right" width={'40px'}>
                      <Switch onClick={() => ativoInativo(edicao.idEdicao)} defaultChecked={status}/>
                    </TableCell>

                    <TableCell align="right" width={'40px'}>
                      <EditIcon sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>


                    <TableCell align="right" width={'40px'}>
                      <ContentCopyIcon sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
                    
                    <TableCell align="right" width={'40px'}>
                      <HighlightOffIcon onClick={() => {deleteEdicao(edicao.idEdicao)}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>

                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
    </>
  )
}
