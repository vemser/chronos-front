import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { authApi } from "../utils/api";
import { IAdminContext, IBuscaContext, IChildren } from "../utils/interfaces";
import { AdminContext } from "./AdminContext";

export const BuscarContext = createContext({} as IBuscaContext)

export const BuscarProvider = ({ children }: IChildren) => {

    const { setTotalPages, setDadosColaborador } = useContext<IAdminContext>(AdminContext)    
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [searchPayload, setSearchPayload] = useState<any>({})
    const token = localStorage.getItem('token');

    const buscarColaborador = async (pesquisa: any, buscarCargos: any, page: any) => {       
            
        let cargosList = buscarCargos.map((el: any)=> el == ''? `` : `&nomes=${el}`).join('')

        try {
            nProgress.start();
            authApi.defaults.headers.common['Authorization'] = token;
            const { data } = await authApi.get(`/usuario/filtro-login-cargo?pagina=${Number(page) - 1}&tamanho=${10}&login=${pesquisa.login}${cargosList}`)
            setTotalPages(data.quantidadePaginas)
            setDadosColaborador(data.elementos)

        } catch (error) {
            toast.error('Houve um erro ao exibir as informações, por favor tente novamente.')

        } finally {
            nProgress.done()
        }
    }

    return (
        <BuscarContext.Provider value={{ buscarColaborador, isSearch, setIsSearch, searchPayload, setSearchPayload }}>
            {children}
        </BuscarContext.Provider>
    )
}