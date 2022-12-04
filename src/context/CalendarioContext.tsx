import nProgress from 'nprogress'
import React, { createContext, useState } from 'react'
import { api } from '../utils/api'
import { ICalendarioContext, ICalendarioEdicao, IChildren } from '../utils/interfaces'


export const CalendarioContext = createContext ({} as ICalendarioContext)

export const CalendarioProvider = ({ children }: IChildren) => {

    const [ calendarioEdicao, setCalendarioEdicao ] = useState<ICalendarioEdicao[]>([]);


    const getCalendarioPorEdicao = async (idEdicao: number) => {
        try{
            nProgress.start();

            const { data } = await api.get(`/edicao/calendario/${idEdicao}`);

            setCalendarioEdicao(data)

        } catch(error) {
            console.error(error);

        } finally {
            nProgress.done();

        }
    }


  return (
    <CalendarioContext.Provider value={{ calendarioEdicao, getCalendarioPorEdicao }}>
        {children}
    </CalendarioContext.Provider>
  )
}