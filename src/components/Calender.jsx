import React from 'react'
import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatDate } from '@fullcalendar/core'
import axios from 'axios'

export default class Calendar extends React.Component {

  state = {
    weekendsVisible: true,
    currentEvents: [],
    mounted: false,
    data:null,
    error: null
  };

  componentDidMount() {  
      axios.get(`gadget/calendar/1/list`)
      .then(response => {
        return this.setState({ data: response.data })
      })
      .catch(error => this.setState({ error }))
    }  

  render() {
    const { data, error } = this.state;

    if (error) {
      return <p>Error: {error.message}</p>;
    }

    if (!data) {
      return <p>Loading...</p>;
    }

    return (
      <div className='demo-app'>
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={data} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            eventDrop={this.changeEventTime}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }
  calendarRef = React.createRef();
  //data input
  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
    let id = axios.get(`gadget/calendar/id`)
    .then(response => {
      return response
    });

    calendarApi.unselect() // clear date selection
    let data = {
      "id": this.id++,
      "groupId": "\""+this.id+"\"",
      "title": title,
      "writer": "user001",
      "userid": "user001",
      "content": "content",
      "start": selectInfo.startStr,
      "end": selectInfo.endStr,
      "allday": selectInfo.allDay,
      "textColor": "black",
      "backgroundColor": "#e0e0e0",
      "borderColor": "#f0f0f0",
      "spaceid": 1
    }
    console.log(data);
    if (!title) {
      return;
    }else{
      calendarApi.addEvent(data);
      axios.post(`gadget/calendar/1`,data,{
        headers:{'contentType':`application/json;charset=utf-8`}
      })
      .then(response => {
        console.log(response.data );
        
        return this.setState({ data: response.data })
      })
      .catch(error => this.setState({ error }))
    }
  }

   handleEventClick = (clickInfo) => {

     if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      let calendarApi = clickInfo.view.calendar;
      calendarApi.unselect();

      axios.delete(`gadget/calendar/1/${clickInfo.event.id}`)
      .then(response => {
        return this.setState({ data: response.data })
      })
      .catch(error => this.setState({ error }))
       clickInfo.event.remove();
     }
   }

   changeEventTime = (draginfo) => {
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

    axios.patch(`gadget/calendar/1`,data,{
      headers:{'contentType':`application/json;charset=utf-8`}
    })
    .then(response => {
      return this.setState({ data: response.data })
    })
    .catch(error => this.setState({ error }))
    
   }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

//데이터 시간 변경
function renderEventContent(eventInfo) {
  return (
    <>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
