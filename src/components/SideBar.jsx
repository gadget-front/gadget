import React from 'react'
import Robot from '../icon/Robot.svg';
import './SideBar.css';
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {
  const activeStyle = {
    color: 'black',
    fontSize: 18,
    fontWeight : 'bold',
    borderLeft: "5px solid #486384",
    padding: '0.25rem 0.5rem'
  };

  const nonActiveStyle = {
    color: 'black'
  };

  return (
    <aside className="side-bar">
      <div className="logo-container"> 
        <img src={Robot} alt="이미지없음" />
        <h3>가제트</h3>
      </div>
      <div className="group-side-container">
        <h3 className="group-number">그룹1</h3>
        <ul className="side-menu">
          {/* <li>
            <Link to="/todo-list">할일</Link>
          </li>
          <li>
            <Link to="/board">게시판</Link>
          </li>
          <li>
             <Link to="/chatting">채팅</Link>
          </li>
          <li>
             <Link to="/calender">캘린더</Link>
          </li> */}
          <li>
            <NavLink to={"/todo-list"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>할일</NavLink>
          </li>
          <li>
            <NavLink to={"/board"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>게시판</NavLink>
          </li>
          <li>
             <NavLink to={"/chatting"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>채팅</NavLink>
          </li>
          <li>
             <NavLink to={"/calender"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>캘린더</NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar