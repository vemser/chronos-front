import dayjs from 'dayjs'
import React from 'react'
import styles from 'Dia.module.css'

export const Dia = ({day, rowIndex}: any) => {

    

    // const getCurrentDayClass() {
    //     return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'active' : ''
    // }
    // console.log(day);
    
  return (
    <div style={{ width:'20%', height:'100px', border: '#ccc', display: 'flex', flexDirection:'column', textAlign:'center'}}>
        <header style={{ display: 'flex', flexDirection:'column' }}>
            {rowIndex === 0 && (
            <p> {day.format('ddd').toUpperCase()}</p>
            )}
            <p>{day.format('DD')}</p>
        </header>
    </div>
  )
}
