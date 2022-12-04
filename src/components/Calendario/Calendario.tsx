import React, { useContext, useEffect, useLayoutEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from '@mui/material'
import './Calendario.css'
import { useParams } from 'react-router-dom'
import { CalendarioContext } from '../../context/CalendarioContext'

export const Calendario = () => {

  const { getCalendarioPorEdicao, calendarioEdicao } = useContext(CalendarioContext)

  const {edicao} = useParams()

  useLayoutEffect(() => {
    getCalendarioPorEdicao(Number(edicao))
    
  }, [])

  console.log(calendarioEdicao)

  
  return (
    <>
      <Box className="CalendarContainer">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          locale={'pt-br'}
          initialView="dayGridMonth"
          weekends={true}
  


          events={[
            { title: 'Processo 1', date: '2022-11-01' },
            { title: 'Processo 1', date: '2022-11-02' },
            { title: 'Processo 1', date: '2022-11-03' },
            { title: 'Processo 1', date: '2022-11-04' },
            { title: 'Processo 2', date: '2022-11-07' },
            { title: 'Processo 3', date: '2022-11-16' },
            { title: 'Processo 4', date: '2022-11-16', overlap: false,  rendering:'background', color:'##eadc22'},
          ]}
        />
      </Box>
    </>
  )
}