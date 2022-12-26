import React, { useContext, useEffect } from 'react'
import { TableCell, TableContainer, Table, TableBody, TableRow, TableHead, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { DiaNaoUtilContext } from '../../../context/DiaNaoUtilContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { TOptionsConfirmDialog } from '../../../utils/interfaces';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

export const GestaoDiaNaoUtilTable = () => {

    const { diasNaoUteis, getDiaNaoUtil, deleteDiaNaoUtil } = useContext(DiaNaoUtilContext)
    const navigate = useNavigate();

    useEffect(() => {
        getDiaNaoUtil('1')
    }, [])

    const [confirmDialog, setConfirmDialog] = React.useState<TOptionsConfirmDialog>({
      isOpen: false,
      title: "",
      onConfirm: () => { }
    });

  return (
    <TableContainer sx={{ boxShadow: 1, width: 'auto', borderRadius: '5px', maxWidth: 1366, margin: '50px auto' }}>
            <Table sx={{ minWidth: 650, maxWidth: 1366}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="justify" width={'20px'}>Código</TableCell>
                  <TableCell align="justify">Descrição</TableCell>
                  <TableCell align="justify">Período Inicial</TableCell>
                  <TableCell align="justify">Período Final</TableCell>
                  <TableCell align="justify">Repetir</TableCell>
                  <TableCell align="right">Editar</TableCell>
                  <TableCell align="right">Excluir</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {diasNaoUteis?.map((dia, index) => {

                  if(dia.repeticaoAnual === 'ATIVO') {
                      var status = true
                  } else {
                    var status = false
                  }

                  const dataIniciaFormatada = dia.dataInicial.split("-").reverse().join("/")
                  const dataFinalFormatada = dia.dataFinal?.split("-").reverse().join("/")
                  



                  return(
                  <TableRow
                    key={dia.idDiaNaoUtil}
                    id={`linha-nao-util-${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="justify" width={'300px'}>
                      {dia.idDiaNaoUtil}
                    </TableCell>

                    <TableCell component="th" scope="row" align="justify" width={'300px'}>
                      {dia.descricao}
                    </TableCell>

                    <TableCell align="justify" width={'300px'}>
                      {dataIniciaFormatada}
                    </TableCell>

                    <TableCell align="justify" width={'300px'}>
                      {dataFinalFormatada}
                    </TableCell>

                    <TableCell align="justify" width={'600px'}>
                      <Checkbox checked={status} />
                    </TableCell>

                    <TableCell align="right" >
                      <EditIcon id={`linha-nao-util-editar-${index}`} onClick={() => {navigate(`/gestao/editar-dias-nao-uteis/${dia.idDiaNaoUtil}`, { state: dia })}} sx={{cursor: 'pointer', transition:'100ms all ease-in-out', '&:hover':{color: '#1e62fe'}}}/>
                    </TableCell>

                    <TableCell align="right" >
                    <HighlightOffIcon onClick={(event) => {
                          setConfirmDialog({
                            isOpen: true,
                            title: `Confirma a exclusão de ${dia.descricao}?`,
                            onConfirm: () => {
                              setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false
                              })
                              deleteDiaNaoUtil(dia.idDiaNaoUtil)
                            }
                          });
                        }} sx={{
                          cursor: 'pointer',
                          width: '25px',
                          height: '25px',
                          "&:hover": { color: 'red', transform: 'scale(1.05)' },
                          "&:active": {
                            transform: 'scale(.99)',
                          }
                        }} />
                    </TableCell>

                  </TableRow>
                  )
                })}
              </TableBody>
              <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
              />
            </Table>
          </TableContainer>
  )
}
