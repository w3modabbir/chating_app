import React from 'react'
import './groupcard.scss'
import { BiDotsVerticalRounded } from "react-icons/bi";
import SearchBar from '../searchBar/SearchBar';

const GroupCard = ({children, cardtitle}) => {
  return (
    <>
      <div className='groupcard'>
            <div className='group_heading'>
                <h4>{cardtitle} </h4>
                <div className='group_dots'>
                <BiDotsVerticalRounded />
                </div>
            </div>
            {children}
      </div>
    </>
  )
}

export default GroupCard