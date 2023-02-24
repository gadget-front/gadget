import React from 'react'
import Robot from '../icon/Robot.svg';
import './SideBar.css';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

  let spaceid = useSelector(state => state.space.id);
  const [side, setSide] = useState([]); 
  useEffect(() => {
    axios.get(`/gadget/workspace/${spaceid}/side`)
    .then((res) => {
      return setSide(res.data);
    });
  }, [spaceid]);

  const spaceName = useSelector(state => state.space.name);

  // useEffect(() => {
  //   console.log('spaceName : '+ spaceName);
  // }, [spaceName]);

  return (
    <aside className="side-bar">
      <NavLink to={"/main"} style={nonActiveStyle}>
        <div className="logo-container"> 
          <img src={Robot} alt="이미지없음" />
          <h3>가제트</h3>
        </div>
      </NavLink>
      <div className="group-side-container">
        <NavLink to={"/group"} style={nonActiveStyle}><h3 className="group-number">{spaceName}</h3></NavLink>
       { spaceName && <ul className="side-menu">
          <li>
            <NavLink to={"/todo-list"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>할일</NavLink>
          </li>
          {
            side.map((element, index) => {
              return(
                <li key={index}>
                  <NavLink to={`/board/${spaceid}/list/${element.bcodeid}`} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>{element.bcodename}</NavLink>
                </li>
              );
            })
          }
          <li>
             <NavLink to={"/chatting"} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>채팅</NavLink>
          </li>
          <li>
             <NavLink to={`/calender/${spaceid}`} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>캘린더</NavLink>
          </li>
          <li>
            <NavLink to={`/boardlist/${spaceid}`} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>게시판 추가</NavLink>
          </li>
          <li>
            <NavLink to={`/googleSpace`} style={({isActive}) => (isActive ? activeStyle : nonActiveStyle)}>자료공유실</NavLink>
          </li>
        </ul>}
      </div>
    </aside>
  )
}

export default SideBar