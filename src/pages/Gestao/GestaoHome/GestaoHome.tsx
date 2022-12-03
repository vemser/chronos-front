import React, { useContext, useEffect } from 'react'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { AdminContext } from '../../../context/AdminContext'
import { AuthContext } from '../../../context/AuthContext'
import { IAdminContext } from '../../../utils/interfaces'
import { GestaoNovoProcesso } from '../GestaoNovoProcesso/GestaoNovoProcesso'
import styles from './GestaoHome.module.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Header } from '../../../components/Header/Header'



export const GestaoHome = () => {
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)
  const { dadosUsuarioLogado, loggedUser, handleLogout } =
    useContext<any>(AuthContext)
  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        locale={'pt-br'}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: 'Processo 1', date: '2022-11-01' },
          { title: 'Processo 1', date: '2022-11-02' },
          { title: 'Processo 1', date: '2022-11-03' },
          { title: 'Processo 1', date: '2022-11-04' },
          { title: 'Processo 2', date: '2022-11-07' },
          { title: 'Processo 3', date: '2022-11-16' },
        ]}
    />
    </>
  )
}
