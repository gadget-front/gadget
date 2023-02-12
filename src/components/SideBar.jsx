import React from 'react'
import Robot from '../icon/Robot.svg';
import './SideBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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

  let spaceid = 1;
  const [side, setSide] = useState([]); 
  useEffect(() => {
    axios.get(`/gadget/workspace/${spaceid}/side`)
    .then((res) => {
      console.log(res.data);
      return setSide(res.data);
    });
  }, []);

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
          {
            side.map((element, index) => {
              return(
                <li key={index}>
                  <NavLink to={`/gadget/board/${element.bcodeid}`} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>{element.bcodename}</NavLink>
                </li>
              );
            })
          }
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