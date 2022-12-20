import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'

import { Header } from '../../../components/Header/Header'
import { ConteudoInstrutor } from '../../../components/ConteudoInstrutor/ConteudoInstrutor'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'

export const InstHome = () => {
  const { loggedUser } = useContext<any>(AuthContext)

  useEffect(() => {
    loggedUser()
  }, [])

  return (
    <>
      <Header />
      {/* <ConteudoInstrutor /> */}
      <CalendarioGeral />
    </>
  )
}
