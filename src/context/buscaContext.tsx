import axios from "axios";
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

    const buscarColaborador = async (pesquisa: any, buscarCargos: any) => {
            
        let cargosList = buscarCargos.map((el: any)=> el == ''? `` : `&nomes=${el}`).join('')

        try {
            nProgress.start();
            authApi.defaults.headers.common['Authorization'] = token;
            const { data } = await authApi.get(`/usuario/filtro-login-cargo?pagina=${0}&tamanho=${10}&login=${pesquisa.login}${cargosList}`)
            setTotalPages(data.quantidadePaginas)
            setDadosColaborador(data.elementos)

        } catch (error) {
            console.log(error)
            // if (axios.isAxiosError(error) && error.response && error.response.data) {
            //     if (error.response.data.message) {
            //         toast.error(error.response.data.message);
            //     } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            //         toast.error(error.response.data.errors.join("\n"));
            //     }
            // } else {
            //     toast.error('Houve um erro ao exibir as informações, tente novamente mais tarde.');
            // }
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