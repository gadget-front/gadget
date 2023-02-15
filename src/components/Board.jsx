import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

export const Board = () => {
  const [pageNum, setPageNum] = useState(1);
  let {spaceid} = useParams();
  let {bcodeid} = useParams();
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  const [page, setPage] = useState(0);//총 게시물 수
  const [prev, setPrev] = useState(false);//이전버튼 여부
  const [next, setNext] = useState(false);//다음버튼 여부
  const [endPage, setEndPage] = useState(0);//페이지 끝번호(10, 20, 30...)
  const [startPage, setStartPage] = useState(0);//시작 페이지 번호(1, 11, 21..)
  const [realEnd, setRealEnd] = useState(0);//마지막 페이지 번호

  useEffect(() => {
    axios.get(`/gadget/board/${spaceid}/list/${bcodeid}?pageNum=${pageNum}`)
    .then((res) => {
      setList([...res.data]);
      
    });
    //총 게시물 수
    axios.get(`/gadget/board/count?bcodeid=${bcodeid}`)
    .then((res)=>{
      setEndPage(Math.ceil(pageNum/10)*10);
      setStartPage((Math.ceil(pageNum/10)*10)-9);
      setPage(res.data);
      setRealEnd(Math.ceil(res.data/10));
      if(realEnd < endPage){
        setEndPage(realEnd);
      }
      setPrev((startPage > 1)? true: false);
      setNext((endPage < realEnd) ? true: false); 
    });
  },[bcodeid, pageNum, page, realEnd]);

  function pagenate(startPage, endPage){
    let arr = [];
    for(let i = startPage; i <= endPage; i++){
      arr.push(i);
    }
    return arr;
  }
  
  return(<div className='row'>
    <div className='col-12'>
    <div className='text-right'>
      <button className='btn btn-outline-warning' onClick={()=>{navigate(`/gadget/board/${spaceid}/write/${bcodeid}`)}}>글쓰기</button>
    </div>
    {list.map((element, index) => {
      return(
        <div className='card' key={index} >
          <div className='card-body'onClick={()=>{navigate(`/gadget/board/1/detail/${element.boardid}`)}}>
            <h3 className='card-title'>{element.title} <span className='badge badge-secondary'>{element.repnum}</span></h3>
            <div className='text-right'><p>{element.writer}({element.wdate}) </p></div>
          </div>
        </div>
      );
    })}
    총 게시물 수: {page}
    <br/>
      <div className='text-right'>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-secondary" onClick={()=>{
            setPageNum(startPage-1);
            navigate(`/gadget/board/${spaceid}/list/${bcodeid}?pageNum=${startPage-1}`)}} disabled={!prev}>prev</button>
          {pagenate(startPage, endPage).map((e,i)=>{
            return(<button key={i} className="btn btn-secondary" onClick={()=>{
              setPageNum(e);
              navigate(`/gadget/board/${spaceid}/list/${bcodeid}?pageNum=${e}`)}} disabled ={pageNum===e}>{e}</button>);
          })}
          <button type="button" className="btn btn-secondary" onClick={()=>{
            setPageNum(endPage+1);
            navigate(`/gadget/board/${spaceid}/list/${bcodeid}?pageNum=${endPage+1}`)}} disabled ={!next}>next</button>
        </div>
      </div>
    </div>
  </div>);
};


export default Board;