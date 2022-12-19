import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box } from '@mui/material'
import './CalendarioGeral.css'

import { CalendarioContext } from '../../context/CalendarioContext'

export const CalendarioGeral: React.FC = () => {


  const { calendarioGeral, getCalendarioGeral } = useContext(CalendarioContext)
  const [calendario, setCalendario] = useState<any>([])
  const [etapaLegendas, setEtapaLegendas] = useState<any>([])
  const colors: string[] = ['#ef4444', '#3b82f6', '#84cc16', '#8b5cf6']

  // console.log(calendarioGeral);


  useEffect(() => {
    gerarCalendario();

    getCalendarioGeral()
  }, [])

  const gerarCalendario = () => {

    // DIAS UTEIS
    const diasUteis: any = calendarioGeral.filter((dia: any) => {
      return dia.etapa !== null
    })

    // FERIADOS
    const feriadosFilter: any = calendarioGeral.filter((dia: any) => {
      return dia.processo === null && dia.feriado !== null
    })
    const feriadosMap: any = feriadosFilter.map((dia: any) => {
      return { date: dia.dia, display: 'background', backgroundColor: '#cecece', title: dia.feriado, classNames: ['feriado'] }
    })

    // FINAIS DE SEMANA
    const fdsFilter: any = calendarioGeral.filter((dia: any) => {
      return dia.processo === null && dia.feriado === null
    })
    const fdsMap: any = feriadosFilter.map((dia: any) => {
      return { date: dia.dia, display: 'background', backgroundColor: '#cecece', title: dia.feriado, classNames: ['feriado'] }
    })


    // EDICAO
    const etapaProcesso = diasUteis.map((dia: any) => {
      return { date: dia.dia, title: dia.processo, backgroundColor: dia.cor}
    })
    const etapaEdicao = diasUteis.map((dia: any) => {
      return { date: dia.dia, title: dia.edicao, backgroundColor: dia.cor }
    })
    // console.log(etapaEdicao.concat(etapaProcesso, fdsMap, feriadosMap))
    return etapaEdicao.concat(etapaProcesso, fdsMap, feriadosMap)
  }

  const dia = [
    {
      date: "2022-11-28",
      title: "Vem Ser 11",
      backgroundColor: "#eab308",      
    },
    {
      date: "2022-11-28",
      title: "Vem Ser 12 - Período de Divulgação e Inscrições",
      backgroundColor: "#ef4444",
      classNames: ["teste"],      
    },
    {
      date: "2022-11-28",
      title: "Vem Ser 13",
      backgroundColor: "#3b82f6",
      eventRender: function(title:any) {
        let selector = title.el.querySelector('.fc-event-title-container');
        if (selector) { 
          selector.innerHTML = '<br><span class="texto">Subtitle</span>';
        }
      }
    },
  ]

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
          events={dia}
          selectable={true}
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