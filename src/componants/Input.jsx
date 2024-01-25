import { TextField } from '@mui/material'
import React from 'react'

const Input = ({variant, lebelTxt, style, placeholder, type, name, onChange, value}) => {
  return (
    <TextField onChange={onChange} className={style}  type={type} name={name} label={lebelTxt} variant={variant} placeholder={placeholder} value={value} />
  )
}

export default Input