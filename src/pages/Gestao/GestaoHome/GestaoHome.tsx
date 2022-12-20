import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Header } from '../../../components/Header/Header'
import { ConteudoGestao } from '../../../components/ConteudoGestao/ConteudoGestao'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'

export const GestaoHome = () => {
  const { loggedUser } = useContext<any>(AuthContext)

  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      {/* <ConteudoGestao /> */}
      <CalendarioGeral />
    </>
  )
}
