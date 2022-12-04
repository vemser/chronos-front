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
    const etapaFilter: any = calendarioGeral.filter((dia) => {
        return dia.etapa !== null
    })
    const arrayEtapaString = etapaFilter.map((etapa: any) => {
        return etapa.etapa
    })
    
    // CRIA UM ARRAY DE ETAPAS PARA DEFINIR AS CORES DE CADA ETAPA
    const arrayEtapaUnico = [...new Set(arrayEtapaString)];

    console.log(arrayEtapaUnico)
    
    // ETAPAS
    const etapaMap: any = etapaFilter.map((dia: any) => {
      let counter = 0
      if(arrayEtapaUnico[counter] !== dia.etapa) {
        counter++
      }

      console.log(counter);
      
      return { 
        date: dia.dia,
        backgroundColor: colors[counter],
      }
    })

    const edicaoMap: any = etapaFilter.map((dia: any) => {
        let counter = 0
        if(arrayEtapaUnico[counter] !== dia.etapa) {
          counter++
        }
  
        console.log(counter);
        
        return { 
          date: dia.dia,
      
        }
      })
   
      const concatedArray = etapaMap.concat(edicaoMap)

    setCalendario(concatedArray)
  }


  return (
    <>
      <Box className="CalendarContainer">
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          locale={'pt-br'}
          initialView="dayGridMonth"
          weekends={true}

          events={calendario}
          
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