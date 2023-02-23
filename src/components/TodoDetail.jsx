import React from 'react'
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTodoContent } from '../api/todosApi';
import BackArrow from '../icon/BackArrow.svg';
import "./Common.css";
import StartDate from '../icon/StartDate.svg';
import EndDate from '../icon/EndDate.svg';
import Cancel from '../icon/Cancel.svg';
import "./MakeTodoContent.css";
import moment from 'moment';
import 'moment/locale/ko';
import Calendar from 'react-calendar';


function TodoDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/todo-list');
  };

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    data, 
    } = useQuery(['todo', params.contentId], getTodoContent,
     {
        
     }
    )

  if(isLoading) {
    return <h2>Loading...</h2>
  }

  if(isError) {
    return <h2>{error}</h2>
  }

  if(isSuccess) {
    console.log(data.data);
  }

 const contentId = params.contentId;
//  const contentId = JSON.stringify(data.data);

  function todoUpdatePage() {
    navigate(`/todo-update/${contentId}`)
  }

  return (
    <div className="todo-container">
    <div className="todo-detail-top">
      <img src={BackArrow} alt="이미지없음" onClick={goBack}/>
      {(data.data.userid === sessionStorage.getItem("userid")) && <p className='sub-text' onClick={todoUpdatePage}>수정</p>}
    </div>
    <h3>{params.state}</h3>
    <div className='todo-detail-middle'>
      <div className='profile-todo'>
        <img className="profile" src={data.data.imgurl} alt="이미지 없음" />
        <p>{data.data.username}</p>
      </div>
      <p className='sub-text'>{ moment(data.data.wdate, "YYYY-MM-DD HH:mm:ss").fromNow() }</p> 
    </div>
    {/* <input  type="text" 
            value={data.data.title} 
            disabled
            className="content"/> */}
    <h3>{data.data.title}</h3>        
    {/* { modalShow && 
    <div className="calendar">
        <div className="cancel" onClick={closeModal}><img src={Cancel} alt="이미지 없음"/></div>
        <Calendar  
                onChange={changeDate} 
                formatDay={(locale, date) => moment(date).format("DD")} 
                selectRange={true}
                // ref={modal}
                />
    </div>
    }       */}
    {/* <p onClick={() => setStartClick((pre) => !pre)}>시작일 : {startDate?.current?.value}</p> */}

    <label className="date-container"><img src={StartDate} alt="이미지 없음"/>시작일 
        <input
          className="calendar-date"
          type="text"
          placeholder='시작일'
          value={ data.data.startdate || ""}
          disabled
        />
    </label>
    
    <label className="date-container"><img src={EndDate} alt="이미지 없음"/>마감일 
        <input
          className="calendar-date"
          type="text"
          placeholder='마감일'
          // value={ endDate?.toLocaleDateString('ko', { dateStyle : 'full'}) || ""}
          value={ data.data.enddate || ""}
          disabled
        />
      </label>
      <hr/>
      <textarea className="detail-content"
            // ref={el => (todoInfo.current[1] = el)}
            value={data.data.content}
            disabled
            // placeholder="내용" 
            rows="10"/>    
    {/* <button onClick={todoInfoSumbit} className="submit-btn">제출하기</button> */}
</div>
  )
}

export default TodoDetail


{/* <div className="todo-container">
<img src={BackArrow} alt="이미지없음" onClick={goBack}/>
 <div keys={params.contentId}>
   {data.data.statename} <br/>
   {data.data.wdate} <br/>
   {data.data.title} <br/>
   {data.data.content} <br/>
   {data.data.startdate} <br/>
   {data.data.enddate} <br/>
 </div>
</div> */}