import nProgress from 'nprogress'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import { IAreasEnvolvidas, IChildren, IEdicao, IEtapa, IProcesso, IResponsaveis, IUserContext, toastConfig } from '../utils/interfaces'

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IChildren) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // STATES

    const [edicoes, setEdicoes] = useState<IEdicao[]>([]);
    const [etapas, setEtapas] = useState<IEtapa[]>([]);
    const [areasEnvolvidas, setAreasEnvolvidas] = useState<IAreasEnvolvidas[]>([]);
    const [responsaveis, setResponsaveis] = useState<IResponsaveis[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState<any>(1)
    const [loading, setLoading] = useState<boolean>(false)

    const getEdicoesList = async (page: string) => {
        try {
            nProgress.start();
            setLoading(true);

            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/edicao/listar?pagina=${Number(page) - 1}&tamanho=8 `);
            setTotalPages(data.quantidadePaginas);
            setEdicoes(data.elementos);

        } catch (error) {
            console.error(error);

        } finally {
            nProgress.done();
            setLoading(false);

        };
    };
    

    const deleteEdicao = async (idEdicao: number, nomeEdicao: string) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.delete(`/edicao/${idEdicao}`);
            toast.success(`Edição ${nomeEdicao} foi removida com sucesso`);
            getEdicoesList('1');
            setCurrentPage(1)
        } catch (error) {
            console.error(error);
            toast.error(`Houve um erro ao remover Edicao ${nomeEdicao}!`);
        } finally {
            nProgress.done();
            setLoading(false)
        };
    };

    const createEdicao = async (edicao: IEdicao) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.post('/edicao', edicao);
            toast.success('Edição criada com sucesso!');
            navigate('/gestao/edicoes');
            setCurrentPage(1)
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao criar uma nova edição, por favor, tente novamente');
        } finally {
            nProgress.done();
            setLoading(false)

        };
    };

    const editEdicao = async (edicao: IEdicao) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.put(`/edicao/${edicao.idEdicao}`, edicao);
            toast.success('Edicao editada com sucesso!', toastConfig);
            navigate('/gestao/edicoes');
            setCurrentPage(1)
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao editar a edição.', toastConfig);
        } finally {
            nProgress.done();
            setLoading(false)

        };
    };

    const cloneEdicao = async (edicao: IEdicao) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.post(`/edicao/clone/${edicao.idEdicao}`);
            toast.success(`Clone da edicao ${edicao.nome} criado com sucesso!`, toastConfig);
            getEdicoesList('1');
            setCurrentPage(1)
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao editar a edição.', toastConfig);
        } finally {
            nProgress.done();
            setLoading(false)

        };
    };

    // ATIVO INATIVO EDICAO

    const ativoInativo = async (data: IEdicao) => {
        try {
            nProgress.start();

            api.defaults.headers.common['Authorization'] = token;
            await api.put(`edicao/enable-disable/${data.idEdicao}`);
            if (data.status === 'ATIVO') {
                data.status = 'Inativo';
            } else {
                data.status = 'Ativo';
            };
            toast.success(`Status da edição ${data.nome} alterado para ${data.status}`);
            getEdicoesList('1');

        } catch (error) {
            console.log(error);
            toast.error(`Houve um erro ao alterar o status da edição ${data.nome}, por favor, tente novamente`);
        } finally {
            nProgress.done();
        };
    };

    // ETAPA

    const getEtapas = async (idEdicao: number) => {
        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            const { data } = await api.get(`/etapa/${idEdicao}`);
            setEtapas(data);
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao enviar as etapas, por favor tente novamente.');
        } finally {
            nProgress.done();
        };
    };

    const deleteEtapa = async (idEtapa: number, idEdicao: number) => {
        try {
            nProgress.start();
            setLoading(true)
            
            api.defaults.headers.common['Authorization'] = token;
            await api.delete(`/etapa/${idEtapa}`);
            toast.success(`Etapa foi excluída com sucesso`, toastConfig);
            getEtapas(idEdicao);

        } catch (error) {
            console.error(error);
            toast.error(`Houve um erro ao remover a etapa, por favor tente novamente.`);
        } finally {
            nProgress.done();
            setLoading(false)
            
        };
    };

    const createEtapa = async (etapa: IEtapa, idEdicao: number) => {
        try {
            nProgress.start();
            setLoading(true)

            etapa.ordemExecucao = Number(etapa.ordemExecucao);
            api.defaults.headers.common['Authorization'] = token;
            await api.post(`/etapa/${idEdicao}`, etapa);
            toast.success(`Nova etapa ${etapa.nome} cadastrada com sucesso!`);
            navigate(`/gestao/verificar-edicao/${idEdicao}`);
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro ao cadastrar uma nova etapa, por favor tente novamente.');
        } finally {
            nProgress.done();
            setLoading(false)

        };
    };

    const editEtapa = async (etapa: IEtapa, idEdicao: number) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.put(`/etapa/${etapa.idEtapa}`, etapa);
            toast.success(`Etapa ${etapa.nome} editada com sucesso!`);
            navigate(`/gestao/verificar-edicao/${idEdicao}`);
        } catch (error) {
            console.error(error);
            toast.error(`Houve um erro ao editar a etapa ${etapa.nome}`);
        } finally {
            nProgress.done();
            setLoading(false)
        };
    };

    // PROCESSO

    const getProcessos = async (idEtapa: number) => {

        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;
            await api.get(`/processo/${idEtapa}`);
        } catch (error) {
            console.error(error);
            toast.error('Houve um erro, por favor tente novamente.');
        } finally {
            nProgress.done();
        };
    };

    const deleteProcesso = async (idProcesso: number, idEdicao: number) => {
        try {
            nProgress.start();
            setLoading(true)

            api.defaults.headers.common['Authorization'] = token;
            await api.delete(`/processo/${idProcesso}`);
            toast.success(`Processo removido com sucesso!`);
            getEtapas(idEdicao);
        } catch (error) {
            console.error(error);
            toast.error(`Houve um erro ao remover um processo`);
        } finally {
            nProgress.done();
            setLoading(false)

        };
    };

    const createProcesso = async (processo: IProcesso, area: string[], responsaveis: string[], idEtapa: number, idEdicao: number) => {
    try {
        nProgress.start();
        setLoading(true);

        api.defaults.headers.common[`Authorization`] = token;

        if(processo.processoCritico === true) {
            processo.processoCritico = 'ATIVO'
        } else {
            processo.processoCritico = 'INATIVO'
        }

        processo.areasEnvolvidas = area
        processo.responsaveis = responsaveis
        processo.diasUteis = Number(processo.diasUteis)
        processo.ordemExecucao = Number(processo.ordemExecucao)

        await api.post(`/processo/${idEtapa}`, processo);

        toast.success('Processo cadastrado com sucesso!', toastConfig)
        
        navigate(`/gestao/verificar-edicao/${idEdicao}`);

    } catch (error) {
        console.error(error);
        toast.error('Houve um erro ao cadastrar um novo processo, por favor tente novamente.');

    } finally {
        nProgress.done();
        setLoading(false);

    };
  };

    const editProcesso = async (processo: IProcesso, area: string[], responsaveis: string[], idEdicao: number) => {
        try {
            nProgress.start();
            api.defaults.headers.common['Authorization'] = token;

            if (area.length < 1 && responsaveis.length < 1) {
                toast.error('Por favor informe pelo menos um responsável e uma área envolvida')
            } else if (responsaveis.length < 1) {
                toast.error('Por favor informe pelo menos um responsável')
            } else if (area.length < 1) {
                toast.error('Por favor informe pelo menos uma área envolvida')
            } else {

                if (processo.processoCritico === true) {
                    processo.processoCritico = 'ATIVO'
                } else {
                    processo.processoCritico = 'INATIVO'
                }

                processo.areasEnvolvidas = area
                processo.responsaveis = responsaveis
                processo.diasUteis = Number(processo.diasUteis)
                processo.ordemExecucao = Number(processo.ordemExecucao)

                await api.put(`/processo/${processo.idProcesso}`, processo);
                toast.success('Processo editado com sucesso!', toastConfig)
                navigate(`/gestao/verificar-edicao/${idEdicao}`);
            }

        } catch (error) {
            console.log(error);
            toast.error(`Houve um erro ao editar o processo ${processo.nome}`);

        } finally {
            nProgress.done();
        };
    };


    // AREA ENVOLVIDA

    const getAreaEnvolvida = async () => {
        try {
            nProgress.start();

            const { data } = await api.get('/area-envolvida');
            setAreasEnvolvidas(data)

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro em receber as areas envolvidas cadastradas', toastConfig)
            
        } finally { 
            nProgress.done()
        }
    }

    // RESPONSAVEL

    const getResponsavel = async () => {
        try {
            nProgress.start();
            const { data } = await api.get('/responsavel');
            setResponsaveis(data);

        } catch (error) {
            console.error(error);
            toast.error('Houve um erro em receber as areas envolvidas cadastradas', toastConfig);

        } finally {
            nProgress.done();
        };
    };


  
  return (
    <UserContext.Provider
      value={{
        edicoes,
        etapas,
        totalPages,
        areasEnvolvidas,
        responsaveis,

        getEdicoesList,
        deleteEdicao,
        createEdicao,
        editEdicao,
        cloneEdicao,

        getEtapas,
        deleteEtapa,
        createEtapa,
        editEtapa,

        ativoInativo,

        getProcessos,
        deleteProcesso,
        createProcesso,
        editProcesso,

        getAreaEnvolvida,
        getResponsavel,
        currentPage,
        setCurrentPage,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
