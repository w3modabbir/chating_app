import React from 'react'
import './groupcard.scss'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const GroupCard = ({children, cardtitle}) => {
  return (
    <div className='groupcard'>
        <div className='group_heading'>
            <h4>{cardtitle} </h4>
            <div className='group_dots'>
            <IoChatbubbleEllipsesOutline />
            </div>
        </div>
        {children}
    </div>
  )
}

export default GroupCard