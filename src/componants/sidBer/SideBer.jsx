import React, { useState } from 'react'
import "./sidebar.scss";
import userImg from '../../assets/images/user.jpg';
import { AiOutlineLogout } from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { getAuth,  signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import TostifyReact from '../TostifyReact';
import { toast } from 'react-toastify';

const SideBer = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    // let [tostify, setTostify] = useState(false)
    let handleLogout = () =>{
        signOut(auth).then(()=>{
            setTimeout(() => {
                toast.success('Logout Success', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            },1000);
            navigate("/")
            
        })
    }


  return (
    <>
        <TostifyReact/>
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

        <button className='user_login' onClick={handleLogout}>
        <AiOutlineLogout />
        </button>
        </div>
    </>
  )
}

export default SideBer