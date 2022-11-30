import { Box } from '@mui/material'
import React, { useState} from 'react'
import { CalendarioHeader } from '../../components/Calendario/Header/CalendarioHeader'
import { Meses } from '../../components/Calendario/Meses/Meses'
import { Sidebar } from '../../components/Calendario/Sidebar/Sidebar'
import { getMonth } from '../../utils/calendar'

export const Calendario = () => {
    
    const [ mesAtual , setMesAtual ] = useState(getMonth())

    console.table(getMonth())

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection:'column'}}>
        
        <CalendarioHeader />

        <Box sx={{ display: 'flex'}}>
            <Sidebar />
            <Meses month={mesAtual}/>
        </Box>
      </Box>
    </>
  )
}
