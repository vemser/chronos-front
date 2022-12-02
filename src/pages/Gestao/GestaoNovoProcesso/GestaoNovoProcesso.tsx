import React, { useContext, KeyboardEventHandler, useState } from 'react'
import styles from './GestaoNovoProcesso.module.css'
import Select from 'react-select'

import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../../../context/UserContex'
import { IEtapa } from '../../../utils/interfaces'
import { useForm } from 'react-hook-form'
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

  const { state } = useLocation()
  const { createEtapa } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IEtapa>({
    resolver: yupResolver(cadastrarEtapaFormSchema)
  })

  const options = [
    { value: 'produto 01', label: 'Produto 01' },
    { value: 'produto 02', label: 'Produto 02' },
    { value: 'produto 03', label: 'Produto 03' },
    { value: 'produto 04', label: 'Produto 04' },
    { value: 'produto 05', label: 'Produto 05' },
    { value: 'produto 06', label: 'Produto 06' },
    { value: 'produto 07', label: 'Produto 07' },
    { value: 'produto 08', label: 'Produto 08' }
  ]

  const [selectedOptions, setSelectedOptions] = useState([])

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
              onSubmit={handleSubmit((data: IEtapa) =>
                createEtapa(data, state.idEdicao)
              )}
            >
              {/* Select */}

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
                  defaultValue={[options[0], options[2]]}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={(item: any) => setSelectedOptions(item)}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  closeMenuOnSelect={false}
                />
              </label>
              <label htmlFor="selectGroup">
                Responsável
                <CreatableSelect
                  defaultValue={[options[0], options[2]]}
                  components={animatedComponents}
                  isMulti
                  options={options}
                  onChange={(item: any) => setSelectedOptions(item)}
                  className={styles.selectOption}
                  isClearable={true}
                  isSearchable={true}
                  isDisabled={false}
                  isLoading={false}
                  isRtl={false}
                  closeMenuOnSelect={false}
                />
              </label>
              <TextField
                className={styles.FormRow}
                id="duracaoProcesso"
                label="Duração do processo"
                variant="standard"
                // {...register('duracaoProcesso')}
              />
              <TextField
                className={styles.FormRow}
                id="diasUteis"
                label="Dias uteis"
                variant="standard"
                // {...register('diasUteis')}
              />
              <TextField
                className={styles.FormRow}
                id="ordem"
                label="Ordem"
                variant="standard"
                // {...register('ordem')}
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
