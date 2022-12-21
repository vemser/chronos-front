import React, { useContext, useLayoutEffect, useState } from 'react'
import styles from './AdminColab.module.css'
import { Box } from '@mui/system'
import { PaginacaoColaborador } from '../../../components/Paginacao/PaginacaoColaborador/PaginacaoColaborador'
import { AdminContext } from '../../../context/AdminContext'
import { ButtonCadastrar } from '../../../components/Admin/ButtonCadastrar/ButtonCadastrar'
import { Header } from '../../../components/Header/Header'
import { AdminColaboradoresTable } from '../../../components/Admin/AdminColaboradoresTable/AdminColaboradoresTable'
import { Button, Select, TextField, MenuItem  } from '@mui/material'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/dist/declarations/src/Creatable'
import makeAnimated from 'react-select/animated'
import { BuscarContext } from '../../../context/BuscaContext'

export const AdminColaboradores = () => {

  // const [areasEnvolvidas, setAreasEnvolvidas] = useState([]);

  // const animatedComponents = makeAnimated()
  // const defaultAreaValue = areasEnvolvidas.map((area: any) => {
  //   return {label: area.nome, value: area.nome}
  // })

  // const selectAreaEnvolvida:object[] = []

  // areasEnvolvidas.map((area: any) => {
  //   selectAreaEnvolvida.push({
  //     value: area.nome,
  //     label: area.nome
  //   })
  // })

  //

  const { buscarDadosColaborador } = useContext<any>(AdminContext)
  const { buscarColaborador } = useContext(BuscarContext)

  useLayoutEffect(() => {
    buscarDadosColaborador('1')
  }, [])

  const { register, handleSubmit, reset } = useForm<any>({})

  const procurar = (data: any) => {
    buscarColaborador(data);
  }
  return (
    <>
      <Header />
      <Box width={'100%'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={'50px'}>
        <Box sx={{
          width: '80%',
          mb: '30px', 
          boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
          backgroundColor: '#fff', 
          borderRadius: '8px',
          p: '20px 40px'
        }}>
          <Box 
          component={'form'}
          onSubmit={handleSubmit(procurar)}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
          >
            <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '50px',
              justifyContent: 'space-between'
            }}
            >              
              <Box
              sx={{
                width: '100%',
                height: '40px'
              }}
              >              
                <TextField
                    label='Login'
                    id='login'
                    type='text'
                    {...register('login')}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: '10px'
                      }, 
                      width: '100%',
                      height: '40px'
                    }}
                  />
              </Box>
              <Box
              sx={{
                width: '100%',
                height: '40px'
              }}
              >              
                <Select
                    labelId="cargo"
                    id="cargo"
                    label="Cargo"
                    {...register('cargo')}
                    // value={'Cargo'}
                    // onChange={handleChange}
                    sx={{
                      width: '100%',
                      height: '44px'
                    }}
                  >
                    <MenuItem value={'Administrador'}>Administrador</MenuItem>
                    <MenuItem value={'Gestão de pessoas'}>Gestão de pessoas</MenuItem>
                    <MenuItem value={'Instrutor'}>Instrutor</MenuItem>
                  </Select>
                  {/* <CreatableSelect
                  components={animatedComponents}
                  options={selectAreaEnvolvida}
                  // onChange={handleChangeAreas}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={'Área Envolvida'}
                  id={'area-envolvida'}
                  defaultValue={defaultAreaValue}
                /> */}
              </Box>
            </Box>
            <Box
            sx={{
              m: '15px 0',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <Button onClick={() => { buscarDadosColaborador('1'); reset() }} variant={'contained'}>Limpar</Button>
              <Button type={'submit'} variant={'contained'}>Buscar</Button>
            </Box>
          </Box>
        </Box>        
        <Box className={styles.ContainerHeader}>
          <div className={styles.ContainerTitulo}>
            <h2>Colaboradores</h2>
          </div>
            <Box sx={{ justifyContent: { xs: 'center', md: 'flex-end' } }} className={styles.ContainerButton}><ButtonCadastrar /></Box>
        </Box>
        <Box width={'80%'}>
          <AdminColaboradoresTable />
          <div>
            <PaginacaoColaborador />
          </div>
        </Box>
      </Box>
    </>
  )
}

{/* <Box sx={{
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  // background: 'blue'
}}>
  <Box>
    <Box
      component={'form'}
      onSubmit={handleSubmit(procurar)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        // background: 'red'
      }}
    >
      <TextField
        label='Buscar'
        id='procurar'
        type='text'
        {...register('procurar')}
        sx={{
          "& .MuiInputBase-input": {
            height: '10px'
          }
        }}
      />
      <Button type={'submit'} variant={'contained'}>Buscar</Button>
      <Button onClick={() => { buscarDadosColaborador('1'); reset() }} variant={'contained'}>Limpar</Button>
    </Box>
  </Box>
</Box> */}