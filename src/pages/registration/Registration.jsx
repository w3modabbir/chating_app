import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./registration.scss"
import SectionHeading from '../../componants/SectionHeading';
import Input from '../../componants/Input';
import CustomBtn from '../../componants/CustomBtn';
import AuthNavigate from '../../componants/AuthNavigate';
import Images from '../../utilities/Images';
import RegisterImg from "../../assets/images/register_img.jpg"
import PeraGrap from '../../componants/PeraGrap';

const Registration = () => {
  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <div className="login_txt_main">
            <div className='login_item'>
                <SectionHeading style="auth_heading" text="Get started with easily register"/>
                <PeraGrap style="peragrap" text="Free register and you can enjoy it"/>
                <div className='from_main'>
                  <div>
                    <Input name="email" type="email" variant="outlined" lebelTxt="Email Adress" style="login_input_filed" placeholder="Your Email"/>
                  </div>
                  <div>
                    <Input name="email" type="email" variant="outlined" lebelTxt="Full Name" style="login_input_filed" placeholder="Enter Your Name"/>
                  </div>
                  <div>
                    <Input name="password" type="password" variant="outlined" lebelTxt="Password" style="login_input_filed" placeholder="Enter your password"/>
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
          <div className="login_imgbox">
            <div>
              <Images style="login_img" source={RegisterImg} alt="Image Not Found"/>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Registration