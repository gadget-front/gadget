import React, { useEffect, useState } from 'react'
import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatDate } from '@fullcalendar/core'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StartDate from '../icon/StartDate.svg';
import EndDate from '../icon/EndDate.svg';
import moment from 'moment';

function Calendar(){
  const {spaceid} = useParams();
  const [weekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [content, setContent] = useState('');
  const [allday, setAllday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalTitle ,setModalTitle] = useState('');
  const [modalStart, setModalStart] = useState('');
  const [modalEnd, setModalEnd] = useState('');
  const [id, setId] = useState(0);
  const [groupId, setGroupId] = useState('');
  const [writer, setWriter] = useState('');
  const [userid, setUserid] = useState('');
  const [show, setShow] = useState(false);

  const showClose = () => setShow(false);
  const showOpen = () => setShow(true);

  let loginuserid = sessionStorage.getItem("userid");
  let username = sessionStorage.getItem("name");

  useEffect(()=>{
      axios.get(`/gadget/calendar/${spaceid}/list`)
      .then((response) => {
        setData(response.data);
      });
    },[]);
    

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (!data) {
      return <p>Loading...</p>;
    }

  //data input
  function handleDateSelect(selectInfo){
    setModalTitle('');
    setContent('');
    setAllday(selectInfo.allDay);
    setModalStart(moment(selectInfo.start).format('YYYY-MM-DDTHH:mm:ss'));
    setModalEnd(moment(selectInfo.end).format('YYYY-MM-DDTHH:mm:ss'));
    setShowModal(true);
  }

  function insertCalData(info){
    let data = {
      "id": null,
      "groupId": null,
      "title": modalTitle,
      "writer": username,
      "userid": loginuserid,
      "content": content,
      "start": modalStart,
      "end": modalEnd,
      "allday": allday,
      "textColor": "black",
      "backgroundColor": "#e0e0e0",
      "borderColor": "#f0f0f0",
      "spaceid": spaceid,
    }
    if (!modalTitle) {
      return;
    }else{
      axios.post(`/gadget/calendar/${spaceid}`,data,{
        headers:{'contentType':`application/json;charset=utf-8`}
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => setError(error));
    }
    handleCloseModal();
  }

  function handleEventClick(clickInfo) {
    setId(clickInfo.event.id);
    setGroupId(clickInfo.event.groupId);
    setUserid(clickInfo.event.extendedProps.userid);
    setWriter(clickInfo.event.extendedProps.writer);
    setModalTitle(clickInfo.event.title);
    setContent(clickInfo.event.extendedProps.content);
    setModalStart(moment(clickInfo.event.start).format('YYYY-MM-DDTHH:mm:ss'));
    setModalEnd(moment(clickInfo.event.end).format('YYYY-MM-DDTHH:mm:ss'));
    setAllday(clickInfo.event.extendedProps.allday);
    setShowInfoModal(true);
   }

   function deleteData(info){
      axios.delete(`/gadget/calendar/${spaceid}/${id}`)
      .then(response => {
        let resdata = [...response.data];
        setData(resdata)
      })
      .catch(error => setError(error));
      handleCloseModal2();
      showClose();
    }
   

   function updateData(info){
    console.log(info);
    let data = {
      "id": id,
      "groupId": groupId,
      "title": modalTitle,
      "writer": writer,
      "userid": userid,
      "content": content,
      "start": modalStart,
      "end": modalEnd,
      "allday": allday,
      "textColor": "black",
      "backgroundColor": "#e0e0e0",
      "borderColor": "#f0f0f0",
      "spaceid": spaceid,
    }
    axios.patch(`/gadget/calendar/${spaceid}`,data,{
      headers:{'contentType':`application/json;charset=utf-8`}
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => setError(error));
    handleCloseModal2();
   }

   function changeEventTime(draginfo) {
    let data = {
      "id": draginfo.event.id,
      "groupId": draginfo.event.groupId,
      "title": draginfo.event.title,
      "writer": draginfo.event.extendedProps.writer,
      "userid": draginfo.event.extendedProps.userid,
      "content": draginfo.event.extendedProps.content,
      "start": moment(draginfo.event.startStr).format('YYYY-MM-DDTHH:mm:ss'),
      "end": moment(draginfo.event.endStr).format('YYYY-MM-DDTHH:mm:ss'),
      "allday": draginfo.event.extendedProps.allday,
      "textColor": draginfo.event.textColor,
      "backgroundColor": draginfo.event.backgroundColor,
      "borderColor": draginfo.event.borderColor,
      "spaceid": draginfo.event.extendedProps.spaceid
    }

    axios.patch(`/gadget/calendar/${spaceid}`,data,{
      headers:{'contentType':`application/json;charset=utf-8`}
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => setError(error));
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCloseModal2() {
    setShowInfoModal(false);
  }

  return (
    <>
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={data}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={data} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventDrop={changeEventTime}
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
    {/* ?????? modal */}
      <Modal  show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>?????? ??????: <input type="text" className='title' name='title' placeholder='??????'
          onChange={(e)=>{setModalTitle(e.target.value)}}></input></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='row'>
            <div className='col-12'>
            <label>?????? ??????</label>
            <div className="form-group">
            <textarea 
            className="form-control" 
            name='content' 
            placeholder='??? ??? ??????' 
            onChange={(e)=>{setContent(e.target.value)}}></textarea>
            </div>
            <br/>
            <label className="date-container"><img src={StartDate} alt="????????? ??????"/>????????? 
              <input
                className="calendar-date"
                type="datetime-local"
                placeholder='?????????'
                value={modalStart}
                onChange={(e)=>{setModalStart(e.target.value);}}
              />
            </label>
            
            <label className="date-container"><img src={EndDate} alt="????????? ??????"/>????????? 
              <input
                className="calendar-date"
                type="datetime-local"
                placeholder='?????????'
                value={modalEnd}
                onChange={(e)=>{setModalEnd(e.target.value);}}
              />
            </label>
            <label className='check-allDay'>
              <input type="checkbox" className='allday' value={allday} name='allday' onChange={(e)=>{setAllday(!e.target.checked)}}/>
              ???????????? ??????
            </label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>?????? ??????</Button>
          <Button variant="primary" onClick={insertCalData}>?????? ??????</Button>
        </Modal.Footer>
      </Modal>

      {/* ???????????? ??? ??????&?????? modal */}
      <Modal  show={showInfoModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title><input type="text" className='title' name='title' placeholder='??????' value={modalTitle}
          onChange={(e)=>{setModalTitle(e.target.value)}}></input></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='row'>
            <div className='col-12'>
            <label>?????? ??????</label>
            <div className="form-group">
            <textarea 
            className="form-control" 
            name='content' 
            value={content}
            placeholder='??? ??? ??????' 
            onChange={(e)=>{setContent(e.target.value)}}></textarea>
            </div>
            <br/>
            <label className="date-container"><img src={StartDate} alt="????????? ??????"/>????????? 
              <input
                className="calendar-date"
                type="datetime-local"
                placeholder='?????????'
                value={modalStart}
                onChange={(e)=>{setModalStart(e.target.value);}}
                
              />
            </label>
            
            <label className="date-container"><img src={EndDate} alt="????????? ??????"/>????????? 
              <input
                className="calendar-date"
                type="datetime-local"
                placeholder='?????????'
                value={modalEnd}
                onChange={(e)=>{setModalEnd(e.target.value);}}
              />
            </label>
            <label className='check-allDay'>
              <input type="checkbox" className='allday' checked={allday} name='allday' onChange={(e)=>{setAllday(!e.target.checked)}}/>
              ???????????? ??????
            </label>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal2}>?????????</Button>
          <Button variant="info" onClick={updateData}>?????? ??????</Button>
          <Button variant="danger" onClick={showOpen}>?????? ??????</Button>
        </Modal.Footer>
      </Modal>
      {/* ????????? ?????? modal */}
      <Modal show={show} onHide={showClose}>
        <Modal.Header>
          <Modal.Title>??????</Modal.Title>
        </Modal.Header>
        <Modal.Body>????????? ?????? ??????????????????? (????????? ????????? ??? ????????????.)</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showClose}>
            ????????????
          </Button>
          <Button variant="primary" onClick={deleteData}>
            ????????????
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

//????????? ?????? ??????
function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Calendar;