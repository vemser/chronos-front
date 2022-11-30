import { useState } from "react";
import { createContext } from "vm";
import { api } from "../utils/api";
import { IChildren, IDiaNaoUtil, IDiaNaoUtilContext } from "../utils/interfaces";

export const AuthContext = createContext({} as IDiaNaoUtilContext);

export const AuthProvider = ({ children }: IChildren ) => {

    const [ diasNaoUteis, setDiasNaoUteis ] = useState<IDiaNaoUtil>()



    const getDiaNaoUtil = async () => {
        try {

           const { data } = await api.get('/dia-nao-util?pagina=0&tamanho=20')
            setDiasNaoUteis(data.elementos)

        } catch (error) {

        }
    }

    const postDiaNaoUtil = async () => {
        try {

            

        } catch (error) {
            
        }
    }

    const deleteDiaNaoUtil = async () => {
        try {

        } catch (error) {
            
        }
    }

    const putDiaNaoUtil = async () => {
        try {

        } catch (error) {
            
        }
    }

    return(
        <AuthContext.Provider value={{ }}>
            { children }
        </AuthContext.Provider>
    )
}
