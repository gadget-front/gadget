import React, { useEffect, useState } from 'react'
import './Header.css';
import { googleLogout } from '@react-oauth/google';
import { Navigate, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  // const [email, setEmail]  = useState(sessionStorage.getItem("Authorization"));

  // useEffect(() => {
  //   googleLogout();
  //   sessionStorage.clear();
  //   Navigate("/login");
  // }, [email])

  const logout = () => 
    {
      console.log("logout 테스트");
      sessionStorage.clear();
      console.log(sessionStorage.getItem("Authorization"));
      navigate("/login"); 
    }

  return (
    <header className="header">
      <div className="login-info">
        {/* <img className="profile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeg33aeCVARcEW5HMSbefEFHAzyuyHRxNezg&usqp=CAU" alt="이미지 없음" /> */}
        <img className="profile" src={sessionStorage.getItem("picture")} alt="이미지 없음" />
        <p>{sessionStorage.getItem("name")}</p>
        <button className="loginout-btn" onClick={logout}>로그아웃</button>
      </div>
    </header>
  )
}
