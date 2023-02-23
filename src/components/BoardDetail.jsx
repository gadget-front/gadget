import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BoardDetail(props){
  let {spaceid} = useParams();
  let {boardid} = useParams();
  const [page, setPage] = useState([]);
  const [reply, setReply] = useState([]);
  const [a, setA] = useState(0);
  const [text, setText] = useState('');
  let userid = sessionStorage.getItem("userid");
  let username = sessionStorage.getItem("name");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [repdata, setRepdata] = useState({
    'replyid':null,
    'content':'',
    'writer':username,
    'wdate': null,
    'boardid': boardid,
    'userid': userid
  });

  let navigate = useNavigate();
  useEffect(() => {
      axios.get(`/gadget/board/${spaceid}/detail/${boardid}`)
      .then((res) => {
        return setPage(res.data);
      });
      axios.get(`/gadget/board/reply/${boardid}`)
      .then((res)=>{
        return setReply(res.data);
      });

    }, [a]);
      
    return (
    <div className="row">
      <div className="col-12">
        <div className="card bg-light">
        <div className="card-header">
          <button onClick={()=>{navigate(`/board/${spaceid}/list/${page.bcodeid}`)}} className='btn btn-dark'>뒤로가기</button>
        </div>
        <div className="card-body">
        <h5 className="card-title">{page.title}</h5>
        <div className="text-right">
          <small className="card-text">작성자: {page.writer}</small><br/>
          <small className="card-text">작성일: {page.wdate}</small><br/>
          <small className="card-text">수정일자: {page.udate}</small>
        </div>
        <hr/>
        <div dangerouslySetInnerHTML={{__html:page.content}}></div>
        <hr/>
        <div className="text-right">
          <button onClick={()=>{
            navigate(`/board/${spaceid}/modify/${boardid}`)
          }} className="btn btn-warning">수정하기</button>{' '}
          <button onClick={handleShow} className="btn btn-danger">삭제하기</button>
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
              <Button variant="primary" onClick={()=>{
                axios.delete(`/gadget/board/${boardid}`)
                .then(navigate(`/board/${spaceid}/list/${page.bcodeid}`));
              }}>
                삭제하기
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        </div>
        </div>
        <br/>
        <br/>
        <div className="card bg-light">
          <div className="card-header"><label>댓글 작성란</label></div>
          <div className="card-body">
            <div className="form-group">
              
              <textarea className="form-control" name="content" value={text} onChange={(e) => {
                    setText(e.target.value);
                    setRepdata({...repdata, 'content': e.target.value});
                    }}></textarea>
            </div>
            <div className="text-right">
              <br/>
              <button className="btn btn-info" onClick={()=>{
                console.log(repdata);
                axios.post('/gadget/board/reply',repdata,{
                  headers:{'contentType':`application/json;charset=utf-8`}
                })
                .then(response => {
                  setText('');
                  setA(a+1);
                  return setReply(response.data);
                });
              }}>입력</button>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <div className="viewreply">
          {reply.map((element, index) => {
            return(<div  key={index}>
            <div className="card">
              <div className="card-header">
                <div>작성자: {element.writer}</div>
              </div>
              <div className="card-body"><div className="card-text"></div>{element.content}</div>
              <div className="card-footer text-right">작성일자: {element.wdate} &nbsp;&nbsp;&nbsp;
                <button className="btn btn-danger" onClick={()=>{
                  axios.delete(`/gadget/board/reply/${element.replyid}`)
                  .then(response => {
                    setA(a+1);
                    return setRepdata(response.data);});
                }}>삭제</button></div>
            </div>
            <br/>
            </div>);
          })}
        </div>
      
      </div>
    </div>
    )
}

export default BoardDetail;