import React, { useEffect, useState } from 'react'

const Board = () => {
  const [message, setMessage] = useState([]);
  useEffect(() => {
    fetch("gadget/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);
  return (
    <div>Board
      <ul>
        {message.map((v, idx) => (
          <li key={`${idx}-${v}`}>{v}</li>
        ))}
      </ul>
    </div>
  )
}

export default Board;