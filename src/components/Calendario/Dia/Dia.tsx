import React from 'react'

export const Dia = ({day}: any) => {
  return (
    <div>
        {day.format()}
    </div>
  )
}
