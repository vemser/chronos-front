import nProgress from 'nprogress'
import React, { createContext } from 'react'
import { api } from '../utils/api'
import { ICalendarioContext, IChildren } from '../utils/interfaces'


export const CalendarioContext = createContext ({} as ICalendarioContext)

export const CalendarioProvider = ({ children }: IChildren) => {

    const getCalendarioPorEdicao = async (idEdicao: number) => {
        try{
            nProgress.start();

            const { data } = await api.get(`/edicao/calendario/${idEdicao}`)

        } catch(error) {
            console.error(error);

        } finally {
            nProgress.done()

        }
    }


  return (
    <CalendarioContext.Provider value={{ }}>
        {children}
    </CalendarioContext.Provider>
  )
}