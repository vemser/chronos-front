import React, { useState } from 'react'
import styles from './GestaoCadastrarDiaNaoUtil.module.css'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'

import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { GestaoHeader } from '../../../components/Gestao/GestaoHeader/GestaoHeader'
import { Link } from 'react-router-dom'

const isWeekend = (date: Dayjs) => {
  const day = date.day()

  return day === 0 || day === 6
}

export const GestaoCadastrarDiaNaoUtil = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'))
  console.log(value)

  return (
    <>
    <GestaoHeader />
      <section className={styles.ContainerSection}>
        <div className={styles.ContainerTitle}>
          <h2>Cadastrar Dias Não-úteis</h2>
        </div>

        <div className={styles.ContainerCalendario}>
          <div className={styles.ContainerNomeEdicao}>
            <TextField
              id="standard-multiline-flexible"
              label="Descrição"
              variant="standard"
              className={styles.NomeEdicao}
            />

            <FormControlLabel control={<Checkbox />} label="Repetir para todos os anos" />
          </div>
          <div className={styles.ContainerMenorCalendario}>
            <Box>
              <p>Data Inicial</p>
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
              <p>Data Final</p>
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
          <Link to={'/gestao/dias-nao-uteis'}>
            <Button variant="contained" sx={{ backgroundColor: '#1e62fe', fontWeight:'500'}}>Adicionar</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
