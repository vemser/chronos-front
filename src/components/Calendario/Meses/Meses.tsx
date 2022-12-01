import React from 'react'
import { Grid, Box } from '@mui/material'
import { Dia } from '../Dia/Dia'


export const Meses = ({month}: any) => {
  
  return (
    <Grid container columns={7} sx={{display: 'flex', flexDirection:'column', alignItems:'center', width:'1200px', margin:'0 auto'}}>

      {month.map((row: any, i: any) => { 
        return  <Box key={i} sx={{ display:'flex', justifyContent:'space-between', width:'1200px'}}>

          {row.map((day: any, index: any) => {
            return  <Dia day={day} key={index} rowIndex={i}/>
            
          })}
        </Box>
      })}
    </Grid>


    
  )
}
