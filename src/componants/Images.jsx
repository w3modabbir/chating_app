import React from 'react'

const Images = ({source, text}) => {
  return (
    <img src={source} alt={text} />
  )
}

export default Images