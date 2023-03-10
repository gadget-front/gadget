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
    createMutation.mutate({ title : todoInfo?.current[0]?.value, content : todoInfo?.current[1]?.value, startdate : startDate, enddate : endDate,  spaceid : spaceid, statename : params?.state, userid: sessionStorage.getItem("userid")})
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
        <div><img src={BackArrow} alt="???????????????" onClick={goBack}/></div>
        <h3>{params.state}</h3>
        <input  type="text" 
                ref={el => (todoInfo.current[0] = el)} 
                placeholder="??????"
                className="content"/>
        { modalShow && 
        <div className="calendar">
            <div className="cancel" onClick={closeModal}><img src={Cancel} alt="????????? ??????"/></div>
            <Calendar  
                    onChange={changeDate} 
                    formatDay={(locale, date) => moment(date).format("DD")} 
                    selectRange={true}
                    // ref={modal}
                    />
        </div>
        }      
        {/* <p onClick={() => setStartClick((pre) => !pre)}>????????? : {startDate?.current?.value}</p> */}

        <label className="date-container" onClick={showModal}><img src={StartDate} alt="????????? ??????"/>????????? 
            <input
              className="calendar-date"
              type="text"
              placeholder='?????????'
              value={ startDate || ""}
              disabled
            />
        </label>
        
        <label className="date-container" onClick={showModal}><img src={EndDate} alt="????????? ??????"/>????????? 
            <input
              className="calendar-date"
              type="text"
              placeholder='?????????'
              // value={ endDate?.toLocaleDateString('ko', { dateStyle : 'full'}) || ""}
              value={ endDate || ""}
              disabled
            />
          </label>
          <textarea className="content"
                ref={el => (todoInfo.current[1] = el)}
                placeholder="??????" 
                rows="10"/>
        {/* { startClick && <Calendar onChange={setStartDate} /> }
        <Calendar onChange={changeDate} 
                  selectRange={true}/>
        <p onClick={() => setEndClick((pre) => !pre)}>????????? : {endDate?.current?.value}</p> 
        { endClick && <Calendar onChange={() => setEndClick((pre) => !pre)} />  }   
        { endClick && <Calendar onChange={setEndDate} />  }    */}
        {/* {
          moment("2023??? 2??? 11??? 00??? 16??? 44???", "YYYY??? MM??? DD??? HH??? mm??? ss???").fromNow()
        }  */}
        <button onClick={todoInfoSumbit} className="submit-btn">????????????</button>
    </div>
  )
}

export default MakeTodoContent