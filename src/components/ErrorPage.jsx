import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web';
import './ErrorPage.css';

const ErrorPage = () => {

  const container = useRef(null);

  useEffect(()=>{
    Lottie.loadAnimation({
      container : container.current,
      renderer : 'svg',
      loop : true,
      autoplay : true,
      animationData : require('../animation/80698-404-error.json'),

    })
  }, [])

  return (
    <div className="error-container">
      <div className="container" ref={container}></div>
    </div>
  )
}

export default ErrorPage