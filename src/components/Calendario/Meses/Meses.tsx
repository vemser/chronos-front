import React from 'react'
import { Grid, Box } from '@mui/material'
import { Dia } from '../Dia/Dia'


export const Meses = (month: any) => {
  return (
    <Grid container spacing={2} columns={7} >
      {month.map((row: any, i: any) => { 
        <Box key={i}>
          {row.map((day: any, index: any) => {
            <Dia day={day} key={index}/>
          })}
        </Box>
      })} 
    </Grid>

    
  )
}
