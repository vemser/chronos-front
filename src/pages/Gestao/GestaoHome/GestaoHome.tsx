import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Header } from '../../../components/Header/Header'
import { CalendarioGeral } from '../../../components/CalendarioGeral/CalendarioGeral'
import { CalendarioContext } from '../../../context/CalendarioContext'



export const GestaoHome = () => {


  const { getCalendarioGeral  } = useContext(CalendarioContext)

  
  useEffect(() => {
    getCalendarioGeral()
  }, [])

  const { loggedUser} = useContext<any>(AuthContext)

 

  return (
    <>
      <Header />
      <CalendarioGeral />   
    </>
  )
}
