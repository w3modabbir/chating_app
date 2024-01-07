import React from 'react'
import './login.css'
import loginImg from '../../assets/images/login_img.png'

const Login = () => {
  return (
    <div className="login_page">
      <div className="login_main">
        <div className="login_text">
          <h2>Login to your account!</h2>
        </div>
        <div className="login_img">
          <picture>
            <img src={loginImg} alt="img not pound" />
          </picture>
        </div>
      </div>
    </div>
  )
}

export default Login