import * as React from 'react'
import {
  TableCell,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  Checkbox,
  Button,
  Box
} from '@mui/material'
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import { Link } from 'react-router-dom'
import styles from  './GestaoNaoUteis.module.css'


export const GestaoNaoUteis = () => {
  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'} flexDirection={'column'} textAlign={'justify'} gap={'30px'} mt={'60px'}>
        <Box width={'70%'} >
        <TableContainer
      sx={{ boxShadow: 2, width: 'auto', mt: 2, borderRadius: '5px' }}
      >
        <Box display={'flex'} justifyContent={'space-between'} p={'20px'} boxShadow={2}>
            <h1 className={styles.titulo}>Períodos Não Úteis</h1>


            <Link to={'/gestao/cadastrar-dias-nao-uteis'}>
              <Button variant="contained" sx={{ backgroundColor: '#1e62fe', fontWeight:'500'}}>Adicionar</Button>
            </Link>
          </Box>
      <Table>
        <TableHead sx={{ borderRadius: '8px' }}>
          <TableRow >
            <TableCell sx={{ color: '#1e62fe' }}>Código</TableCell>
            <TableCell sx={{ color: '#1e62fe' }}>Descrição</TableCell>
            <TableCell sx={{ color: '#1e62fe' }}>Período Inicial</TableCell>
            <TableCell sx={{ color: '#1e62fe' }}>Período Final</TableCell>
            <TableCell sx={{ color: '#1e62fe' }}>Repetir</TableCell>
            <TableCell sx={{ color: '#1e62fe' }}>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* {rows.map(row => ( */}

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Natal</TableCell>
            <TableCell>25/12/1900</TableCell>
            <TableCell> </TableCell>
            <TableCell> 
                <Checkbox defaultChecked />
            </TableCell>
            <TableCell>
              <ModeEditSharpIcon
                sx={{ mr: 1, cursor: 'pointer' }}
               
              />
              <DeleteSharpIcon
                sx={{ cursor: 'pointer' }}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Natal</TableCell>
            <TableCell>25/12/1900</TableCell>
            <TableCell> </TableCell>
            <TableCell> 
                <Checkbox defaultChecked />
            </TableCell>
            <TableCell>
              <ModeEditSharpIcon
                sx={{ mr: 1, cursor: 'pointer' }}
               
              />
              <DeleteSharpIcon
                sx={{ cursor: 'pointer' }}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Natal</TableCell>
            <TableCell>25/12/1900</TableCell>
            <TableCell> </TableCell>
            <TableCell> 
                <Checkbox defaultChecked />
            </TableCell>
            <TableCell>
              <ModeEditSharpIcon
                sx={{ mr: 1, cursor: 'pointer' }}
               
              />
              <DeleteSharpIcon
                sx={{ cursor: 'pointer' }}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Natal</TableCell>
            <TableCell>25/12/1900</TableCell>
            <TableCell> </TableCell>
            <TableCell> 
                <Checkbox defaultChecked />
            </TableCell>
            <TableCell>
              <ModeEditSharpIcon
                sx={{ mr: 1, cursor: 'pointer' }}
               
              />
              <DeleteSharpIcon
                sx={{ cursor: 'pointer' }}
              />
            </TableCell>
          </TableRow>
    
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
  )
}

