import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import { IAuthContext, IChildren, IUser, IUsuarioLogado } from '../utils/interfaces'

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IChildren) => {

  const navigate = useNavigate();

  const [roles, setRoles] = useState<string[] | undefined>([]);

  const [dadosUsuarioLogado, setDadosUsuarioLogado] = useState<IUsuarioLogado | {} >({});

  const accesstoken = localStorage.getItem('token')

  const parseJwt = async (token: any) => {
    try {
      let decodedJWT = JSON.parse(atob(token.split('.')[1]));
      let roleArray = decodedJWT.CARGOS;

      return roleArray;

    } catch (e) {
      return null;

    };
  };

  const loggedUser = async () => {
    try {
      api.defaults.headers.common['Authorization'] = accesstoken;
      const { data } = await api.get('/usuario/logged-user');
      setDadosUsuarioLogado(data); 
    } catch (error:any) {
      console.log(error);
      if (error.response.status === 403) {
        toast.error('Sessão expirada!');
        handleLogout();
      }
    };
  };

  const handleLogin = async (user: IUser) => {
    try {

      const { data } = await api.post('/login', user);

      api.defaults.headers.common['Authorization'] = data;
      
      localStorage.setItem('token', data);
      localStorage.setItem('user', user.email);

      let rolesArray = await parseJwt(localStorage.getItem('token'));

      setRoles(rolesArray);

      loggedUser();

      if (rolesArray.includes('ROLE_ADMIN')) {
        navigate(`/admin`);
      } else if (rolesArray.includes('ROLE_GESTAO_DE_PESSOAS')) {
        navigate(`/gestao`);
      } else if (rolesArray.includes('ROLE_INSTRUTOR')) {
        navigate(`/instrutor`);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Usuário ou senha inválida!');
    };
  };

  const handleLogout = async () => {
    navigate('/');
    setRoles(undefined);

    api.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <AuthContext.Provider
      value={{
        roles,
        setRoles,
        handleLogin,
        handleLogout,
        dadosUsuarioLogado,
        loggedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
