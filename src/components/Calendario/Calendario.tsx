import React, { useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from '@mui/material'
import './Calendario.css'

import { CalendarioContext } from '../../context/CalendarioContext'
import { title } from 'process'
import { ClassNames } from '@emotion/react'
import { Header } from '../Header/Header'
import { useLocation, useParams } from 'react-router-dom'

export const Calendario = () => {
  const { calendarioEdicao } = useContext(CalendarioContext)

  const { state } = useLocation();
    
  const gerarCalendario = () => {
    // DIA UTIL
    const etapaFilter: any = calendarioEdicao?.filter(dia => {
      return dia.etapa !== null
    })

    // ETAPA
    const etapaMap: any = etapaFilter?.map((dia: any) => {
      return {
        date: dia.dia,
        title: dia.processo,
        backgroundColor: dia.cor,
        display: 'background',
        classNames: ['etapa']
      }
    })

    // PROCESSO
    const processoFilter: any = calendarioEdicao?.filter(dia => {
      return dia.processo !== null
    })
    const processoMap: any = processoFilter?.map((dia: any) => {
      return { date: dia.dia, title: dia.processo }
    })

    // AREAS
    const areasMap: any = processoFilter?.map((dia: any) => {
      return { date: dia.dia, title: dia.areas, classNames: ['areas'], textColor:"#000000" }
    })

    // FERIADOS
    const feriadosFilter: any = calendarioEdicao?.filter(dia => {
      return dia.processo === null && dia.feriado !== null
    })
    const feriadosMap: any = feriadosFilter?.map((dia: any) => {
      return {
        date: dia.dia,
        display: 'background',
        backgroundColor: '#e5e7eb',
        title: dia.feriado,
        classNames: ['feriado']
      }
    })

    // FINAIS DE SEMANA
    const fdsFilter: any = calendarioEdicao?.filter(dia => {
      return dia.processo === null && dia.feriado === null
    })
    const fdsMap: any = fdsFilter?.map((dia: any) => {
      return {
        date: dia.dia,
        display: 'background',
        backgroundColor: '#e5e7eb',
        classNames: ['feriado']
      }
    })

    return etapaMap.concat(areasMap, feriadosMap, fdsMap)
  }

  const encerramento = calendarioEdicao[calendarioEdicao?.length - 1].dia
  .split('-')
  .reverse()
  .join('/')


  const diasUteis: any = calendarioEdicao?.filter(dia => {
    return dia.etapa !== null
  })

  const arrayCorEtapa: any = diasUteis?.map((dia: any) => {
    return { etapa: dia.etapa, cor: dia.cor }
  })

  const etapaCorUnica: any = new Set()

  const unique = arrayCorEtapa?.filter((element: any) => {
    const isDuplicate = etapaCorUnica?.has(element.etapa)

    etapaCorUnica.add(element.etapa)

    if (!isDuplicate) {
      return true
    }

    return false
  })

  return (
    <>
      <Header />

      <Box className="calendario">
        
        <Box>
          {state.nome}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '40px auto',
            maxWidth: '1200px'
          }}
        >
          <h2>Previsão de encerramento: {encerramento} </h2>
        </Box>
         <Box className="legendaSection">
          <div className="legenda">
            <h1>Etapas</h1>
            {unique &&
              unique.map((etapa: any) => {
                return (
                  <div>
                    <div className="legendaLinha">
                      <div
                        style={{ backgroundColor: `${etapa.cor} ` }}
                        className="cardCor"
                      ></div>
                      <p>{etapa.etapa}</p>
                    </div>
                  </div>
                )
              })}
          </div>
        </Box>
        <Box className="CalendarContainer" mt={'50px'}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            locale={'pt-br'}
            initialView="dayGridMonth"
            weekends={true}
            events={gerarCalendario()}
          />
        </Box>
      </Box>
    </>
  )
}
