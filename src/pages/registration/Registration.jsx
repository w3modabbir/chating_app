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

const Registration = () => {
  let [showPass,  setShowPass] = useState(false)

  let handleShowPass = () =>{
    setShowPass((prevShowPass) => !prevShowPass);
  }
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
                    <Input name="email" type="email" variant="outlined" lebelTxt="Email Adress" style="register_input_filed" placeholder="Your Email"/>
                  </div>
                  <div>
                    <Input name="email" type="email" variant="outlined" lebelTxt="Full Name" style="register_input_filed" placeholder="Enter Your Name"/>
                  </div>
                  <div>
                    <Input name="password" type={showPass ? "text" : "password"} variant="outlined" lebelTxt="Password" style="register_input_filed" placeholder="Enter your password"/>

                    <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                    </button>
                  </div>
                  <CustomBtn styling="submitBtn" variant="Contained" text="Sign up"/>
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