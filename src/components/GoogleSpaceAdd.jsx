import React, { useRef } from 'react'
import './MakeTodoContent.css';
import './GoogleSpaceAdd.css';
import BackArrow from '../icon/BackArrow.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GoogleSpaceAdd = () => {

  const navigate = useNavigate();
  // const params = useParams();
  const spaceid = useSelector(state => state.space.id);

  // console.log(params.kind);

  const goBack = () => {
    navigate('/googleSpace');
  };

  const GoogleSpaceInfo = useRef([]);

  function GoogleSpaceSumbit(event) {
    event.preventDefault();

    const kind = (/^.com\/|document|drive|spreadsheets/).exec(GoogleSpaceInfo.current[1].value);
    console.log(kind[0]);
    const num = kind[0] === "drive" 
                ? 0 : kind[0] === "document" 
                ? 1 : kind[0] === "spreadsheets" 
                ? 2 : "error";


    console.log(GoogleSpaceInfo.current[0].value, GoogleSpaceInfo.current[1].value, num);

    axios.post(`/gadget/gspace/row` ,{gtitle : GoogleSpaceInfo.current[0].value, kind : num, url: GoogleSpaceInfo.current[1].value, spaceid :spaceid })
         .then((res) => {
            console.log(res);
            navigate('/googleSpace');
         })
         .catch((err)=> {
            console.log(err);
         })
  }

  return (
    <div className="google-space-add-container">
        <div><img src={BackArrow} alt="이미지없음" onClick={goBack}/></div>
        <div className="google-space-add-input">
          <label>제목</label>
          <input  type="text" 
                  ref={el => (GoogleSpaceInfo.current[0] = el)} 
                  placeholder="제목을 입력해주세요"
                  className="content"
                  required/>
        </div>
        <div className="google-space-add-input">
          <label>url</label>
          <input  type="text" 
                ref={el => (GoogleSpaceInfo.current[1] = el)} 
                placeholder="url을 입력해주세요"
                className="content"
                required/>     
        </div>   
          <button onClick={GoogleSpaceSumbit} className="submit-btn">제출하기</button>      
    </div>
  )
}

export default GoogleSpaceAdd