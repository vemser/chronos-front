import React, { useContext } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Box } from '@mui/material'
import './Calendario.css'

import { CalendarioContext } from '../../context/CalendarioContext'
import { Header } from '../Header/Header'
import { useLocation } from 'react-router-dom'
import { ICalendarioEdicao, ICalendarioProcesso } from '../../utils/interfaces'

export const Calendario = () => {
  const { calendarioEdicao } = useContext(CalendarioContext)

  const { state } = useLocation()

  const gerarCalendario = () => {

    // DIA UTIL
    const etapaFilter: ICalendarioEdicao[] = calendarioEdicao?.filter(dia => {
      return dia.etapa !== null
    })

    // ETAPA
    const etapaMap: any = etapaFilter?.map((dia: ICalendarioEdicao) => {
      return {
        date: dia.dia,
        title: dia.processo,
        backgroundColor: dia.cor,
        display: 'background',
        classNames: ['etapa']
      }
    })

    // PROCESSO
    const processoFilter: ICalendarioEdicao[] = calendarioEdicao?.filter(dia => {
      return dia.processo !== null
    })
    const processoMap: ICalendarioProcesso[] = processoFilter?.map((dia: ICalendarioEdicao) => {
      return { date: dia.dia, title: dia.processo }
    })

    // AREAS
    const areasMap: any = processoFilter?.map((dia: ICalendarioEdicao) => {
      return {
        date: dia.dia,
        title: dia.areas,
        classNames: ['areas'],
        textColor: '#000000'
      }
    })

    // FERIADOS
    const feriadosFilter: ICalendarioEdicao[] = calendarioEdicao?.filter(dia => {
      return dia.processo === null && dia.feriado !== null
    })
    const feriadosMap: any = feriadosFilter?.map((dia: ICalendarioEdicao) => {
      return {
        date: dia.dia,
        display: 'background',
        backgroundColor: '#e5e7eb',
        title: dia.feriado,
        classNames: ['feriado']
      }
    })

    // FINAIS DE SEMANA
    const fdsFilter: ICalendarioEdicao[] = calendarioEdicao?.filter(dia => {
      return dia.processo === null && dia.feriado === null
    })
    const fdsMap: any = fdsFilter?.map((dia: ICalendarioEdicao) => {
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

  const inicio = calendarioEdicao[0].dia.split('-').reverse().join('/')

  const diasUteis: ICalendarioEdicao[] = calendarioEdicao?.filter(dia => {
    return dia.etapa !== null
  })

  const arrayCorEtapa: any = diasUteis?.map((dia: ICalendarioEdicao) => {
    return { etapa: dia.etapa, cor: dia.cor }
  })

  const etapaCorUnica: any = new Set()

  const unique = arrayCorEtapa?.filter((element: ICalendarioEdicao) => {
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

      <Box
        className="containerData"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <h4>
            {' '}
            {state.nome} - de {inicio} até {encerramento}{' '}
          </h4>
        </Box>

        <Box>
          <h4>Previsão de encerramento: {encerramento} </h4>
        </Box>
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
      <Box className="legendaSection">
        <div className="containerTitulo">
          <h2>Legenda de etapas:</h2>
        </div>
        <div className="legenda">
          {unique &&
            unique.map((etapa: ICalendarioEdicao) => {
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
    </>
  )
}
