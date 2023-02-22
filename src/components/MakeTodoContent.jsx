import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import BackArrow from '../icon/BackArrow.svg';
import "./Common.css";
import "./MakeTodoContent.css";
import moment from 'moment';
import 'moment/locale/ko';
import StartDate from '../icon/StartDate.svg';
import EndDate from '../icon/EndDate.svg';
import Cancel from '../icon/Cancel.svg';
import { createTodoContent } from '../api/todosApi';
import { useQuery, useMutation} from "react-query";
import axios from "axios";
import { useSelector } from 'react-redux';

const MakeTodoContent = () => {

  const params = useParams();
  const navigate = useNavigate();
  const todoInfo = useRef([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const spaceid = useSelector(state => state.space.id);

  const goBack = () => {
    navigate(-1);
  };

  const changeDate = e => {
    setStartDate(moment(e[0]).format("YYYY-MM-DD"));
    setEndDate(moment(e[1]).format("YYYY-MM-DD"));
  }

  const showModal = () => {
    setModalShow(true);
    // parentBackGround.current.style="background:#191919 ";
    // todoInfo.current[0].style ="background:#191919";
    // todoInfo.current[1].style ="background:#191919";
    // submitBtn.current.style="background:#191919";
  }

  const closeModal = () => {
    setModalShow(false);
  }

  function todoInfoSumbit(event) {
    event.preventDefault();
    // console.log(todoInfo.current[0].value, todoInfo.current[1].value, startDate, endDate);
    // todoInfo.current[0].value="";
    // todoInfo.current[1].value="";
    // navigate(-1);
    createMutation.mutate({ title : todoInfo?.current[0]?.value, content : todoInfo?.current[1]?.value, startdate : startDate, enddate : endDate,  spaceid : spaceid, statename : params?.state})
  }

  const createMutation = useMutation(createTodoContent, {
    onSuccess: () => {
      navigate(-1);
    }
  })

  // if(isError) {
  //   return error;
  // }

  return (
    <div className="todo-container">
        <div><img src={BackArrow} alt="이미지없음" onClick={goBack}/></div>
        <h3>{params.state}</h3>
        <input  type="text" 
                ref={el => (todoInfo.current[0] = el)} 
                placeholder="제목"
                className="content"/>
        { modalShow && 
        <div className="calendar">
            <div className="cancel" onClick={closeModal}><img src={Cancel} alt="이미지 없음"/></div>
            <Calendar  
                    onChange={changeDate} 
                    formatDay={(locale, date) => moment(date).format("DD")} 
                    selectRange={true}
                    // ref={modal}
                    />
        </div>
        }      
        {/* <p onClick={() => setStartClick((pre) => !pre)}>시작일 : {startDate?.current?.value}</p> */}

        <label className="date-container" onClick={showModal}><img src={StartDate} alt="이미지 없음"/>시작일 
            <input
              className="calendar-date"
              type="text"
              placeholder='시작일'
              value={ startDate || ""}
              disabled
            />
        </label>
        
        <label className="date-container" onClick={showModal}><img src={EndDate} alt="이미지 없음"/>마감일 
            <input
              className="calendar-date"
              type="text"
              placeholder='마감일'
              // value={ endDate?.toLocaleDateString('ko', { dateStyle : 'full'}) || ""}
              value={ endDate || ""}
              disabled
            />
          </label>
          <textarea className="content"
                ref={el => (todoInfo.current[1] = el)}
                placeholder="내용" 
                rows="10"/>
        {/* { startClick && <Calendar onChange={setStartDate} /> }
        <Calendar onChange={changeDate} 
                  selectRange={true}/>
        <p onClick={() => setEndClick((pre) => !pre)}>마감일 : {endDate?.current?.value}</p> 
        { endClick && <Calendar onChange={() => setEndClick((pre) => !pre)} />  }   
        { endClick && <Calendar onChange={setEndDate} />  }    */}
        {/* {
          moment("2023년 2월 11일 00시 16분 44초", "YYYY년 MM월 DD일 HH시 mm분 ss초").fromNow()
        }  */}
        <button onClick={todoInfoSumbit} className="submit-btn">제출하기</button>
    </div>
  )
}

export default MakeTodoContent