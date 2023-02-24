import React, { useEffect, useState } from 'react'
import './MakeTodoContent.css';
import './GoogleSpace.css';
import GooglePlusBtn from '../icon/GooglePlusBtn.svg';
import GoogleDocs from '../icon/GoogleDocs.svg';
import GoogleDrive from '../icon/GoogleDrive.svg';
import GoogleSheets from '../icon/GoogleSheets.svg';
import CancelMin from '../icon/CancelMin.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const GoogleSpace = () => {

  const navigate = useNavigate();
  const spaceid = useSelector(state => state.space.id);
  const [drive, setDrive] = useState([]);
  const [docs, setDocs] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [rendering, setRendering] = useState(0);

  const goAdd = (kind) => {
    navigate(`/googleSpaceAdd/${kind}`);
  };

  function deleteGoogle(gspaceid) {
    return axios.delete(`/gadget/gspace/${gspaceid}/row`)
                .then(res => setRendering(rendering => rendering + 1))
                .catch(err => console.log(err));
  }

  useEffect(() => {
    const prm = () => {
      Promise.all([0,1,2].map(kind => axios.get(`/gadget/gspace/${spaceid}/row/${kind}`)))
      .then((results) => {
       console.log(results);
       setDrive(results[0].data);
       setDocs(results[1].data);
       setSheets(results[2].data);
      })
      .catch((err) => {
       console.log(err);
      })
    }
    prm();
  }, [rendering]);

  return (
    <div className="google-space-container">
      <div className="google-space-header"><h3>Drive</h3><img src={GooglePlusBtn} alt="이미지 없음" onClick={()=>{goAdd(0)}}/></div>
      <hr/>
      <ul className="google-work-sheet google-drive">
        {drive?.map(item => {
            return <div className="item-box">
                     <li onClick={() => {window.open(item.url, '_blank')}}><img src={GoogleDrive} alt="이미지 없음"/>
                                                                           <p>{item.gtitle}</p></li>
                                                                           <img src={CancelMin} alt="이미지 없음" onClick={()=>{deleteGoogle(item.gspaceid)}}/>
                    </div>
        })}
        {/* <li><img src={GoogleDrive} alt="이미지 없음"/><p>협업 자료 공유</p></li> 
        <li><img src={GoogleDrive} alt="이미지 없음"/></li>
        <li><img src={GoogleDrive} alt="이미지 없음"/></li>
        <li><img src={GoogleDrive} alt="이미지 없음"/></li> */}
      </ul>
      <div className="google-space-header"><h3>Docs</h3><img src={GooglePlusBtn} alt="이미지 없음" onClick={()=>{goAdd(1)}}/></div>
      <hr/>
      <ul className="google-work-sheet google-docs">
        {docs?.map(item => {
            return <div className="item-box">
                     <li onClick={() => {window.open(item.url, '_blank')}}><img src={GoogleDocs} alt="이미지 없음"/>
                                                                           <p>{item.gtitle}</p></li>
                                                                           <img src={CancelMin} alt="이미지 없음" onClick={()=>{deleteGoogle(item.gspaceid)}}/>
                    </div>
        })}
        {/* <li><img src={GoogleDocs} alt="이미지 없음"/></li> */}
      </ul>
      <div className="google-space-header"><h3>Sheet</h3><img src={GooglePlusBtn} alt="이미지 없음" onClick={()=>{goAdd(2)}}/></div>
      <hr/>
      <ul className="google-work-sheet google-sheets">
        {sheets?.map(item => {
            return <div className="item-box">
                     <li onClick={() => {window.open(item.url, '_blank')}}><img src={GoogleSheets} alt="이미지 없음"/>
                                                                           <p>{item.gtitle}</p></li>
                                                                           <img src={CancelMin} alt="이미지 없음" onClick={()=>{deleteGoogle(item.gspaceid)}}/>
                    </div>
        })}
        {/* <li><img src={GoogleSheets} alt="이미지 없음"/></li> */}
      </ul>
    </div>
  )
}

export default GoogleSpace