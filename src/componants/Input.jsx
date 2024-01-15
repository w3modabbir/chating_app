import { TextField } from '@mui/material'
import React from 'react'

const Input = ({variant, lebelTxt, style, placeholder, type, name}) => {
  return (
    <TextField className={style}  type={type} name={name} label={lebelTxt} variant={variant} placeholder={placeholder} />
  )
}

export default Input