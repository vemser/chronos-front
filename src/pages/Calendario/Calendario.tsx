import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from '@mui/material'
import './Calendario.css'

export const Calendario = () => {

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
          ]}
        />
      </Box>
    </>
  )
}