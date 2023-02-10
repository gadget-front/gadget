import React, { useEffect, useState } from 'react'
import { event } from "jquery";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Board = (props) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    axios.get(`gadget/board/1/list/2`)
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
        <div key={index} onClick={()=>{navigate(`/detail/${props.shirts.id}`)}}>
          <h3>{element.title}</h3>
          <input type="text" value={element.boardid} hidden/>
          <p>{element.writer}({element.wdate}) <b>{element.repnum}</b></p>
          <hr/>
        </div>
      );
    })}
  </div>);
};

export default Board;