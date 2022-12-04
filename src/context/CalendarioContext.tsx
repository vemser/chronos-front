import nProgress from 'nprogress'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { ICalendarioContext, ICalendarioEdicao, IChildren } from '../utils/interfaces'


export const CalendarioContext = createContext ({} as ICalendarioContext)

export const CalendarioProvider = ({ children }: IChildren) => {
    
    const navigate = useNavigate()

    const [ calendarioEdicao, setCalendarioEdicao ] = useState<ICalendarioEdicao[]>([]);


    const getCalendarioPorEdicao = async (idEdicao: number) => {
        try{
            nProgress.start();

            const { data } = await api.get(`/edicao/calendario-edicao/${idEdicao}`);    

            setCalendarioEdicao(data)

            navigate(`/calendario/${idEdicao}`)

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