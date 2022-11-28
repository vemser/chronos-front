import React, { useState } from 'react'
import styles from './GestaoCadastrarEdicao.module.css'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { Box } from '@mui/material'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'

const isWeekend = (date: Dayjs) => {
  const day = date.day()

  return day === 0 || day === 6
}

export const GestaoCadastrarEdicao = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'))
  console.log(value)

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar edição</h2>
        </div>

        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerNomeEdicao}>
            <TextField
              id="standard-multiline-flexible"
              label="Nome da edição"
              variant="standard"
              className={styles.NomeEdicao}
            />
          </div>
          <div className={styles.ContainerMenorCalendario}>
            <Box>
              <p>Inicio</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  value={value}
                  shouldDisableDate={isWeekend}
                  onChange={newValue => {
                    setValue(newValue)
                  }}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box>
              <p>Término</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'pt-br'}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  value={value}
                  shouldDisableDate={isWeekend}
                  onChange={newValue => {
                    setValue(newValue)
                  }}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </div>
        </div>
      </section>
    </>
  )
}
