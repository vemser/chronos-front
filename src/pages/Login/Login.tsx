import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import loginLogo from '../../assets/login-logo.png'
import styles from './Login.module.css'
import { AuthContext } from '../../context/AuthContext'
import { useForm } from 'react-hook-form'
import { IUser } from '../../utils/interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { userFormSchema } from '../../utils/schemas'
import { Navigate } from 'react-router-dom'

export const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // FUNCTION

  const { handleLogin, roles, setRoles } = useContext(AuthContext)
  const token = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: yupResolver(userFormSchema)
  })

  useEffect(() => {
    if (token) {
      let decodedJWT = JSON.parse(atob(token.split('.')[1]))
      let roleArray = decodedJWT.cargos

      setRoles(roleArray)
    }
  }, [])

  if (roles?.includes('ROLE_ADMIN')) {
    return <Navigate to="/admin" />
  } else if (roles?.includes('ROLE_GESTAO_DE_PESSOAS')) {
    return <Navigate to="/gestao" />
  } else if (roles?.includes('ROLE_INSTRUTOR')) {
    return <Navigate to="/instrutor" />
  }

  return (
    <Box display={'flex'} className={styles.container}>
      <Box
        component="div"
        sx={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={styles.image}
      >
        <img src={loginLogo} alt="" style={{ width: '80%' }} />
      </Box>

      <Box
        display={'flex'}
        alignItems={'center'}
        width={'50%'}
        justifyContent={'center'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={'50px'}
          alignItems={'center'}
          justifyContent={'center'}
          borderRadius={'8px'}
          padding={'30px'}
          boxShadow={2}
        >
          <h1 className={styles.blue}>Login</h1>
          <form onSubmit={handleSubmit((data: IUser) => handleLogin(data))}>
            <Box
              className={styles.loginText}
              display={'flex'}
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <Box sx={{ mb: 3 }}>
                <TextField
                  {...register('username')}
                  className={styles.loginText}
                  id="input-login-email"
                  label="Login"
                  variant="outlined"
                  style={{ color: 'palette.primary.dark' }}
                  error={!!errors.username}
                />
                {errors.username && (
                  <span
                    className={styles.ContainerError}
                    id="login-error-email"
                  >
                    {errors.username.message}
                  </span>
                )}
              </Box>

              <FormControl variant="outlined" sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  {...register('password')}
                  className={styles.loginText}
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                {errors.password && (
                  <span
                    className={styles.ContainerError}
                    id="login-error-senha"
                  >
                    {errors.password.message}
                  </span>
                )}
              </FormControl>
            </Box>
            <Button
              className={styles.loginText}
              type="submit"
              variant="contained"
              id="button-login"
              sx={{ mt: 3, mb: 2, backgroundColor: '#1e62fe' }}
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
