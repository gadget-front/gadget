import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function BoardList(){
    let {spaceid} = useParams();
    let navigate = useNavigate();

    const [title, setTitle] = useState('');

    function makeContentBoard(){
        let data = ({
            "bcodeid":spaceid,
            "bcodename": title
        });
        axios.post(`/gadget/board/${spaceid}/bcode`,data)
        .then((res)=>{
            console.log(res.data);
            navigate(`/main`);
        })
    }

    return (
        <div className='row'>
            <div className="col-3"></div>
            <div className="col-6">
                <div className="card">
                    <div className="card-header">
                        <h3>게시판 추가하기</h3>
                    </div>
                    <div className="card-body text-center">
                        <br/>
                        <br/>
                        <input type="text" placeholder="주제 작성" onChange={(e)=>{
                            setTitle(e.target.value);
                        }}/>
                        <br/>
                        <br/>
                        <button className="btn btn-primary" onClick={makeContentBoard}>만들기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
