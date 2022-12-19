import React, { useContext, useEffect, useLayoutEffect } from 'react'

import { IAdminContext } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import { Header } from '../../../components/Header/Header'
import { ConteudoAdmin } from '../../../components/ConteudoAdmin/ConteudoAdmin'
import { AuthContext } from '../../../context/AuthContext'

export const AdminHome: React.FC = () => {
  const { buscarDadosColaborador } =
    useContext<IAdminContext>(AdminContext)

    const { loggedUser } = useContext<any>(AuthContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      {/* <ConteudoAdmin /> */}
      <CalendarioGeral />
    </>
  )
}
