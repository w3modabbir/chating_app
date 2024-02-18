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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


// Modal style Profile photo
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SideBer = () => {
    const data = useSelector((state) => state.loginuserdata.value)
    const navigate = useNavigate();
    const auth = getAuth();
    const dispatch = useDispatch();
    const [loder, setLoder] = useState(false)

    // modal operation 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleModleClose = () => {
        setOpen(false);
      }
    
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
    {/* Profile Photo Modal start */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className='propile_modal'>
                    <button className='forgat_iconbtn' onClick={handleModleClose}><RxCross1 /></button>
                    <h2 className='profile_heading'>Upload Profile Photo</h2>
                    <div className='profile_photo'>
                        <img src={data && data.photoURL} alt="Img Not Found" />
                    </div>
                    <input type="file" />
                </div>
            </Box>
        </Modal>
    {/* Profile Photo Modal end */}
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
                <div className="sider_img_overlay" onClick={handleOpen}>
                    <IoCloudUploadOutline />
                </div>
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