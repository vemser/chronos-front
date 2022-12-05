import nProgress from 'nprogress'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import { ICalendarioContext, ICalendarioEdicao, ICalendarioGeral, IChildren, IEdicao, toastConfig } from '../utils/interfaces'


export const CalendarioContext = createContext ({} as ICalendarioContext)

export const CalendarioProvider = ({ children }: IChildren) => {
    
    const navigate = useNavigate()

    const [ calendarioEdicao, setCalendarioEdicao ] = useState<ICalendarioEdicao[]>([]);
    const [ calendarioGeral, setcalendarioGeral ] = useState<ICalendarioGeral[]>([]);



    const getCalendarioPorEdicao = async (edicao: IEdicao | undefined) => {
        try{
            nProgress.start();

            const { data } = await api.get(`/edicao/calendario-edicao/${edicao?.idEdicao}`);    

            setCalendarioEdicao(data)

            navigate(`/calendario/${edicao?.idEdicao}`, {state: edicao})

        } catch(error) {
            console.error(error);

        } finally {
            nProgress.done();

        }
    }


    const getCalendarioGeral = async () => {
        try{
            nProgress.start();

            const { data } = await api.get(`/edicao/calendario-geral/`);    

            setcalendarioGeral(data)

        } catch(error) {
            console.error(error);
            toast.error('Houve um erro ao gerar o calendário, por favor tente novamente', toastConfig)

        } finally {
            nProgress.done();

        }
    }


  return (
    <CalendarioContext.Provider value={{ calendarioEdicao, getCalendarioPorEdicao, getCalendarioGeral, calendarioGeral }}>
        {children}
    </CalendarioContext.Provider>
  )
}