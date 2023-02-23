import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

export const Board = () => {
  const [pageNum, setPageNum] = useState(1);
  const { spaceid, bcodeid } = useParams();
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  const [page, setPage] = useState(0);//총 게시물 수
  const [prev, setPrev] = useState(false);//이전버튼 여부
  const [next, setNext] = useState(false);//다음버튼 여부
  const [endPage, setEndPage] = useState(0);//페이지 끝번호(10, 20, 30...)
  const [startPage, setStartPage] = useState(0);//시작 페이지 번호(1, 11, 21..)
  const [realEnd, setRealEnd] = useState(0);//마지막 페이지 번호

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //게시판 종류 바뀔때 초기화
  useEffect(()=>{
    setPageNum(1);
  },[bcodeid]);

  //게시판 리스트 출력


  useEffect(() => {
    axios.get(`/gadget/board/${spaceid}/list/${bcodeid}?pageNum=${pageNum}`)
    .then((res) => {
      setList([...res.data]);
    });
  },[bcodeid,pageNum]);

  //총 게시물 수 및 페이징 처리
  useEffect(()=>{
    axios.get(`/gadget/board/count?bcodeid=${bcodeid}`)
    .then((res)=>{
      setPage(res.data);
      const num = Math.ceil(res.data / 10);
      setRealEnd(num);
      setEndPage(Math.ceil(pageNum / 10) * 10);
      setStartPage(Math.ceil(pageNum / 10) * 10 - 9);
      if (num < Math.ceil(pageNum / 10) * 10) {
        setEndPage(num);
      }
      setPrev(Math.ceil(pageNum / 10) * 10 - 9 > 1);
      setNext(Math.ceil(pageNum / 10) * 10 < num); 
    });
  },[bcodeid, page, pageNum]);

  function DeleteBcode(){
      axios.delete(`/gadget/board//${spaceid}/bcode/${bcodeid}`)
      .then(navigate(`/main`));
  }

  
  return(<div className='row'>
    <div className='col-12'>
    <div className='text-right'>
      <button className='btn btn-warning' onClick={()=>{navigate(`/board/${spaceid}/write/${bcodeid}`)}}>글쓰기</button>
    </div>
    <br/>
    {list.length > 0 
      ?(list.map((element, index) => {
        return(
          <>
            <div className='card' key={index} >
              <div className='card-body'onClick={()=>{navigate(`/board/${spaceid}/detail/${element.boardid}`)}}>
                <h3 className='card-title'>{element.title}</h3> <b>댓글 수: {element.repnum}</b>
                <div className='text-right'><p>{element.writer}({element.wdate}) </p></div>
              </div>
            </div>
            <br/>
          </>
        );}))
      :(<h3 className='text-center'><b>글이 없습니다.</b></h3>)
    }
    총 게시물 수: {page}
    <br/>
    <br/>
      <div className='text-center'>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-secondary" onClick={()=>{
            setPageNum(startPage-1);
            navigate(`/board/${spaceid}/list/${bcodeid}?pageNum=${startPage-1}`)}} disabled={!prev}>prev</button>
          {pagenate(startPage, endPage).map((e,i)=>{
            return(<button key={i} className="btn btn-secondary" onClick={()=>{
              setPageNum(e);
              navigate(`/board/${spaceid}/list/${bcodeid}?pageNum=${e}`)}} disabled ={pageNum===e}>{e}</button>);
          })}
          <button type="button" className="btn btn-secondary" onClick={()=>{
            setPageNum(endPage+1);
            navigate(`/board/${spaceid}/list/${bcodeid}?pageNum=${endPage+1}`)}} disabled ={!next}>next</button>
        </div>
      </div>
      <div>
        <br/>
        <button className='btn btn-secondary' onClick={handleShow}>게시판 목록 삭제하기</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제 하시겠습니까? (삭제시 복구할 수 없습니다.)</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            뒤로가기
          </Button>
          {' '}
          <Button variant="primary" onClick={DeleteBcode}>
            삭제하기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </div>);
};


function pagenate(startPage, endPage){
  let arr = [];
  for(let i = startPage; i <= endPage; i++){
    arr.push(i);
  }
  return arr;
}

export default Board;