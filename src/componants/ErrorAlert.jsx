import { Alert } from '@mui/material'
import React from 'react'

const ErrorAlert = ({text, severity,  styling}) => {
  return (
    <Alert className={styling} severity={severity}>{text}</Alert>
  )
}

export default ErrorAlert