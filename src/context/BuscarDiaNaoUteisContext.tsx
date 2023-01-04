import nProgress from "nprogress";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../utils/api";
import { IDiaNaoUtilContext, IChildren, IBuscaDiasContext } from "../utils/interfaces";
import { DiaNaoUtilContext } from "./DiaNaoUtilContext";

export const BuscarDiaNaoUteisContext = createContext({} as IBuscaDiasContext)

export const BuscarDiaNaoUteisProvider = ({ children }: IChildren) => {

    const { setTotalPages, setDiasNaoUteis } = useContext<IDiaNaoUtilContext>(DiaNaoUtilContext)
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [searchPayload, setSearchPayload] = useState<any>({})
    const token = localStorage.getItem('token');

    const buscarDiasNaoUteis = async (pesquisa: any, page: any) => {

        let descricao = pesquisa.descricao == '' ? '' : `&descricao=${pesquisa.descricao}`;
        let dataInicial = pesquisa.dataInicial == '' ? '' : `&dataInicial=${pesquisa.dataInicial}`;
        let dataFinal = pesquisa.dataFinal == '' ? '' : `&dataFinal=${pesquisa.dataFinal}`;

        let datas;

        if (dataFinal == '') {
            datas = dataInicial
        } else if (dataInicial == '') {
            datas = dataFinal
        } else {
            datas = dataInicial + dataFinal
        }

        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/dia-nao-util/filtro-dia-nao-util?pagina=${Number(page) - 1}&tamanho=${10}${descricao}${datas}`)
            setTotalPages(data.quantidadePaginas)
            setDiasNaoUteis(data.elementos)
        } catch (error) {
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