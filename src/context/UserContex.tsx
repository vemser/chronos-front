import nProgress from 'nprogress';
import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../utils/api';
import { IChildren, IEdicao, IEtapa, IProcesso, IUserContext, toastConfig } from '../utils/interfaces'


export const UserContext = createContext({} as IUserContext);   



export const UserProvider = ({ children }: IChildren) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [ edicoes, setEdicoes ] = useState<IEdicao[]>([]);
    const [ etapas, setEtapas ] = useState<IEtapa[]>([])


    const [totalPages, setTotalPages] = useState(0);

    const getEdicoesList = async (page: string) => {

        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/edicao?pagina=0&tamanho=20`);

            setTotalPages(data.totalPages)
            setEdicoes(data.elementos)

        } catch (error) {
            console.error(error);

        } finally {
            nProgress.done();
        }
    }

    const deleteEdicao = async (idEdicao: number) => {

        try {
            nProgress.start()
            api.defaults.headers.common['Authorization'] = token;
            await api.delete(`/edicao/${idEdicao}`);
            toast.success('Edicao Removida com sucesso!')


            getEdicoesList('1')

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao remover Edicao!')
            
        } finally {
            nProgress.done()

        }
    }


    const createEdicao = async (edicao: IEdicao) => {

        try {
            api.defaults.headers.common['Authorization'] = token;

            await api.post('/edicao', edicao);
            
            navigate('/gestao/edicoes')
            
        } catch (error) {
            console.error(error);

        }
    }


    const editEdicao = async (edicao: IEdicao) => {
        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            await api.put(`/edicao/${edicao.idEdicao}`, edicao)
            toast.success('Edicao editada com sucesso!', toastConfig)

            navigate('/gestao/edicoes')
            
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao editar a edição.', toastConfig)
            
        } finally {
            nProgress.done();

        }
    }

    // ATIVO INATIVO EDICAO

    const ativoInativo = async (idEdicao: number) => {

         try {
            api.defaults.headers.common['Authorization'] = token
            await api.put(`edicao/enable-disable/${idEdicao}`)

        } catch (error) {
            console.log(error)

        } 
    }


    // ETAPA


    const getEtapas = async (idEdicao: number) => {
        try {
            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/etapa/listar-etapas`)
  
            setEtapas(data.elementos)

            navigate(`/gestao/verificar-edicao/${idEdicao}`)
            
        } catch (error) {
            console.error(error);

        }
    }

    const deleteEtapa = async (idEtapa: number, idEdicao: number) => {
        try {
            api.defaults.headers.common['Authorization'] = token;
            await api.delete(`/etapa/${idEtapa}`)

            navigate(`/gestao/verificar-edicao/${idEdicao}`)
            
        } catch (error) {
            console.error(error);

        }
    }

    const createEtapa = async (etapa: IEtapa, idEdicao: number) => {
        try {
            api.defaults.headers.common['Authorization'] = token;
            await api.post(`/etapa/${idEdicao}`, etapa);

            navigate(`/gestao/edicoes`)
            
            
        } catch (error) {
            console.error(error);

        }
    }

    const editEtapa = async (etapa: IEtapa, idEdicao: number) => {
        try {
            api.defaults.headers.common['Authorization'] = token;
            await api.put(`/etapa/${etapa.idEtapa}`, etapa)

            navigate(`/gestao/verificar-edicao/${idEdicao}`)
            
        } catch (error) {
            console.error(error);
            
        }
    }

    // PROCESSO


    // const getProcessos = async (idEdicao: number, idEtapa: number) => {
    //     try {
    //         api.defaults.headers.common['Authorization'] = token;
    //         await api.get(`/processo`)

            
    //     } catch (error) {
    //         console.error(error);

    //     }
    // }



    // const deleteProcesso = async (idProcesso: number) => {
    //     try {
    //         api.defaults.headers.common['Authorization'] = token;
    //         await api.delete(`/processo/${idProcesso}`)
            
    //     } catch (error) {
    //         console.error(error);

    //     }
    // }

    // const createProcesso = async (processo: IProcesso) => {
    //     try {
    //         api.defaults.headers.common['Authorization'] = token;
    //         await api.post(`/processo/${processo.idEdicao}/${processo.idEtapa}`, processo);

    //         navigate(`/gestao/verificar-edicao/${processo.idEdicao}`)
            
    //     } catch (error) {
    //         console.error(error);

    //     }
    // }

    // const editProcesso = async (processo: IProcesso) => {
    //     try {
    //         api.defaults.headers.common['Authorization'] = token;
    //         await api.put(`/processo/${processo.idProcesso}`, processo)

    //         navigate(`/gestao/verificar-edicao/${processo.idEdicao}`)
            
    //     } catch (error) {
    //         console.error(error);
            
    //     }
    // }

  return (
    <UserContext.Provider value={{ edicoes, etapas, totalPages, getEdicoesList, deleteEdicao, createEdicao, editEdicao, getEtapas, deleteEtapa, createEtapa, editEtapa, ativoInativo }}>
        { children }
    </UserContext.Provider>
  )
}
