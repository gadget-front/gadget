import React from 'react'

const Chatting = () => {
  return (
    <div className='card'>
      <div className='card-header'>채팅방</div>
      <div className='card-body'>
        <div className="embed-responsive embed-responsive-1by1">
          <iframe className="embed-responsive-item" src='http://localhost:8090/gadget/chat/room' width="890px" height="805px" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default Chatting;
