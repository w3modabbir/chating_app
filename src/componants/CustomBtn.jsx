import { Button } from '@mui/material'
import React from 'react'

const CustomBtn = ({variant, text, styling}) => {
  return (
    <Button className={styling} variant={variant}>{text}</Button>
  )
}

export default CustomBtn