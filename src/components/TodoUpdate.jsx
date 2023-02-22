import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTodoContent, updateTodoContent } from '../api/todosApi';
import BackArrow from '../icon/BackArrow.svg';
import "./MakeTodoContent.css";
import "./TodoUpdate.css";
import StartDate from '../icon/StartDate.svg';
import EndDate from '../icon/EndDate.svg';
import Cancel from '../icon/Cancel.svg';
import { createTodoContent } from '../api/todosApi';
import { useQuery, useMutation} from "react-query";
import moment from 'moment';
import Calendar from 'react-calendar';
import axios from "axios";
import { useSelector } from 'react-redux';

const TodoUpdate = () => {
  const todo = useParams();
  console.log(todo.contentId);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  // const modalShow = useRef(false);
  const todoInfo = useRef([]);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // const startDate = useRef(null);
  // const endDate = useRef(null);
  const [loading, setLoading] = useState(false);
  const [stateName, setStateName] = useState("");
  const spaceid = useSelector(state => state.space.id);
  // const {
  //         isSuccess,
  //         isLoading,
  //         isError,
  //         error,
  //         data, 
  //         refetch,
  //         } = useQuery(['todo', todo.contentId], getTodoContent,
  //           {
  //             onSuccess : () => {
  //               setStartDate(data?.data?.startdate);
  //               setEndDate(data?.data?.enddate);
  //               todoInfo.current[0] = data?.data?.title;
  //               todoInfo.current[1] = data?.data?.content;
  //             },
  //           }
  //         )

  let data = null;
   const dataFetch = async () => {
     try {
      data =  await axios.get(`/gadget/todos/todoContent/${todo.contentId}`);

      console.log(data);

      setStartDate(data?.data?.startdate);
      setEndDate(data?.data?.enddate);
      // setStateName(data?.data?.statename);
      // startDate.current = data?.data?.startdate;
      // endDate.current = data?.data?.enddate;

      // todoInfo.current[0] = data?.data?.title;
      // todoInfo.current[1] = data?.data?.content;

      setTitle(data?.data?.content);
      setContent(data?.data?.title);

     } catch (error) {
        console.log(error);
     } finally {
      setLoading(false);
      console.log( typeof todoInfo.current[0]);
      console.log(todoInfo.current[1]);
      console.log(data?.data?.statename);
      setStateName(data.data.statename);
      console.log({stateName});
     }
   }

   useEffect(()=> {
    if(!data) {
      console.log("refetch : " + !data);
      dataFetch()
    }
   }, []);

   const updateMutation = useMutation(updateTodoContent, {
    onSuccess: () => {
      navigate("/todo-list");
    },
    onError: (e) => {
      console.log(e);
    }
  })

  function todoInfoUpdate(event) {
    event.preventDefault();
    // console.log(todoInfo.current[0].value, todoInfo.current[1].value, startDate, endDate);
    // todoInfo.current[0].value="";
    // todoInfo.current[1].value="";
    // navigate(-1);

    //updateMutation.mutate({ title : todoInfo?.current[0]?.value, content : todoInfo?.current[1]?.value, startdate : startDate, enddate : endDate,  spaceid : 1, statename : stateName, contentid : todo.contentId})
    updateMutation.mutate({ title : title, content : content, startdate : startDate, enddate : endDate,  spaceid : spaceid, statename : stateName, contentid : todo.contentId})
  }
  
   if (loading) return <div>로딩중..</div>; 

  // if(isLoading) {
  //   return <h2>Loading...</h2>
  // }

  // if(isError) {
  //   return <h2>{error}</h2>
  // }

  // if(isSuccess) {
  //   console.log(data.data);
  // }
  

  const goBack = () => {
    navigate(-1);
  };

  const changeDate = e => {
    setStartDate(moment(e[0]).format("YYYY-MM-DD"));
    setEndDate(moment(e[1]).format("YYYY-MM-DD"));

    // startDate.current = moment(e[0]).format("YYYY-MM-DD");
    // endDate.current = moment(e[1]).format("YYYY-MM-DD");
  }

  const showModal = () => {
    setModalShow(true);
    // modalShow.current = true;
    // console.log(modalShow.current);
    // parentBackGround.current.style="background:#191919 ";
    // todoInfo.current[0].style ="background:#191919";
    // todoInfo.current[1].style ="background:#191919";
    // submitBtn.current.style="background:#191919";
  }

  const closeModal = () => {
    setModalShow(false);
    // modalShow.current = false;
  }

  const onChangeHanlder=(e)=>{
    setStateName(e.currentTarget.value)
  }
  
  const Options =[
      {key:1, value:"진행 예정"},
      {key:2, value:"진행 중"},
      {key:3, value:"완료"},
      {key:4, value:"삭제"},
  ]


  return (<>
   <div className="todo-container">
              <div><img src={BackArrow} alt="이미지없음" onClick={goBack}/></div>
              {/* <h3>{stateName}</h3> */}
              {!data &&
                <select className="select-status" onChange={onChangeHanlder} value={stateName}>
                  {!data && Options.map((item, index)=>(
                    <option key={item.key} 
                            // value={item.key}
                            defaultValue={item.value === stateName}>{item.value}</option>
                  ))}
                </select>
              }
              <input  type="text" 
                      // ref={el => (todoInfo.current[0] = el)} 
                      onChange = { (e) => setTitle(e.target.value) }
                      // placeholder="제목"
                      className="content"
                      // defaultValue={todoInfo.current[0] || ""}
                      defaultValue={title || ""}
                      />
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
              <label className="date-container" onClick={showModal}><img src={StartDate} alt="이미지 없음"/>시작일 
                  <input
                    className="calendar-date"
                    type="text"
                    // placeholder='시작일'
                    value={ startDate || ""}
                    // value={ startDate.current || ""}
                    disabled
                  />
              </label>
              
              <label className="date-container" onClick={showModal}><img src={EndDate} alt="이미지 없음"/>마감일 
                  <input
                    className="calendar-date"
                    type="text"
                    // placeholder='마감일'
                    // value={ endDate?.toLocaleDateString('ko', { dateStyle : 'full'}) || ""}
                    value={ endDate || ""}
                    // value={ endDate.current || ""}
                    disabled
                  />
                </label>
                <textarea className="content"
                      // ref={el => (todoInfo.current[1] = el)}
                      onChange = { (e) => setContent(e.target.value) }
                      // placeholder="내용" 
                      // defaultValue={todoInfo.current[1] || ""}
                      defaultValue={content || ""}
                      rows="10"/>
              <button onClick={todoInfoUpdate} className="submit-btn">제출하기</button>
            </div>
  </>)
  }

export default TodoUpdate