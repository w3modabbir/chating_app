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
import { getAuth, signInWithEmailAndPassword, signOut   } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
// ======== Login Validation Part Start ==========//
let userName = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;

let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  let passwordFormat = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  
  const [passwordError, setPasswordError] = useState("");
  
  let [error, setError] = useState({
    email: "",
    password: ""
  });
  let [loginData, setLoginData] = useState({
    email: "",
    fullName: "",
    password: ""
  });
  
  let handlLogineform = (e) =>{
    let {name, value} = e.target
    setLoginData({
      ...loginData,[name]:value
    })
  }
  
  let handleSubmit = (e) =>{
    e.preventDefault()
    if(!loginData.email){
      setError({email: "Please enter your email"})
    }else if(!loginData.email.match(emailFormat)){
      setError({email: "Invalid email address"})
    }else if(!loginData.password){
      setError({password: "Please Your Password"})
    }else if(!loginData.password.match(passwordFormat)){
      setError({password: "Invalid email address"})
    }else if(loginData.password.length < 8 || loginData.password.length > 20) {
      setPasswordError( "Password must be between 8 and 20 characters.");
    }
    else{
      signInWithEmailAndPassword(auth, loginData.email, loginData.password).then((userCredential)=>{
        if(userCredential.user.emailVerified){
          navigate("/home")
        }else{
          signOut(auth).then(()=>{
            console.log("pleass verify your email");
            console.log("logout done");

          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/invalid-credential"){
          setError({email: "Email or Password Wrong"})
        }else{
          setError({email: ""})
        }

      });
      setError({
        email: "",
        fullName: "",
        password: ""
      })
      setPasswordError("");
    }
  }
  // ======== Login Validation Part End ==========//

//======== Password Icon Show part start ========//

let [showPass,  setShowPass] = useState(false)

let handleShowPass = (e) =>{
  e.preventDefault()
  setShowPass((prevShowPass) => !prevShowPass);
}

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const handleModleClose = () => {
  setOpen(false);
}
//======== Password Icon Show part end ========//


  //======== Forgat Part Validation start ==========//
  let [forgaFormtData , setForgaFormtData] = useState({
    forgetemail: "",
  })
  let [forgaFormtError, setForgaFormtError] = useState({
    forgetemail: "",
  })
  
  let handleForgetData = (e) =>{
    let {name, value} = e.target
    setForgaFormtData({
      ...forgaFormtData,[name]:value
    })
  }
  let handleForgetSubmit = (e) =>{
    e.preventDefault()
    if(!forgaFormtData.forgetemail){
      setForgaFormtError({forgetemail: "Please enter your email"})
    }
    else if(!forgaFormtData.forgetemail.match(emailFormat)){
      setForgaFormtError({forgetemail: "Invalid email address"})
    }
    else{
      setForgaFormtError({
        forgetemail: "",
      })
      console.log(forgaFormtData);
    }
  }
//======== Forgat Part Validation End ==========//

//======== forgat part MUI style part ==========//
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
                 <form action='#' method='post'>
                 <div className='from_main'>
                    <div>
                      <Input onChange={handlLogineform} name="email" type="email" variant="standard" lebelTxt="Email Adress" style="login_input_filed" placeholder="Your Email"/>
                      {error.email &&
                        <p className='error'>{error.email}</p>
                      }
                    </div>
                    <div>
                      <Input onChange={handlLogineform} name="password" type={showPass ? "text" : "password"} variant="standard" lebelTxt="Password" style="login_input_filed" placeholder="Enter your password" autocomplete="current-password" value={loginData.password}/>
                      <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                      </button>
                      {error.password &&
                        <p className='error'>{error.password}</p>
                      }
                      {passwordError.password && 
                      <div style={{ color: 'red' }}>{passwordError}</div>
                      }
                    </div>
                    <CustomBtn onClick={handleSubmit} styling="submitBtn" variant="Contained" text="Login to Continue"/>
                  </div>
                 </form>
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
              <div>
                <Input onChange={handleForgetData}  type="email" variant="standard" name="forgetemail"  lebelTxt="Email Adress"/>
                {forgaFormtError.forgetemail &&
                   <p className='error'>{forgaFormtError.forgetemail}</p>  
                }
              </div>
              <CustomBtn  onClick={handleForgetSubmit} styling="forgatbtn"   text="Send Link" variant="Contained"/>
            </div>
          </Box>
      </Modal>

    </>
  )
}

export default Login