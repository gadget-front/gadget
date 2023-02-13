import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export const Board = (props) => {
  let {spaceid} = useParams();
  let {bcodeid} = useParams();
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`/gadget/board/${spaceid}/list/${bcodeid}`)
    .then((res) => {
      let listdata = [...res.data];
      console.log(listdata);
      return setList(listdata);
    });
  },[bcodeid]);
  
  return(<div className='row'>
    <div className='col-12'>
    <button className='btn btn-outline-warning' onClick={()=>{navigate(`/gadget/board/${spaceid}/write/${bcodeid}`)}}>글쓰기</button>
    {list.map((element, index) => {
      return(
        <div className='card' key={index} >
          <div className='card-body'onClick={()=>{navigate(`/gadget/board/1/detail/${element.boardid}`)}}>
            <h3 className='card-title'>{element.title}</h3>
            <div className=''><p>{element.writer}({element.wdate}) <b>{element.repnum}</b></p></div>
          </div>
        </div>
      );
    })}
      
        
      
    </div>
    
  </div>);
};

export default Board;