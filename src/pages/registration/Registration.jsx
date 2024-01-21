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
  let [error, setError] = useState({
    email: "",
    fullName: "",
    password: ""
  })
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
        setError({email: "email nai"})
    }else if(!registerData.fullName){
      setError({fullName: "name nai"})
    }else if(!registerData.password){
      setError({password: "pass nai"})
    }
    else{
      setError({
        email: "",
        fullName: "",
        password: ""
      })
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
                    <Input onChange={handleForm} name="password" type={showPass ? "text" : "password"} variant="outlined" lebelTxt="Password" style="register_input_filed" placeholder="Enter your password"/>
                    {error.password &&
                      <p className='error'>{error.password}</p>
                    }

                    <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                    </button>
                  </div>
                  <CustomBtn onClick={handleSubmit} styling="submitBtn" variant="Contained" text="Sign up"/>
                </div>
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