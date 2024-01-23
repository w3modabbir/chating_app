import React from 'react'
import { CiSearch } from "react-icons/ci";
import { BiDotsVerticalRounded } from "react-icons/bi";
import './searchbar.scss'
const SearchBar = () => {
  return (
    <div className='search_main'>
        <div className='search_item'>
            <div>
                <CiSearch/> 
            </div>
            <div className='search_icon_txt'>
                <div>
                    <h3>search</h3>
                </div>
                <div className='group_dots'>
                <BiDotsVerticalRounded />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchBar