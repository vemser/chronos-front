import axios from 'axios'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api, authApi } from '../utils/api'
import { IAuthContext, IChildren, IUser, IUsuarioLogado } from '../utils/interfaces'

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IChildren) => {

  const navigate = useNavigate();
  const [roles, setRoles] = useState<string[] | undefined>([]);
  const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState<IUsuarioLogado | {}>({});
  const accesstoken = localStorage.getItem('token')

  const parseJwt = async (token: any) => {
    try {
      let decodedJWT = JSON.parse(atob(token.split('.')[1]));
      let roleArray = decodedJWT.cargos;
      return roleArray;

    } catch (e) {
      return null;
    };
  };

  const loggedUser = async () => {
    try {
      authApi.defaults.headers.common['Authorization'] = accesstoken;
      const { data } = await authApi.get('/usuario/logged-user');
      setDadosUsuarioLogado(data);
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 403) {
        toast.error('Sessão expirada!');
        handleLogout();
      }
    };
  };

  const handleLogin = async (user: IUser) => {
    try {

      const { data } = await authApi.post('/usuario/login', user);
      authApi.defaults.headers.common['Authorization'] = data;
      localStorage.setItem('token', data);
      localStorage.setItem('user', user.username);
      let rolesArray = await parseJwt(localStorage.getItem('token'));
      setRoles(rolesArray);

      if (rolesArray.includes('ROLE_ADMIN')) {
        navigate(`/admin`);
      } else if (rolesArray.includes('ROLE_GESTAO_DE_PESSOAS')) {
        navigate(`/gestao`);
      } else if (rolesArray.includes('ROLE_INSTRUTOR')) {
        navigate(`/instrutor`);
      } else {
        navigate(`/`);
        toast.error('Usuário sem permissão de acesso')
      }

    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error) && error.response && error.response.data) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
          toast.error(error.response.data.errors.join("\n"));
        }
      } else {
        toast.error('Houve um erro no servidor, por favor tente novamente mais tarde.');
      }
    };
  };

  const handleLogout = async () => {
    navigate('/');
    setRoles(undefined);
    api.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const refreshAuth = (token: string) => {
    let decodedJWT = JSON.parse(atob(token.split('.')[1]));
    let roleArray = decodedJWT.cargos;
    setRoles(roleArray)
  }

  return (
    <AuthContext.Provider
      value={{
        roles,
        setRoles,
        handleLogin,
        handleLogout,
        dadosUsuarioLogado,
        loggedUser,
        refreshAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}