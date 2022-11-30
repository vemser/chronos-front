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
import { Link, useNavigate } from 'react-router-dom'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext';
import styles from './GestaoDiaNaoUtil.module.css'


export const GestaoDiaNaoUtil = () => {

  const { diasNaoUteis, getDiaNaoUtil, deleteDiaNaoUtil, putDiaNaoUtil } = useContext(DiaNaoUtilContext)
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getDiaNaoUtil()
  }, [])

  return (
    <>
      <GestaoHeader />

      <section className={styles.ContainerGeral}>
        <div className={styles.ContainerGestaoEdicoes}>

          
          <Box className={styles.ContainerNova}>
            <div className={styles.ContainerTitle}>
              <h2>Períodos Não Úteis</h2>
            </div>

            <Link to={'/gestao/cadastrar-dias-nao-uteis'}>
              <Button variant="contained"> ADICIONAR PERÍODO NÃO ÚTIL</Button>
            </Link>
          </Box>

          

          <TableContainer sx={{ boxShadow: 1, width: 'auto', mt: 2, borderRadius: '5px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="justify">Código</TableCell>
                  <TableCell align="justify">Descrição</TableCell>
                  <TableCell align="justify">Período Inicial</TableCell>
                  <TableCell align="justify">Período Final</TableCell>
                  <TableCell align="right">Repetir</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {diasNaoUteis?.map((dia) => {

                  // if(dia.status === 'ATIVO') {
                  //     var status = true
                  // } else {
                  //   var status = false
                  // }

                  return(
                  <TableRow
                    key={dia.idDiaNaoUtil}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="justify">
                      {dia.idDiaNaoUtil}
                    </TableCell>

                    <TableCell component="th" scope="row" align="justify">
                      {dia.descricao}
                    </TableCell>

                    <TableCell align="justify" >
                      {dia.dataInicial}
                    </TableCell>

                    <TableCell align="justify">
                      {dia.dataFinal}
                    </TableCell>

                    <TableCell align="right" width={'40px'}>
                      <Switch />
                    </TableCell>

                    <TableCell align="right" width={'40px'}>
                      <EditIcon onClick={() => {navigate(`/gestao/editar-dias-nao-uteis/${dia.idDiaNaoUtil}`, { state: dia })}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>

                    <TableCell align="right" width={'40px'}>
                      <HighlightOffIcon onClick={() => deleteDiaNaoUtil(dia.idDiaNaoUtil)} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
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
