import nProgress from "nprogress";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import { IChildren, IDiaNaoUtil, IDiaNaoUtilContext, toastConfig } from "../utils/interfaces";

export const DiaNaoUtilContext = createContext({} as IDiaNaoUtilContext);

export const DiaNaoUtilProvider = ({ children }: IChildren) => {

    const [diasNaoUteis, setDiasNaoUteis] = useState<IDiaNaoUtil[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState<any>(1)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const getDiaNaoUtil = async (page: string) => {
        try {
            api.defaults.headers.common['Authorization'] = token;
            nProgress.start();
            const { data } = await api.get(`/dia-nao-util?pagina=${Number(page) - 1}&tamanho=8`)
            setTotalPages(data.quantidadePaginas)
            setDiasNaoUteis(data.elementos)

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast.error(error.response.data.errors[0], toastConfig)
            } else {
                toast.error('Houve um erro no Dia Não Útil!', toastConfig)
            }
        } finally {
            nProgress.done();
        }
    }

    const postDiaNaoUtil = async (data: IDiaNaoUtil) => {
        try {
            nProgress.start()

            if (data.repeticaoAnual === true) {
                data.repeticaoAnual = 'ATIVO'
            } else {
                data.repeticaoAnual = 'INATIVO'
            }

            await api.post('/dia-nao-util', data)
            toast.success('Dia Não Útil cadastrado com sucesso!', toastConfig)
            navigate('/gestao/dias-nao-uteis')
            setCurrentPage(1)

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast.error(error.response.data.errors[0], toastConfig)
            } else {
                toast.error('Data final não informada', toastConfig)
            }
        } finally {
            nProgress.done()

        }
    }

    const deleteDiaNaoUtil = async (idDiaNaoUtil: number) => {
        try {
            nProgress.start()
            await api.delete(`/dia-nao-util/${idDiaNaoUtil}`)
            toast.success('Dia Não Útil removido com sucesso!', toastConfig)
            getDiaNaoUtil('1')
            setCurrentPage(1)

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast.error(error.response.data.errors[0], toastConfig)
            } else {
                toast.error('Houve um erro ao remover um Dia Não Útil!', toastConfig)
            }
        } finally {
            nProgress.done()

        }
    }

    const putDiaNaoUtil = async (data: IDiaNaoUtil) => {
        try {

            if (data.repeticaoAnual === true) {
                data.repeticaoAnual = 'ATIVO'
            } else {
                data.repeticaoAnual = 'INATIVO'
            }

            nProgress.start()
            await api.put(`/dia-nao-util/${data.idDiaNaoUtil}`, data)
            toast.success('Dia Não Útil atualizado com sucesso!', toastConfig)

            navigate('/gestao/dias-nao-uteis')
            setCurrentPage(1)

        } catch (error: any) {
            console.log(error)
            if (error.response.status === 400) {
                toast.error(error.response.data.errors[0], toastConfig)
            } else {
                toast.error('Houve um erro ao atualizado um Dia Não Útil!', toastConfig)
            }
        } finally {
            nProgress.done();

        }
    }

    return (
        <DiaNaoUtilContext.Provider value={{ totalPages, diasNaoUteis, getDiaNaoUtil, postDiaNaoUtil, deleteDiaNaoUtil, putDiaNaoUtil, currentPage, setCurrentPage, setDiasNaoUteis, setTotalPages }}>
            {children}
        </DiaNaoUtilContext.Provider>
    )
}
