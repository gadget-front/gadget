import React, { useEffect, useState } from 'react'
import { event } from "jquery";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export const Board = (props) => {
  let spaceid = 1;
  let {bcodeid} = useParams();
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(`${spaceid}/list/${bcodeid}`)
    .then((res) => {
      let listdata = [...res.data];
      console.log(listdata);
      return setList(listdata);
    });
  }, []);
  let navigate = useNavigate();
  
  return(<div>
    <h1>board list</h1>
    <hr/>
    {list.map((element, index) => {
      return(
        <div key={index} onClick={()=>{navigate(`/gadget/board/1/detail/${element.boardid}`)}}>
          <h3>{element.title}</h3>
          <p>{element.writer}({element.wdate}) <b>{element.repnum}</b></p>
          <hr/>
        </div>
      );
    })}
  </div>);
};

export default Board;