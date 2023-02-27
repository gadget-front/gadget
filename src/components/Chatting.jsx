import React from 'react'
import { useSelector } from 'react-redux';

const Chatting = () => {

  const userId = sessionStorage.getItem("userid");
  const spaceId = useSelector(state => state.space.id);

  const url = `http://3.36.4.16:8080/gadget/chat/room?userid=${userId}&spaceid=${spaceId}`;

  return (
    <div className='card'>
      <div className='card-header'>채팅방</div>
      <div className='card-body'>
        <div className="embed-responsive embed-responsive-1by1">
          <iframe className="embed-responsive-item" src={url} width="100%" height="805px" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default Chatting;
