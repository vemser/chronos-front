import React, { useContext, useState, useLayoutEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box, dialogActionsClasses } from '@mui/material'
import './Calendario.css'
import { useParams } from 'react-router-dom'
import { CalendarioContext } from '../../context/CalendarioContext'
import { title } from 'process'
import { ClassNames } from '@emotion/react'

export const Calendario = () => {

  const { calendarioEdicao } = useContext(CalendarioContext)

  const[ concatedArray, setConcatedArray ] = useState()

  const gerarCalendario = () => {
  
  
    
    let proc;
    let etap

    let etapaClasseAtual = 1

    // ETAPAS
    const etapaFilter: any = calendarioEdicao.filter((dia) => {
      return dia.etapa !== null
    })

    const arrayEtapaString = etapaFilter.map((etapa: any) => {
      return etapa.etapa
    })
    
    const arrayEtapaUnico = [...new Set(arrayEtapaString)];




    const etapaMap: any = etapaFilter.map((dia: any) => {
      
      let classesCounter = 0

      if(arrayEtapaUnico[classesCounter] !== dia.etapa) {
        classesCounter++
      }
      
      return { date: dia.dia, display: 'background', classNames:[`a${classesCounter}`]} 
    })

    console.log(calendarioEdicao);
    
  
    // PROCESSO 
    const processoFilter: any = calendarioEdicao.filter((dia) => {
      return dia.processo !== null
    })
    const processoMap: any = processoFilter.map((dia: any) => {
      return { date: dia.dia, title: dia.processo } 
    })

    // FERIADOS
    const feriadosFilter: any = calendarioEdicao.filter((dia) => {
      return dia.processo === null && dia.feriado !== null
    })
    const feriadosMap: any = feriadosFilter.map((dia: any) => {
      return { date: dia.dia, display: 'background', backgroundColor:'#cecece', title: dia.feriado, classNames: ['feriado'] } 
    })


    return etapaMap.concat(processoMap, feriadosMap)
  }


  return (
    <>
      <Box className="CalendarContainer">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          locale={'pt-br'}
          initialView="dayGridMonth"
          weekends={true}

          events={gerarCalendario()}
        />
      </Box>
    </>
  )
}