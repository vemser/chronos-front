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
import SearchIcon from '@mui/icons-material/Search';
import styles from './GestaoEdicoes.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { UserContext } from '../../../context/UserContex'
import { PaginacaoEdicoes } from '../../../components/Paginacao/PaginacaoEdicoes/PaginacaoEdicoes';
import { Header } from '../../../components/Header/Header';

export const GestaoEdicoes: React.FC = () => {

  const { edicoes, getEdicoesList, ativoInativo, deleteEdicao, cloneEdicao } = useContext(UserContext);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getEdicoesList('1')
  }, [])

  return (
    <>
      <Header/>

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>
          
          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Edições do Vem Ser</h2>
            </div>

            <Link to={'/gestao/cadastrar-edicao'}>
              <Button variant="contained" id='addButton'> ADICIONAR EDIÇÃO</Button>
            </Link>
          </Box>

          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650,  }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="justify">Edições</TableCell>
                  <TableCell align="center">Detalhes</TableCell>
                  <TableCell align="right">Ativo</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Clonar</TableCell>
                  <TableCell align="right">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {edicoes?.map((edicao, index) => {

                  if(edicao.status === 'ATIVO') {
                      var status = true
                  } else {
                    var status = false
                  }

                  return(
                  <TableRow
                    key={edicao.idEdicao}
                    className={`linha-edicao-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                  >
                    <TableCell component="th" scope="row" align="justify">
                      {edicao.nome}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center" width={'120px'}>
                      <SearchIcon  className={`edicao-verificar-${index}`} onClick={() => {navigate(`/gestao/verificar-edicao/${edicao.idEdicao}`, { state: edicao })}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
 
                    <TableCell align="right" width={'40px'}>
                      <Switch  className={`edicao-status-${index}`} onClick={() => ativoInativo(edicao)} checked={status} />
                    </TableCell>

                    <TableCell align="right" width={'40px'}>
                      <EditIcon  className={`edicao-editar-${index}`} onClick={() => {navigate(`/gestao/editar-edicao/${edicao.idEdicao}`, { state: edicao })}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>


                    <TableCell align="right" width={'40px'}>
                      <ContentCopyIcon  className={`edicao-clonar-${index}`} onClick={() => cloneEdicao(edicao)} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>
                    
                    <TableCell align="right" width={'40px'}>
                      <HighlightOffIcon className={`edicao-deletar-${index}`} onClick={() => {deleteEdicao(edicao.idEdicao, edicao.nome)}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>

                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <PaginacaoEdicoes/>
        </div>
      </section>
    </>
  )
}
