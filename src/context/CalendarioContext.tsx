import axios, { AxiosError } from 'axios'
import nProgress from 'nprogress'
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import { ICalendarioContext, ICalendarioEdicao, ICalendarioGeral, IChildren, IEdicao, toastConfig } from '../utils/interfaces'


export const CalendarioContext = createContext ({} as ICalendarioContext)

export const CalendarioProvider = ({ children }: IChildren) => {
    
    const navigate = useNavigate()
    const token = localStorage.getItem('token');

    const [ calendarioEdicao, setCalendarioEdicao ] = useState<ICalendarioEdicao[]>([]);
    const [ calendarioGeral, setcalendarioGeral ] = useState<ICalendarioGeral[]>([]);

    const getCalendarioPorEdicao = async (edicao: IEdicao | undefined) => {
        try{
            nProgress.start();

            api.defaults.headers.common['Authorization'] = token;
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

            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/edicao/calendario-geral`);    

            setcalendarioGeral(data)

        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
              if (error.response.data.message) {
                  toast.error(error.response.data.message);
              } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
                  toast.error(error.response.data.errors.join("\n"));
              }
              } else {
                  toast.error('Houve um erro no servidor, por favor tente novamente mais tarde.');
              }

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