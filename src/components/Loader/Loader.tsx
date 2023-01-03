import React from 'react'
import { MoonLoader } from 'react-spinners'
import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
        <MoonLoader 
        />  
    </div>
  )
}
