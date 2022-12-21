import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { authApi } from "../utils/api";
import { IAdminContext, IBuscaContext, IChildren } from "../utils/interfaces";
import { AdminContext } from "./AdminContext";

export const BuscarContext = createContext({} as IBuscaContext)

export const BuscarProvider = ({ children }: IChildren) => {

    const { setTotalPages } = useContext<IAdminContext>(AdminContext)
    const { setDadosColaborador } = useContext<IAdminContext>(AdminContext)

    const token = localStorage.getItem('token');

    const buscarColaborador = async (pesquisa: any) => {
        try {
            nProgress.start();
            authApi.defaults.headers.common['Authorization'] = token
            const { data } = await authApi.get(`/usuario/filtrarLoginCargo?pagina=${0}&tamanho=${10}&login=${pesquisa.login}&nomeCargo=${pesquisa.cargo}`)
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