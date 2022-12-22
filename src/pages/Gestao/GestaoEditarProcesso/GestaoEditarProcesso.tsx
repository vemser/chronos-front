import React, { useContext, useState, useEffect } from 'react'
import styles from './GestaoEditarProcesso.module.css'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { useForm } from 'react-hook-form'
import CreatableSelect from 'react-select'
import makeAnimated from 'react-select/animated'


export const GestaoEditarProcesso = () => {

  //HOOKS
  const animatedComponents = makeAnimated()

  const { state } = useLocation()
  const { edicao } = useParams();

  const idEdicao = Number(edicao)

  const [areasEnvolvidasState, setAreasEnvolvidasState] = useState<string[]>([])
  const [responsaveisState, setResponsaveisState] = useState<string[]>([])

  const { getAreaEnvolvida, getResponsavel, areasEnvolvidas, responsaveis, editProcesso } = useContext(UserContext)
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

  const defaultAreaValue = state.areasEnvolvidas.map((area: any) => {
    return { label: area.nome, value: area.nome }
  })

  const defaultResponsavelValue = state.responsaveis.map((responsavel: any) => {
    return { label: responsavel.nome, value: responsavel.nome }
  })



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

  return (
    <>
      <GestaoHeader />

      <div className={styles.ContainerGeral}>
        <div className={styles.ContainerProcesso}>
          <div>
            <h2>Editar processo</h2>
          </div>
          <div>
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
                Área Envolvida

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
                  placeholder={'Área Envolvida'}
                  id={'area-envolvida'}
                  defaultValue={defaultAreaValue}
                />
              </label>

              <label htmlFor="selectGroup">
                Responsável

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
                  placeholder={'Responsável'}
                  id={'responsavel'}
                  defaultValue={defaultResponsavelValue}
                />
              </label>

              <TextField
                className={styles.FormRow}
                id="duracaoProcesso"
                label="Duração do processo"
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
                  control={<Checkbox /> } 
                  label="Processo Crítico"  id='processoCritico' className={styles.dataPicker}
                
                  {...register('processoCritico')} sx={{mt: 2}}
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
                >
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}