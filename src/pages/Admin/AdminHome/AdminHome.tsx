import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { Header } from '../../../components/Header/Header'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'
import { CalendarioContext } from '../../../context/CalendarioContext'

export const AdminHome: React.FC = () => {
  const { dadosColaborador, buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  return (
    <>
      <Header />
    
    </>
  )
}
