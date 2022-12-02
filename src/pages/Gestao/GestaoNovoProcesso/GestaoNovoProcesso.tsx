import React, { useContext, useState, useEffect } from 'react'
import styles from './GestaoNovoProcesso.module.css'
import Select from 'react-select'

import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
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
  const [selectedOptions, setSelectedOptions] = useState([])
  const { createEtapa, getAreaEnvolvida, getResponsavel, areasEnvolvidas, responsaveis } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors }, control} = useForm({
    resolver: yupResolver(cadastrarEtapaFormSchema)
  })

  useEffect(() => {
    getAreaEnvolvida()
    getResponsavel()

  }, [])

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


  const handleSelect = () => {
    console.log(selectedOptions)
  }


  


 
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
              onSubmit={handleSubmit((data: any) =>
                console.log(data, state.idEdicao)
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
                  onChange={(item: any) => setSelectedOptions(item)}
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
                  isMulti
                  onChange={(item: any) => setSelectedOptions(item)}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  closeMenuOnSelect={false}
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
                id="ordem"
                label="Ordem"
                variant="standard"
                {...register('ordem')}
              />
              <div className={styles.ContainerBotao}>
                <Button
                  className={styles.BotaoGestao}
                  type={'submit'}
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
