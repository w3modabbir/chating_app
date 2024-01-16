import React from 'react'
import GoogleImg from '../../../public/google.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../componants/SectionHeading';
import Input from '../../componants/Input';
import CustomBtn from '../../componants/CustomBtn';
import AuthNavigate from '../../componants/AuthNavigate';
import './login.scss'
import Images from '../../utilities/Images';
import LoginImages from "../../assets/images/login_img.jpg"
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useState } from 'react';
import { LiaEyeSolid } from "react-icons/lia";
import { Modal} from '@mui/material';
import { RxCross1 } from "react-icons/rx";

const Login = () => {
  let [showPass,  setShowPass] = useState(false)

  let handleShowPass = () =>{
    setShowPass((prevShowPass) => !prevShowPass);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModleClose = () => {
    setOpen(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 5,
  };
  return (
    <>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className="login_txt_main">
              <div className='login_item'>
                  <SectionHeading style="auth_heading" text="Login to your account!"/>
                  <div className='provider_login'>
                    <img src={GoogleImg}/>
                    <span>Login with Google</span>
                  </div>
                  <div className='from_main'>
                    <div>
                      <Input name="email" type="email" variant="standard" lebelTxt="Email Adress" style="login_input_filed" placeholder="Your Email"/>
                    </div>
                    <div>
                      <Input name="password" type={showPass ? "text" : "password"} variant="standard" lebelTxt="Password" style="login_input_filed" placeholder="Enter your password"/>
                      <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                      </button>
                    </div>
                    <CustomBtn styling="submitBtn" variant="Contained" text="Login to Continue"/>
                  </div>
                  <div>
                    <AuthNavigate style="sign_txt" link="/registration" linktext="Sign up" text="Don’t have an account ?"/>
                    <p onClick={handleOpen} className='forgat_pass'>
                      Forgotten password?
                    </p>
                  </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="login_imgbox">
              <div>
                <Images style="login_img" source={LoginImages} alt="Image Not Found"/>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='forgat_pass'>
              <button className='forgat_iconbtn' onClick={handleModleClose}><RxCross1 /></button>
              <h2>Find Your Account</h2>
              <Input type="email" variant="standard" lebelTxt="Email Adress"/>
              <CustomBtn styling="forgatbtn"   text="Send Link" variant="Contained"/>
            </div>
          </Box>
      </Modal>

    </>
  )
}

export default Login