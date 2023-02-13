import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import $ from 'jquery';
import { useState } from "react";


export const BoardWrite = (props) => {
    let {spaceid} = useParams();
    let {bcodeid} = useParams();
    let navigate = useNavigate();    
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const actionurl = `/gadget/board/${spaceid}/detail`;

    const handleSubmit = async (event) => {
        
        setDisabled(true);
        const board =({
            'boardid':null,
            'title': title,
            'content': content,/*note-editable*/
            'writer': 'user001',/*닉네임*/
            'wdate': null,
            'udate': null,
            'repnum': 0,
            'bcodeid': bcodeid,
            'spaceid': spaceid,
            'userid': 'user001',/*아이디*/
            'attachList':[]
          });
        event.preventDefault();
        console.log(board);
        await new Promise(r => setTimeout(r, 1000));
        console.log(actionurl);
        axios.post(actionurl,JSON.stringify(board),{
            headers:{"Content-Type": "application/json",
            'cors-proxy-url' : 'https://t1.daumcdn.net/*'}
        })
        .then((res)=>{
            console.log(res.data);
            navigate(`/gadget/board/${spaceid}/list/${bcodeid}`);
        });
        setDisabled(false);
    }
    

    return(
    <div className="row">
        <div className="col-12">
        
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">글쓰기</h5>
            <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label>Title</label> 
                <input className="form-control" name='title' onChange={(e) => {
                    console.log(e.target.value);
                    setTitle(e.target.value)}}/>
            </div>  
            <div className="form-group">
                <br/>
                <ReactSummernote
                defaultValue="Default value"
                options={{
                    height: 400,
                    focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
                    lang: "ko-KR",               // 한글 설정
                    dialogsInBody: true,
                    toolbar: [
                        ["style", ["style"]],
                        ['fontsize', ['fontsize']],
                        ['color', ['forecolor','color']],
                        ["font", ["bold", "underline", "clear"]],
                        ["fontname", ["fontname"]],
                        ['height', ['height']],
                        ["para", ["ul", "ol", "paragraph"]],
                        ["table", ["table"]],
                        ["view", ["fullscreen", "codeview"]],
                    ],
                    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New','맑은 고딕','궁서','굴림체','굴림','돋움체','바탕체'],
                    fontSizes: ['8','9','10','11','12','14','16','18','20','22','24','28','30','36','50','72'],
                    callbacks :{
                        onImageUpload: function(files) {
                            console.log(files);
                            return fileChange(files);
                        },
                    }
                }}
                onChange={(val)=> setContent(val)}
                />
            </div>
    
            <button className="btn btn-outline-info" disabled={disabled} onClick={()=>{
                return handleSubmit;
            }}>글쓰기 완료</button>
            </form>
            </div>
        </div>
      </div>
    </div>
  );
}

function fileChange(file) {
    let fileurl = "";
    var form = new FormData();
    form.append("image", file[0]);

    console.log(form);

    var settings = {
        "url" : "https://api.imgbb.com/1/upload?key=bb2840aa7662570a5576bbd59c7c849a",
        "method" : "POST",
        "timeout" : 0,
        "processData" : false,
        "mimeType" : "multipart/form-data",
        "contentType" : 'application/json',
        "data" : form
    };

    console.log(settings);

    $.ajax(settings).done(function(response) {
        var jx = JSON.parse(response);
        fileurl = jx.data.url;
        console.log(fileurl);
        $('#summernote').summernote('insertImage', fileurl);
    });
}

export default BoardWrite;