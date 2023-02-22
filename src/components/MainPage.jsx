import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web';
import './MainPage.css';

export const MainPage = () => {

  const container = useRef(null);
  const container3 = useRef(null);

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      // animationData : require('../animation/34698-robot-messages-notification.json'),
      animationData : require('../animation/01-DesignerBuildingWebsite.json'),

    })
  }, [])

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container3.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      // animationData : require('../animation/4091-robotic-arm-animation.json'),
      animationData : require('../animation/07-WebDesignLayout.json'),
    })
  }, [])

  return (
    <div className="greeting-container">
      <div className="greeting">
        <div className='words'><h2>저희 가제트에 방문 하신 것을 진심으로 환영합니다!</h2></div>
        <div className="container" ref={container}></div>
      </div>
      <div className="greeting">
        <div className="container" ref={container3}></div>  
        <div className='words'><h2>누구나 쉽고 빠르게 서비스를 이용해보세요!</h2></div>
      </div>
    </div>
  )
}
