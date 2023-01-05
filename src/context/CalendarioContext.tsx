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
    const [loading, setLoading] = useState<boolean>(false)

    const getCalendarioPorEdicao = async (edicao: IEdicao | undefined) => {
        try{
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/edicao/calendario-edicao/${edicao?.idEdicao}`);    

            setCalendarioEdicao(data)

            navigate(`/calendario/${edicao?.idEdicao}`, {state: edicao})

        } catch(error) {
            console.error(error);

        } finally {
            nProgress.done();
            setLoading(false)
        }
    }

    const getCalendarioGeral = async () => {
        try{
            nProgress.start();
            setLoading(true);

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
            setLoading(false);

        }
    }

    const getExcelCalendario = async (idEdicao: number) => {
        try {
            nProgress.start();
            setLoading(true);

            api.get(`/edicao/calendario/export/excel/${idEdicao}`, {
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${Date.now()}.xlsx`);
                document.body.appendChild(link);
                link.click();
            });

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
            setLoading(false);
        }
        
    }


  return (
    <CalendarioContext.Provider value={{ calendarioEdicao, getCalendarioPorEdicao, getCalendarioGeral, calendarioGeral, getExcelCalendario, loading }}>
        {children}
    </CalendarioContext.Provider>
  )
}