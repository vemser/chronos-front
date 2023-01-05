import { useContext, useState } from 'react'
import styles from './AdminEditarColab.module.css'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp'

import { useForm } from 'react-hook-form'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import { ICargos, IColaborador } from '../../../utils/interfaces'
import { AdminContext } from '../../../context/AdminContext'
import {MoonLoader} from 'react-spinners'

import { useLocation } from 'react-router-dom'
import { Header } from '../../../components/Header/Header'

export const AdminEditarColab = () => {
  const { state } = useLocation()
  const { editarColaborador } = useContext(AdminContext)

  const [ userCargos, setUserCargos ] = useState<ICargos>()

  const [selectedImage, setSelectedImage] = useState<any>(null)

  const { register, handleSubmit, formState: { errors }} = useForm<IColaborador>({
    defaultValues: {
      login: state.login,
    }
  })

  // CARGOS
  var administrador = false
  var gestaoDePessoas = false
  var instrutor = false
  var gestor = false
  var aluno = false
  var colaborador = false

    for(let i = 0; i < state.cargos.length; i++) {

      if(state.cargos[i].nome.includes('ROLE_ADMIN')){
        administrador = true
      } 

      if(state.cargos[i].nome.includes('ROLE_GESTAO_DE_PESSOAS')){
        gestaoDePessoas = true
      } 
      
      if(state.cargos[i].nome.includes('ROLE_INSTRUTOR')){
        instrutor = true
      } 

      if(state.cargos[i].nome.includes('ROLE_GESTOR')){
        gestor = true
      } 

      if(state.cargos[i].nome.includes('ROLE_ALUNO')){
        aluno = true
      } 

      if(state.cargos[i].nome.includes('ROLE_COLABORADOR')){
        colaborador = true
      } 
    }
  

  return (
    <>
   
      <Header />

      <Grid container width={'100%'} display="flex" justifyContent="center">
        <form
          className={styles.FormAdmin}
          onSubmit={handleSubmit((data: IColaborador) => editarColaborador(data, state.idUsuario)
          )}
        >
          <Grid
            container
            spacing={2}
            width={'80%'}
            alignItems={'center'}
            borderRadius={'8px'}
            boxShadow={2}
            sx={{
              mt: '50px',
              mb: 3,
              padding: 0
            }}
          >
            <Grid
              container
              item
              xs={12}
              height={'50px'}
              display="flex"
              justifyContent="center"
              color={'#fff'}
              borderRadius={'8px 8px 0px 0px'}
              boxShadow={2}
              sx={{ backgroundColor: '#1E62FE', width: '100%' }}
            >
              <Box>
                {' '}
                <h2>Editar Colaborador</h2>{' '}
              </Box>
            </Grid>
            <Box
              minHeight={'500px'}
              width={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              className={styles.ContainerPerfil}
            >
              <Box className={styles.nomeFoto}
                width={'50%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
              >
                <span>{state.login}</span>
                <Box
                  width={'300px'}
                  height={'300px'}
                  borderRadius={'8px'}
                  boxShadow={2}
                >
                  {' '}
                  <div className={styles.ContainerImagem}>
                    {state.imagem === null && selectedImage === null ? (
                      <svg data-testid="AccountCircleSharpIcon" width={'250px'}>
                        <AccountCircleSharpIcon color={'disabled'} />
                      </svg>
                    ) : state.imagem === null && selectedImage !== null ? (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    ) : state.imagem !== null && selectedImage !== null ? (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    ) : (
                      <img
                        alt="not fount"
                        width={'250px'}
                        className={styles.BorderRadius}
                        src={`data:image/png;base64, ${state.imagem}`}
                      />
                    )}
                  </div>
                  <Box display="flex" justifyContent="center">
                    <label htmlFor="imagem">
                      <input
                        style={{ display: 'none' }}
                        id="imagem"
                        type="file"
                        onChange={(e: any) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setSelectedImage(e.target.files[0])
                          }
                        }}
                      />
                    </label>
                  </Box>
                </Box>
              </Box>

              <Box
                width={'50%'}
                display="flex"
                justifyContent="center"
                alignItems={'center'}
              >
                <Box display="flex" flexDirection="column" gap="20px">
                  
                  <h2>Editar Cargos</h2>

                  <Box>
                    <input type="text" style={{display: 'none'}} defaultValue={state.login} />
                  </Box>

                  <FormControl
                    required
                    component="fieldset"
                    sx={{ m: 3 }}
                    variant="standard"
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked={administrador} />}
                        label="Administrador"
                        id="Administrador"
                        {...register('Administrador')}
                      />

                      <FormControlLabel
                        control={<Checkbox defaultChecked={gestaoDePessoas} />}
                        label="Gestao de Pessoas"
                        id="GestaoDePessoa"
                        {...register('GestaoDePessoas')}
                      />

                      <FormControlLabel
                        control={<Checkbox defaultChecked={instrutor} />}
                        label="Instrutor"
                        id="Instrutor"
                        {...register('Instrutor')}
                      />
                      
                      <FormControlLabel
                        control={<Checkbox defaultChecked={gestor} />}
                        label="Gestor"
                        id="Gestor"
                        {...register('Gestor')}
                      />

                      <FormControlLabel
                        control={<Checkbox defaultChecked={aluno} />}
                        label="Aluno"
                        id="Aluno"
                        {...register('Aluno')}
                      />

                      <FormControlLabel
                        control={<Checkbox defaultChecked={colaborador} />}
                        label="Colaborador"
                        id="Colaborador"
                        {...register('Colaborador')}
                      />
                    </FormGroup>
                  </FormControl>
                  <div className={styles.ContainerEnviar}>
                    <label htmlFor="submit">
                      <input
                        type="submit"
                        className={styles.BotaoEnviar}
                        value="Salvar"
                      />
                    </label>
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
        </form>
      </Grid>
    </>
  )
}