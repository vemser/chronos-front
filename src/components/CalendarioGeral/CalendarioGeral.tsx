import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box } from '@mui/material'
import './CalendarioGeral.css'

import { CalendarioContext } from '../../context/CalendarioContext'
import { ICalendarioEdicao } from '../../utils/interfaces'

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
        }
      }
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

  const arrayDiasUteis = diasUteis.map((day: any) => {
    return {
      date: day.dia,
      title: day.edicao,
      backgroundColor: day.cor,
      extendedProps: {
        processo: day.processo
      },
      classNames: ['date-event'],
      //url:`/gestao/verificar-edicao/${day.idEdicao}`
    }
  })

  const arrayFeriados = feriadosFilter.map((day: any) => {
    return{
      date: day.dia,
      title: day.feriado,
      display: 'background',
      backgroundColor: '#e5e7eb',
    }
  })

  const arrayFds = fdsFilter.map((day: any) => {
    return{
      date: day.dia,
      display: 'background',
      backgroundColor: '#e5e7eb'
    }
  })
  
  const concatArray = arrayDiasUteis.concat(arrayFeriados, arrayFds)
  
  function renderEventContent(eventInfo: any) {
    return (
      <div className='evento'>
        <strong>{eventInfo.event.title}</strong>
        <strong>{eventInfo.event.extendedProps.processo}</strong>
      </div>
    )
  }

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
      <Box className="CalendarContainer" sx={{
        margin: '50px 0'
      }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          locale={'pt-br'}
          initialView="dayGridWeek"
          weekends={true}
          events={concatArray}
          selectable={true}
          eventContent={renderEventContent}
          navLinks={true}
          headerToolbar={{
            left: 'dayGridMonth,dayGridWeek,dayGridDay',
            center: 'title',
            right: 'prev,next today',
          }}
          buttonText={{
            today: 'Hoje',
            month: "Mês",
            week: "Semana",
            day: 'Dia'
          }}
      
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