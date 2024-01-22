import React from 'react'
import "./sidebar.scss";
import userImg from '../../assets/images/user.jpg';
import { AiOutlineLogout } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

const SideBer = () => {
  return (
    <div className='sideBar_box'>
        <div className='sidebar_img_part'>
            <div className="sidebar_img">
                <img src={userImg} alt="Img Not Found" />
            </div>
            <h3>Modabbir Hossen</h3>
        </div>
        <div>
            <ul className='navigation_part'>
                <li>
                    <NavLink to="/home">
                        <IoHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/message">
                        <IoChatbubbleEllipsesOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notification">
                        <IoNotifications />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="settings">
                        <IoSettingsSharp />
                    </NavLink>
                </li>
            </ul>
        </div>

        <div className='user_login'>
            <Link to="loginout">
                <AiOutlineLogout />
            </Link>
        </div>
    </div>
  )
}

export default SideBer