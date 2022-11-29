import React, { useContext } from 'react'
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

interface State {
  password: string
  showPassword: boolean
}

// const { handleLogin } = useContext(AuthContext)

export const Login = () => {





    const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { handleLogin } = useContext(AuthContext)
  const token = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>({
    resolver: yupResolver(userFormSchema)
  })

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
                  {...register('email')}
                  className={styles.loginText}
                  id="input-login-email"
                  label="Email"
                  variant="outlined"
                  value={'admin@gmail.com'}
                  style={{ color: 'palette.primary.dark' }}
                  error={!!errors.email}
                />
                {errors.email && (
                  <span
                    className={styles.ContainerError}
                    id="login-error-email"
                  >
                    {errors.email.message}
                  </span>
                )}
              </Box>

              <FormControl variant="outlined" sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Senha
                </InputLabel>
                <OutlinedInput
                  {...register('senha')}
                  className={styles.loginText}
                  id="input-login-senha"
                  type={values.showPassword ? 'text' : 'password'}
                  value={'12345678'}
                  onChange={handleChange('password')}
                  error={!!errors.senha}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
                {errors.senha && (
                  <span
                    className={styles.ContainerError}
                    id="login-error-senha"
                  >
                    {errors.senha.message}
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
