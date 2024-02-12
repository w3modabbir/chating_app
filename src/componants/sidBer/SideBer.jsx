import React, { useEffect, useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/UserSlice';
import { Vortex } from 'react-loader-spinner'

const SideBer = () => {
    const data = useSelector((state) => state.loginuserdata.value)
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();
    const [loder, setLoder] = useState(false)
    let location = "http://localhost:5173"
    useEffect(()=>{
        if(!data){
            navigate("/")  
        }
        else{
             navigate("/home")   
        }
    },[data,navigate])
    // useEffect(()=>{
    //     if(data){
    //         navigate("/home")
    //     }
    // })
    // let [tostify, setTostify] = useState(false)
    let handleLogout = () =>{
        signOut(auth).then(()=>{
            localStorage.removeItem("user")
            dispatch(loginuser(null))
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
            setLoder(false) 
            navigate("/")
            
        })
    }

  return (
    <>
    {loder ?
         <Vortex
         visible={true}
         height="80"
         width="80"
         ariaLabel="vortex-loading"
         wrapperStyle={{}}
         wrapperClass="vortex-wrapper"
         colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
         />
         :
         <>
         <TostifyReact/>
        <div className='sideBar_box'>
        <div className='sidebar_img_part'>
            <div className="sidebar_img">
                <img src={data && data.photoURL} alt="Img Not Found" />
            </div>
            <h3 className='userName'>{data && data.displayName}</h3>
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
    }
       </>
  )
}

export default SideBer