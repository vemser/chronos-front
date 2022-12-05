import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import { Box } from '@mui/material'
import './CalendarioGeral.css'

import { CalendarioContext } from '../../context/CalendarioContext'

export const CalendarioGeral = () => {
    

  const { calendarioGeral  } = useContext(CalendarioContext)
  const [ calendario, setCalendario ] = useState<any>([])
  const [etapaLegendas, setEtapaLegendas] = useState<any>([])
  const colors:string[] = ['#ef4444', '#3b82f6', '#84cc16', '#8b5cf6']

  console.log(calendarioGeral);
  

  useEffect(() => {
    gerarCalendario()
  }, [])

  const gerarCalendario = () => {

    // DIAS UTEIS
    const diasUteis: any = calendarioGeral.filter((dia) => {
      return dia.etapa !== null
    })
    
    // FERIADOS
    const feriadosFilter: any = calendarioGeral.filter((dia) => {
      return dia.processo === null && dia.feriado !== null
    })
    const feriadosMap: any = feriadosFilter.map((dia: any) => {
      return { date: dia.dia, display: 'background', backgroundColor:'#cecece', title: dia.feriado, classNames: ['feriado'] } 
    })

    // FINAIS DE SEMANA
    const fdsFilter: any = calendarioGeral.filter((dia) => {
      return dia.processo === null && dia.feriado === null
    })
    const fdsMap: any = feriadosFilter.map((dia: any) => {
      return { date: dia.dia, display: 'background', backgroundColor:'#cecece', title: dia.feriado, classNames: ['feriado'] } 
    })


    // EDICAO
    const etapaProcesso = diasUteis.map((dia: any) => {
      return{ date: dia.dia, title: dia.processo, backgroundColor: dia.cor}
    })
    const etapaEdicao = diasUteis.map((dia: any) => {
      return{ date: dia.dia, title: dia.edicao, backgroundColor: dia.cor}
    })



      return etapaEdicao.concat(etapaProcesso,fdsMap , feriadosMap)
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

      <Box>
        <div className='legenda'>

            <h1>Etapas</h1>
            {etapaLegendas && etapaLegendas.map((data: any, index: number) =>{


                return <div className={'legendaContainer'}>
                    <div className={`legendaColor a${index+1}`}></div>
                    <p>{data}</p>
                </div>
            })}
        </div>

      </Box>
    </>
  )
}