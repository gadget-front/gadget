import React from 'react'
import "./login.css";
import Robot from '../icon/Robot.svg';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../api/todosApi';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h3>로그인</h3>
      <img src={Robot} alt="이미지없음" />
      <GoogleLogin
          onSuccess={credentialResponse => {
            login(credentialResponse.credential).then((info) => {
              sessionStorage.setItem("email", info.data.email);
              sessionStorage.setItem("name", info.data.username);
              sessionStorage.setItem("picture", info.data.imgurl);
              sessionStorage.setItem("userid", info.data.userid);

              navigate("/group");
            })
            
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