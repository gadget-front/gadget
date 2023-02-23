import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import './MainPage.css';
import './Header.css';

const StartPage = () => {
  const navigate = useNavigate();

  const container = useRef(null);
  const container2 = useRef(null);
  const container3 = useRef(null);
  const container4 = useRef(null);

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      animationData : require('../animation/34698-robot-messages-notification.json'),
    })
  }, [])

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container2.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      animationData : require('../animation/4091-robotic-arm-animation.json'),
    })
  }, [])

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container3.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      animationData : require('../animation/29822-robotic-arm.json'),
    })
  }, [])

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container4.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      animationData : require('../animation/36607-idea-into-book-machine.json'),
    })
  }, [])

  return (
    <div className='catagory-area'>
      <div className="login-bar">
        <h3 onClick={() => navigate("/login")}>Log in</h3>
      </div>
      <div className="start-container">
        <div className="greeting">
          <div className='words'><h2>안녕하세요? <br></br> 세계로 뻗어나가는 <span className='half-highlight'>패스트 만능 툴 가제트</span>입니다! </h2></div>
          <div className="container" ref={container}></div>
        </div>
        <div className="greeting">
          <div className="container" ref={container2}></div>  
          <div className='words'><h2>가제트는 남녀노소 <span className='half-highlight'>누구나 쉽게 이용</span>하실 수 있습니다</h2></div>
        </div>
        <div className="greeting">
          <div className='words'><h2><span className='half-highlight'>칸반보드 기반 드래그앤드랍</span>으로 편리하게 일정관리가 가능합니다</h2></div>
          <div className="container" ref={container3}></div>  
        </div>
        <div className="greeting">
          <div className="container" ref={container4}></div> 
          <div className='words'><h2>언제든지 원하는대로 <span className='half-highlight'>게시판을 추가</span>해보세요</h2></div> 
        </div>
      </div>
    </div>
  )
}

export default StartPage