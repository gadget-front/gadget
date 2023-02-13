import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardDetail(props){
    let {spaceid} = useParams();
    let {boardid} = useParams();

    const actionurl = `/gadget/board/delete/${boardid}`;

    const [page, setPage] = useState([]);
    let navigate = useNavigate();
    console.log(boardid);
    useEffect(() => {
        axios.get(`/gadget/board/${spaceid}/detail/${boardid}`)
        .then((res) => {
          console.log(res.data);
          return setPage(res.data);
        });
      }, []);
      
    return (
    <div className="row">
      <div className="col-12">
        <button onClick={()=>{navigate(-1)}} className='btn btn-outline-dark'>뒤로가기</button>
        <h2>{page.title}</h2>
        <br/>
        <b>작성자: {page.writer}({page.userid})</b><br/>
        <i>작성일: {page.wdate}</i><br/>
        <p>수정일자: {page.udate}</p>
        <hr/>
        <div dangerouslySetInnerHTML={{__html:page.content}}></div>
        <hr/>
        <button>수정하기</button>
        <button onClick={()=>{
          axios.delete(actionurl)
          .then(navigate(`/gadget/board/${spaceid}/list/${page.bcodeid}`));
        }}>삭제하기</button>
      </div>
    </div>
    )
}

export default BoardDetail;