import React, { useContext, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, modalClasses } from '@mui/material'
import './CalendarioGeral.css'
import { CalendarioContext } from '../../context/CalendarioContext'
import { ICalendarioEdicao } from '../../utils/interfaces'
import { Link } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import listPlugin from '@fullcalendar/list'; 
import { Loader } from '../Loader/Loader'
import { SemCalendario } from '../SemCalendario/SemCalendario'


export const CalendarioGeral: React.FC = () => {

  const { calendarioGeral, getCalendarioGeral, loading } = useContext(CalendarioContext)
  const [etapaLegendas, setEtapaLegendas] = useState<any>([])
  const [ modalInfos, setModalInfos ] = useState<any>()

  useEffect(() => {
    getCalendarioGeral();
    gerarCalendario();
  }, [])


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

  const arrayDiasUteis = diasUteis.map((day: any) => {
    return {
      date: day.dia,
      title: day.edicao,
      backgroundColor: day.cor,
      extendedProps: {
        processo: day.processo,
        dia: day.dia.split('-')
        .reverse()
        .join('/'),
        etapa: day.etapa,
        critico: day.critico,
        cor: day.cor,

        idEdicao: day.idEdicao,
        idEtapa: day.idEtapa,
        idProcesso: day.idProcesso
      },
      classNames: ['date-event', day.critico],
    }
  })

  const arrayFeriados = feriadosFilter.map((day: any) => {
    return{
      date: day.dia,
      display: 'background',
      backgroundColor: '#e5e7eb',
      extendedProps:{
        feriado: day.feriado,
        cor: '#cccccc',
        dia: day.dia.split('-')
        .reverse()
        .join('/'),
      }
    }
  })

  const arrayFds = fdsFilter.map((day: any) => {
    return{
      date: day.dia,
      display: 'background',
      backgroundColor: '#e5e7eb',
      extendedProps:{
        feriado: day.feriado,
        cor: '#cccccc',
        dia: day.dia.split('-')
        .reverse()
        .join('/'),
      }
    }
  })
  
  const concatArray = arrayDiasUteis.concat(arrayFeriados, arrayFds)
  
  function renderEventContent(eventInfo: any) {
    return (
      <div className='evento'>
        <strong>{eventInfo.event.extendedProps.feriado}</strong>
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

  const handleModal = (info: any) => {
    
    setModalInfos(info.event)

    console.log(info.event);
    

    document.getElementById('modal-id')?.classList.toggle('hide')
    document.getElementById('CalendarContainer')?.classList.toggle('blur')
    document.getElementById('legenda')?.classList.toggle('blur')
    
  }

  return (
    <>
      {loading == true ? <Loader /> : calendarioGeral && calendarioGeral.length == 0 ? <SemCalendario /> :  

      <Box>
        <Box id='CalendarContainer' className="CalendarContainer" sx={{
          margin: '50px 0'
        }}>
          <FullCalendar
            plugins={[ dayGridPlugin, listPlugin ]}
            locale={'pt-br'}
            initialView="dayGridMonth"
            weekends={true}
            events={concatArray}
            selectable={true}
            editable={true}
            eventContent={renderEventContent}
            navLinks={true}
            headerToolbar={{
              left: 'completo,dayGridMonth,dayGridWeek,dayGridDay',
              center: 'title',
              right: 'prev,next today',
            }}
            views={{
              completo: {
                type: 'list',
                duration: { days: 120 },
                buttonText: 'Completo'
              }
            }}
            buttonText={{
              today: 'Hoje',
              month: "Mês",
              week: "Semana",
              day: 'Dia'
            }}
            eventClick={
              function(info) {
                handleModal(info)
              }
            }
        
          />
        </Box>

        <Box id='legenda' className="legendaSection">
          <div className="containerTitulo">
            <h2>Legenda de etapas:</h2>
          </div>
          <div className="legenda">
            {unique &&
              unique.map((etapa: ICalendarioEdicao) => {
                return (
                  <div key={etapa.etapa}>
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

        <div onBlur={() => {document.getElementById('modal-id')?.classList.add('hide')}} 
            style={{border:`2px solid ${modalInfos?.extendedProps.cor}`}} id='modal-id' className='event-modal hide'>

            <div onClick={handleModal} className='close-modal'>
              <HighlightOffIcon 
              sx={{
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                color: 'red',
                "&:hover": { transform: 'scale(1.05)' },
                "&:active": {
                  transform: 'scale(.99)',
                }
              }}
              />
            </div>

            <div className='modal-date'>
              <h3>{modalInfos?.extendedProps.dia}</h3>
            </div>

            <div className='modal-header'>
              <Link to={`/gestao/verificar-edicao/${modalInfos?.extendedProps.idEdicao}`} title={'Verificar Edição'}>
                
                <h3>{modalInfos?.title}</h3>
              </Link>
            </div>

            <div className='modal-etapa'>
              {modalInfos?.extendedProps.feriado && <h3>{modalInfos?.extendedProps.feriado}</h3>} 
              <h3>{modalInfos?.extendedProps.etapa}</h3>
              <div style={{backgroundColor: modalInfos?.extendedProps.cor }} className='color-tag'></div>
            </div>

            {modalInfos?.extendedProps.processo && 
              <div className='modal-processo-container'>
              <div className='modal-divisor' style={{backgroundColor: modalInfos?.extendedProps.cor }}></div>
              <span>Detalhes do Processo:</span>
              <div className='modal-processo'>
                <h3>{modalInfos?.extendedProps.processo}</h3> 
                {modalInfos?.extendedProps.critico == 'ATIVO' ? <div className='modal-critico'><p>!</p></div> : ''}
              </div>
            </div>
            }

            

            <div>
            </div>
        </div>
      </Box>
      }
    </>
  )
}