import React, { useContext, useState, useEffect } from 'react'
import styles from './GestaoNovoProcesso.module.css'
import Select from 'react-select'

import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation, useParams } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { IEtapa, IProcesso } from '../../../utils/interfaces'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { cadastrarEtapaFormSchema } from '../../../utils/schemas'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

export const GestaoNovoProcesso = () => {

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<any>({
  //   // resolver: yupResolver(cadastrarEtapaFormSchema)
  // })

  //HOOKS

  
  const { state } = useLocation()
  const { edicao } = useParams();

  const idEdicao = Number(edicao)

  const [areasEnvolvidasState, setAreasEnvolvidasState] = useState<any>([])
  const [responsaveisState, setResponsaveisState] = useState<any>([])

  const { createEtapa, getAreaEnvolvida, getResponsavel, areasEnvolvidas, responsaveis, createProcesso } = useContext(UserContext)
  const { register, handleSubmit } = useForm()
  
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
                />
              </label>



              <TextField
                className={styles.FormRow}
                id="duracaoProcesso"
                label="Duração do processo"
                variant="standard"
                {...register('duracaoProcesso')}
              />
              <TextField
                className={styles.FormRow}
                id="diasUteis"
                label="Dias uteis"
                variant="standard"
                {...register('diasUteis')}
              />
              <TextField
                className={styles.FormRow}
                id="ordemExecucao"
                label="Ordem"
                variant="standard"
                {...register('ordemExecucao')}
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
