import React from 'react'

const Images = ({style, source, alt}) => {
  return (
    <img className={style} src={source} alt={alt}/>
  )
}

export default Images