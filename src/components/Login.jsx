import React from 'react'
import "./login.css";
import Robot from '../icon/Robot.svg';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h3>로그인</h3>
      <img src={Robot} alt="이미지없음" />
      <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse.credential);
            let decoded = jwt_decode(credentialResponse.credential);
            console.log(decoded);
            sessionStorage.setItem("Authorization", decoded.email);
            sessionStorage.setItem("name", decoded.name);
            sessionStorage.setItem("picture", decoded.picture);
            navigate("/");
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        /> 
        {/* <button onClick={() => googleLogout()}> 
           Log-out
        </button> */}
    </div>
  )
}

export default Login