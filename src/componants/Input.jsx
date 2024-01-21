import { TextField } from '@mui/material'
import React from 'react'

const Input = ({variant, lebelTxt, style, placeholder, type, name, onChange}) => {
  return (
    <TextField onChange={onChange} className={style}  type={type} name={name} label={lebelTxt} variant={variant} placeholder={placeholder} />
  )
}

export default Input