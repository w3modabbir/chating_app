import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./registration.scss"
import SectionHeading from '../../componants/SectionHeading';
import Input from '../../componants/Input';
import CustomBtn from '../../componants/CustomBtn';
import AuthNavigate from '../../componants/AuthNavigate';
import Images from '../../utilities/Images';
import RegisterImg from "../../assets/images/register_img.jpg"
import PeraGrap from '../../componants/PeraGrap';
import { HiMiniEyeSlash } from "react-icons/hi2";
import { LiaEyeSolid } from "react-icons/lia";
import { Alert } from '@mui/material';

const Registration = () => {
  //* password shwo usestate start
  let [showPass,  setShowPass] = useState(false)
  
  let handleShowPass = () =>{
    setShowPass((prevShowPass) => !prevShowPass);
  }
  //* password shwo usestate start
  
  //* registerdata validation start
  let userName = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
  
  let emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  
  let passwordFormat = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

  let [error, setError] = useState({
    email: "",
    fullName: "",
    password: ""
  })
  // let [passwordLengthError, setPasswordLengthError] = useState('');
  
  let [registerData, setRegisterData] = useState({
    email: "",
    fullName: "",
    password: ""
  })
  
  let handleForm = (e) =>{
    let {name, value} = e.target
    setRegisterData({
      ...registerData,[name]:value
    })
  }
  
  let handleSubmit = () => {
    if(!registerData.email){
        setError({email: "Please enter your email"})
    }else if(!registerData.email.match(emailFormat)){
      setError({email: "Invalid email address"})
    }
    else if(!registerData.fullName){
      setError({fullName: "Your Name"})
    }else if(!registerData.password){
      setError({password: "Please Your Password"})
    }else if(!registerData.password.match(passwordFormat)){
      setError({password: "Please Enter Your Password"})
    }
    // else if (!registerData.password.length < 8 || registerData.password.length > 20){
    //   setPasswordLengthError("Password must be between 8 and 20 characters.")
    //   setError({password: ""})
    // }
    else{
      setError({
        email: "",
        fullName: "",
        password: ""
      })
      // setPasswordLengthError('');
      console.log(registerData);
    }
  }
  //* registerdata validation start
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="register_txt_main">
            <div className='register_item'>
                <SectionHeading style="auth_heading" text="Get started with easily register"/>
                <PeraGrap style="peragrap" text="Free register and you can enjoy it"/>
                <form>
                <div className='from_main'>
                  <div>
                    <Input onChange={handleForm} name="email" type="email" variant="outlined" lebelTxt="Email Adress" style="register_input_filed" placeholder="Your Email"/>
                    {error.email &&
                     <p className='error'>{error.email}</p>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="fullName" type="text" variant="outlined" lebelTxt="Full Name" style="register_input_filed" placeholder="Enter Your Name"/>
                    {error.fullName &&
                      <p className='error'>{error.fullName}</p>
                    }
                  </div>
                  <div>
                    <Input onChange={handleForm} name="password" type={showPass ? "text" : "password"} variant="outlined" lebelTxt="Password" style="register_input_filed" placeholder="Enter your password" autocomplete="current-password" />
                    {error.password &&
                      <p className='error'>{error.password}</p>
                    }

                    <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                    </button>
                  </div>
                  <CustomBtn onClick={handleSubmit} styling="submitBtn" variant="Contained" text="Sign up"/>
                </div>
                </form>
                <div>
                  <AuthNavigate style="sign_txt" link="/" linktext="Sign In" text="Already  have an account ? "/>
                </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="register_imgbox">
            <div>
              <Images style="register_img" source={RegisterImg} alt="Image Not Found"/>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Registration