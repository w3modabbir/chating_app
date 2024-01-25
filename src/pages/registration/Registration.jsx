import React, { useReducer, useState } from 'react'
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
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { Audio, Vortex } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [loder, setLoder] = useState(false)
  //* password shwo usestate start
  let [showPass,  setShowPass] = useState(false)
  
  let handleShowPass = (e) =>{
    e.preventDefault()
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
      setLoder(true)
      setError({
        email: "",
        fullName: "",
        password: ""
      })
      createUserWithEmailAndPassword(auth, registerData.email, registerData.password).then((userCredential)=>{
        sendEmailVerification(auth.currentUser).then(()=>{
          navigate("/")
        })
        setRegisterData({
          email: "",
          fullName: "",
          password: ""
        })
      }).catch((error) =>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/email-already-in-use"){
          setError({email: "email allready exist"})
        }else{
          setError({email: ""})
        }

      })
      setTimeout(() => {
        setLoder(false) 
      }, 2000);

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
                    <Input value={registerData.email} onChange={handleForm}  name="email" type="email" variant="outlined" lebelTxt="Email Adress" style="register_input_filed" placeholder="Your Email"/>
                    {error.email &&
                     <p className='error'>{error.email}</p>
                    }
                  </div>
                  <div>
                    <Input value={registerData.fullName} onChange={handleForm}   name="fullName" type="text" variant="outlined" lebelTxt="Full Name" style="register_input_filed" placeholder="Enter Your Name" />
                    {error.fullName &&
                      <p className='error'>{error.fullName}</p>
                    }
                  </div>
                  <div>
                    <Input value={registerData.password}  onChange={handleForm} name="password" type={showPass ? "text" : "password"} variant="outlined" lebelTxt="Password" style="register_input_filed" placeholder="Enter your password" autocomplete="current-password"/>
                    {error.password &&
                      <p className='error'>{error.password}</p>
                    }

                    <button className='pass_btn' onClick={handleShowPass}>{showPass ? <LiaEyeSolid /> : <HiMiniEyeSlash />}
                    </button>
                  </div>
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
                      <CustomBtn onClick={handleSubmit} styling="submitBtn" variant="Contained" text="Sign up"/>
                    }
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