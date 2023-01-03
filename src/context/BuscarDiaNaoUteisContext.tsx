import axios from "axios";
import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { authApi, api } from "../utils/api";
import { IDiaNaoUtilContext, IChildren, IBuscaDiasContext } from "../utils/interfaces";
import { DiaNaoUtilContext } from "./DiaNaoUtilContext";

export const BuscarDiaNaoUteisContext = createContext({} as IBuscaDiasContext)

export const BuscarDiaNaoUteisProvider = ({ children }: IChildren) => {    

    const { setTotalPages, setDiasNaoUteis } = useContext<IDiaNaoUtilContext>(DiaNaoUtilContext)
    
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [searchPayload, setSearchPayload] = useState<any>({})

    const token = localStorage.getItem('token');

    const buscarDiasNaoUteis = async (pesquisa: any, page: any) => {       
            
        // let cargosList = buscarCargos.map((el: any)=> el == ''? `` : `&nomes=${el}`).join('')

        let descricao = pesquisa.descricao
        let dataInicial = pesquisa.dataInicial;
        let dataFinal = pesquisa.dataFinal;
        console.log()
        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/dia-nao-util/filtro-dia-nao-util?pagina=${Number(page) - 1}&tamanho=${10}&descricao=${pesquisa.descricao}`)
            setTotalPages(data.quantidadePaginas)
            setDiasNaoUteis(data.elementos)
            console.log(data)

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
        <BuscarDiaNaoUteisContext.Provider value={{ buscarDiasNaoUteis, isSearch, setIsSearch, searchPayload, setSearchPayload }}>
            {children}
        </BuscarDiaNaoUteisContext.Provider>
    )
}