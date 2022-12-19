import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box } from '@mui/material'
import './CalendarioGeral.css'

import { CalendarioContext } from '../../context/CalendarioContext'


export const CalendarioGeral: React.FC = () => {


  const { calendarioGeral, getCalendarioGeral } = useContext(CalendarioContext)
  const [etapaLegendas, setEtapaLegendas] = useState<any>([])

  useEffect(() => {
    getCalendarioGeral();
    gerarCalendario();

  }, [])


  console.log(calendarioGeral)

  // DIAS UTEIS
  const diasUteis: any = calendarioGeral.filter((dia: any) => {
    return dia.etapa !== null
  })

  // FERIADOS
  const feriadosFilter: any = calendarioGeral.filter((dia: any) => {
    return dia.processo === null && dia.feriado !== null
  })
  
  // FINAIS DE SEMANA
  const fdsFilter: any = calendarioGeral.filter((dia: any) => {
    return dia.processo === null && dia.feriado === null
  })

  

  const gerarCalendario = () => {
  diasUteis.map((dia: any) => {
      return { 
        date: dia.dia,
        title: dia.edicao, 
        backgroundColor: dia.cor, 
        extendedProps: {
          processo: dia.processo
      }}
    })

    // const feriadosMap: any = feriadosFilter.map((dia: any) => {
    //   return { date: dia.dia, display: 'background', backgroundColor: '#cecece', title: dia.feriado, classNames: ['feriado'] }
    // })

    // const fdsMap: any = feriadosFilter.map((dia: any) => {
    //   return { date: dia.dia, display: 'background', backgroundColor: '#cecece', title: dia.feriado, classNames: ['feriado'] }
    // })

    // EDICAO
 }

 console.log(diasUteis)

  const aaaa = diasUteis.map((day: any) => {
    return {
      date: day.dia,
      title: day.edicao,
      backgroundColor: day.cor,
      extendedProps: {
        processo: day.processo
      },
      classNames: ['date-event'],
      url:`gestao/verificar-edicao/${day.idEdicao}`
    }
  })
  
  function renderEventContent(eventInfo: any) {
    return (
      <div className='evento'>
        <strong>{eventInfo.event.title}</strong>
        <strong>{eventInfo.event.extendedProps.processo}</strong>
        
      </div>
    )
  }
  
  return (
    <>
      <Box className="CalendarContainer" sx={{
        margin: '50px 0'
      }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale={'pt-br'}
          initialView="dayGridMonth"
          weekends={true}
          events={aaaa}
          selectable={true}
          eventContent={renderEventContent}
      
        />
      </Box>

      <Box>
        <div className='legenda'>
          {etapaLegendas && etapaLegendas.map((data: any, index: number) => {
            return <div className={'legendaContainer'}>
              <div className={`legendaColor a${index + 1}`}></div>
              <p>{data}</p>
            </div>
          })}
        </div>
      </Box>
    </>
  )
}