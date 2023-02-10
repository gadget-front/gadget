import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardDetail(props){
    let {id} = useParams();
    const [page, setPage] = useState([]);
    console.log(id);
    useEffect(() => {
        axios.get(`/gadget/board/1/detail/${id}`)
        .then((res) => {
          console.log(res.data);
          return setPage(res.data);
        });
      }, []);
      let navigate = useNavigate();
    
    return (
    <div>
        <h2>{page.title}</h2>
        <br/>
        <b>작성자: {page.writer}({page.userid})</b><br/>
        <i>작성일: {page.wdate}</i><br/>
        <p>수정일자: {page.udate}</p>
        <hr/>
        <div>
            {page.content}
        </div>
        <hr/>
        <button>수정하기</button>

    </div>
    )
}

export default BoardDetail;