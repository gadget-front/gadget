import React from 'react'
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="login-info">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeg33aeCVARcEW5HMSbefEFHAzyuyHRxNezg&usqp=CAU" alt="이미지 없음" />
        <p>관리자</p>
        <button className="loginout-btn">로그아웃</button>
      </div>
    </header>
  )
}
