import { useContext, useState, useEffect } from 'react'
import styles from './GestaoEditarProcesso.module.css'
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select'
import makeAnimated from 'react-select/animated'
import { Header } from '../../../components/Header/Header'

import { Loader } from '../../../components/Loader/Loader'


export const GestaoEditarProcesso = () => {

  //HOOKS
  const animatedComponents = makeAnimated()
  const { state } = useLocation()
  const { edicao } = useParams();
  const idEdicao = Number(edicao)

  const defaultAreaValue = state.areasEnvolvidas.map((area: any) => {
    return { label: area.nome, value: area.nome }
  })

  const defaultResponsavelValue = state.responsaveis.map((responsavel: any) => {
    return { label: responsavel.nome, value: responsavel.nome }
  })

  const [areasEnvolvidasState, setAreasEnvolvidasState] = useState<string[]>(defaultAreaValue.map((area: any) => {
    return { nome: area.value }

  }))
  const [responsaveisState, setResponsaveisState] = useState<string[]>(defaultResponsavelValue.map((responsavel: any) => {
    return { nome: responsavel.value }

  }))

  const { getAreaEnvolvida, getResponsavel, areasEnvolvidas, responsaveis, editProcesso, loading } = useContext(UserContext)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    getAreaEnvolvida()
    getResponsavel()
  }, [])

  const handleChangeAreas = (value: any) => {
    const list = value.map((item: any) => {
      return { 'nome': item.value }
    })
    setAreasEnvolvidasState(list)
  }

  const handleChangeResponsaveis = (value: any) => {
    const list = value.map((item: any) => {
      return { 'nome': item.value }
    })
    setResponsaveisState(list)
  }

  // SELECT 

  const selectAreaEnvolvida: object[] = []
  const selectResponsavel: object[] = []

  areasEnvolvidas.map((area) => {
    selectAreaEnvolvida.push({
      value: area.nome,
      label: area.nome
    })
  })

  responsaveis.map((responsavel) => {
    selectResponsavel.push({
      value: responsavel.nome,
      label: responsavel.nome
    })
  })

  if (state.processoCritico === 'ATIVO') {
    var critico = true
  } else {
    var critico = false
  }

  return (
    <>
      <Header />
      <div className={styles.ContainerGeral}>
        <div className={styles.ContainerProcesso}>
          <div>
            <h2>Editar processo</h2>
          </div>
          <div>
          {loading == true ? <Loader /> :
            <form
              className={styles.ContainerForm}
              onSubmit={handleSubmit((data: any) => editProcesso(data, areasEnvolvidasState, responsaveisState, idEdicao)
              )}
            >
              <TextField
                className={styles.FormRow}
                id="nome"
                label="Nome"
                variant="standard"
                defaultValue={state.nome}
                {...register('nome')}
              />
              <label htmlFor="selectGroup">
                ??rea Envolvida

                <CreatableSelect
                  components={animatedComponents}
                  options={selectAreaEnvolvida}
                  onChange={handleChangeAreas}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={'??rea Envolvida'}
                  id={'area-envolvida'}
                  defaultValue={defaultAreaValue}
                />
              </label>
              <label htmlFor="selectGroup">
                Respons??vel

                <CreatableSelect
                  components={animatedComponents}
                  options={selectResponsavel}
                  onChange={handleChangeResponsaveis}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder={'Respons??vel'}
                  id={'responsavel'}
                  defaultValue={defaultResponsavelValue}
                />
              </label>
              <TextField
                className={styles.FormRow}
                id="duracaoProcesso"
                label="Dura????o do processo"
                variant="standard"
                defaultValue={state.duracaoProcesso}
                {...register('duracaoProcesso')}
              />
              <TextField
                className={styles.FormRow}
                id="diasUteis"
                label="Dias uteis"
                variant="standard"
                defaultValue={state.diasUteis}
                {...register('diasUteis')}
              />
              <TextField
                className={styles.FormRow}
                id="ordemExecucao"
                label="Ordem"
                defaultValue={state.ordemExecucao}
                variant="standard"
                {...register('ordemExecucao')}
              />
              <Box>
                <FormControlLabel
                  control={<Checkbox defaultChecked={critico} />}
                  label="Processo Cr??tico" id='processoCritico' className={styles.dataPicker}
                  defaultChecked={critico}
                  {...register('processoCritico')} sx={{ mt: 2 }}
                />
              </Box>
              <TextField
                style={{ display: 'none' }}
                id="idProcesso"
                value={state.idProcesso}
                {...register('idProcesso')}
              />
              <div className={styles.ContainerBotao}>
                <Button
                  className={styles.BotaoGestao}
                  type='submit'
                  variant="contained"
                  sx={{
                    boxShadow: '-2px 4px 10px -4px rgba(0,0,0,0.75)',
                    transition: '0.5s',
                    "&:hover": {
                      transform: 'scale(1.02)'
                    },
                    "&:active": {
                      transform: 'scale(0.98)'
                    }
                  }}
                >
                  Salvar
                </Button>
              </div>
            </form>
          }
          </div>
        </div>
      </div>
    </>
  )
}