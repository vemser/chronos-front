import React, { useContext } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from '@mui/material'
import './CalendarioTeste.css'

import { CalendarioContext } from '../../context/CalendarioContext'
import { title } from 'process'
import { ClassNames } from '@emotion/react'
import { Header } from '../Header/Header'

export const CalendarioTeste = () => {

  const { calendarioEdicao } = useContext(CalendarioContext)

  console.log(calendarioEdicao);
  

  const gerarCalendario = () => {


    // DIA UTIL
    const diaUtil: any = calendarioEdicao.filter((dia) => {
      return dia.etapa !== null
    })    

    const arrayDeEtapasUnicas: any = [...new Set(diaUtil)];

    


    // ETAPA
    const etapaMap: any = diaUtil.map((dia: any) => {
      let counter = 0
      let arrayEtapas = []
      
      if(arrayDeEtapasUnicas[counter] == dia.etapa){
        arrayEtapas.push({ date: dia.dia, title: dia.etapa, ClassNames:`a${counter}`, display: 'background'})
      } else {
        counter++
        arrayEtapas.push({ date: dia.dia, title: dia.etapa, ClassNames:`a${counter}`, display: 'background'})
      }

      return arrayEtapas
    })
  

    // PROCESSO 
    const processoFilter: any = calendarioEdicao.filter((dia) => {
      return dia.processo !== null
    })
    const processoMap: any = processoFilter.map((dia: any) => {
      return { date: dia.dia, title: dia.processo, background: dia.cor} 
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
    <Header/>
    <Box>
      <Box className="CalendarContainer" mt={'50px'}>
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          locale={'pt-br'}
          initialView="dayGridMonth"
          weekends={true}

          events={gerarCalendario()}
        />
      </Box>

      <Box className='legendaSection'>
        <div className='legenda'>
          <h1>Etapas</h1>

        </div>
        </Box>
    </Box>
      
    </>
  )
}