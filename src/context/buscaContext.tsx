import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import { IAdminContext, IBuscaContext, IChildren } from "../utils/interfaces";
import { AdminContext } from "./AdminContext";

export const BuscarContext = createContext({} as IBuscaContext)

export const BuscarProvider = ({ children }: IChildren) => {

    const [totalPages, setTotalPages] = useState(0)
    const { dadosColaborador, setDadosColaborador } = useContext<IAdminContext>(AdminContext)

    const token = localStorage.getItem('token');

    const buscarColaborador = async (data: any) => {
        console.log(data)
        try {
            nProgress.start();

            api.defaults.headers.common['Authorization'] = token
            const { data } = await api.get(`/usuario?pagina=${Number(1) - 1}&tamanho=8`)

            setTotalPages(data.quantidadePaginas)
            setDadosColaborador(data.elementos)

        } catch (error) {
            console.log(error)
            toast.error('Houve um erro ao exibir as informações, por favor tente novamente.')

        } finally {
            nProgress.done()
        }
    }

    return (
        <BuscarContext.Provider value={{ buscarColaborador }}>
            {children}
        </BuscarContext.Provider>
    )
}