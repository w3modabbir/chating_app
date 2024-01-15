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


const Login = () => {
  return (
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
                  <Input name="password" type="password" variant="standard" lebelTxt="Password" style="login_input_filed" placeholder="Enter your password"/>
                </div>
                <CustomBtn styling="submitBtn" variant="Contained" text="Login to Continue"/>
              </div>
              <div>
                <AuthNavigate style="sign_txt" link="/registration" linktext="Sign up" text="Don’t have an account ?"/>
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
  )
}

export default Login