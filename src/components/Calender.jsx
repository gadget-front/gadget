import React, { useEffect, useState } from 'react'
import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatDate } from '@fullcalendar/core'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Modal } from 'bootstrap'
import { Button } from 'react-bootstrap'

function Calendar(){
  const {spaceid} = useParams();
  const [weekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle ,setModalTitle] = useState('');
  const [modalStart, setModalStart] = useState('');
  const [modalEnd, setModalEnd] = useState('');

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
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    
    // const { event } = selectInfo;
    // setShowModal(true);
    // setModalTitle(event.title);
    // setModalStart(event.start);
    // setModalEnd(event.end);

    calendarApi.unselect() // clear date selection
    let data = {
      "id": null,
      "groupId": null,
      "title": title,
      "writer": "user001",
      "userid": "user001",
      "content": content,
      "start": selectInfo.startStr,
      "end": selectInfo.endStr,
      "allday": selectInfo.allDay,
      "textColor": "black",
      "backgroundColor": "#e0e0e0",
      "borderColor": "#f0f0f0",
      "spaceid": spaceid,
    }
    if (!title) {
      return;
    }else{
      axios.post(`/gadget/calendar/1`,data,{
        headers:{'contentType':`application/json;charset=utf-8`}
      })
      .then(response => {
        setData(response.data);
      })
      .catch(error => setError(error));
    }
  }

  function handleEventClick(clickInfo) {

     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      let calendarApi = clickInfo.view.calendar;
      calendarApi.unselect();

      axios.delete(`/gadget/calendar/1/${clickInfo.event.id}`)
      .then(response => {
        let resdata = [...response.data];
        setData(resdata)
      })
      .catch(error => setError(error));
       clickInfo.event.remove();
     }
   }

   function changeEventTime(draginfo) {
    let data = {
      "id": draginfo.event.id,
      "groupId": draginfo.event.groupId,
      "title": draginfo.event.title,
      "writer": draginfo.event.extendedProps.writer,
      "userid": draginfo.event.extendedProps.userid,
      "content": draginfo.event.extendedProps.content,
      "start": draginfo.event.startStr,
      "end": draginfo.event.endStr,
      "allday": draginfo.event.extendedProps.allday,
      "textColor": draginfo.event.textColor,
      "backgroundColor": draginfo.event.backgroundColor,
      "borderColor": draginfo.event.borderColor,
      "spaceid": draginfo.event.extendedProps.spaceid
    }

    axios.patch(`/gadget/calendar/1`,data,{
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
      
        {/* <Modal  show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>시작: {content}</p>
            <p>시작: {modalStart}</p>
            <p>끝: {modalEnd}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal> */}
      </>
    );
}

//데이터 시간 변경
function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Calendar;