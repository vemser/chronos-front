import React, { useContext, useState, useEffect } from 'react'
import styles from './GestaoNovoProcesso.module.css'

import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProcessoSchema } from '../../../utils/schemas'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

export const GestaoNovoProcesso = () => {
  
  const { state } = useLocation()
  const { edicao } = useParams();

  const idEdicao = Number(edicao)

  const [areasEnvolvidasState, setAreasEnvolvidasState] = useState<string[]>([])
  const [responsaveisState, setResponsaveisState] = useState<string[]>([])

  const { getAreaEnvolvida, getResponsavel, areasEnvolvidas, responsaveis, createProcesso } = useContext(UserContext)

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(ProcessoSchema)
     })

  
  useEffect(() => {
    getAreaEnvolvida()
    getResponsavel()
    
  }, [])

  const handleChangeAreas = (value: any) => { 
    const list = value.map((item: any) => {
      return {'nome': item.value}
    })
    setAreasEnvolvidasState(list)
  }

  const handleChangeResponsaveis = (value: any) => { 
    const list = value.map((item: any) => {
      return {'nome': item.value}
    })
    setResponsaveisState(list)
  }

  // SELECT 
  
  const selectAreaEnvolvida:object[] = []
  const selectResponsavel:object[] = []

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
            <h2>Cadastrar processo</h2>
          </div>
          <div>
            <form
              className={styles.ContainerForm}
              onSubmit={handleSubmit((data: any) => createProcesso(data, areasEnvolvidasState, responsaveisState, state.idEtapa, idEdicao)
              )}
            >

              <TextField
                className={styles.FormRow}
                id="nome"
                label="Nome"
                variant="standard"
                {...register('nome')}
                error={!!errors.nome}
              />
       {errors.duracaoProcesso && (
                    <span
                      className={styles.ContainerError}
                      id="duracaoProcesso-error"
                    >
                      <p className={styles.ContainerError}>Por favor, digite os nomes</p>
                    </span>
                  )}
              <label htmlFor="selectGroup" id='area-envolvida'>
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
        
                />
              </label>

              <label htmlFor="selectGroup" id='responsavel'>
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
          
                />
              </label>

              <TextField
                className={styles.FormRow}
                id="duracaoProcesso"
                label="Duração do processo"
                variant="standard"
                {...register('duracaoProcesso')}
                error={!!errors.duracaoProcesso}
              />
              {errors.duracaoProcesso && (
                    <span
                      className={styles.ContainerError}
                      id="duracaoProcesso-error"
                    >
                      <p className={styles.ContainerError}>Por favor, digite a duração do processo</p>
                    </span>
                    
                  )}
              <TextField
                className={styles.FormRow}
                id="diasUteis"
                label="Dias uteis"
                variant="standard"
                {...register('diasUteis')}
                error={!!errors.diasUteis}
              />
              {errors.duracaoProcesso && (
                    <span
                      className={styles.ContainerError}
                      id="duracaoProcesso-error"
                    >
                      <p className={styles.ContainerError}>Por favor, digite os dias úteis</p>
                    </span>
                    
                  )}
              <TextField
                className={styles.FormRow}
                id="ordemExecucao"
                label="Ordem"
                variant="standard"
                {...register('ordemExecucao')}
                error={!!errors.ordemExecucao}
              />
              {errors.duracaoProcesso && (
                    <span
                      className={styles.ContainerError}
                      id="duracaoProcesso-error"
                    >
                      <p className={styles.ContainerError}>Por favor, digite a ordem de execução</p>
                    </span>
                  )}

                <FormControlLabel control={<Checkbox /> } 
                label="Processo Crítico"  id='processoCritico' className={styles.dataPicker}
              
                {...register('processoCritico')} sx={{mt: 2}}/>

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
