
import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log("Connected")
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Received Messsage:', message.data)
      setLatestMessage(message.data)
    }
  })

  if (!socket) {
    return <div>
      COnnesting to socket server ....
    </div>
  }

  return (
    <div>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} ></input>
      <button onClick={() => {
        socket.send(value)
      }}>Send message </button>
      {latestMessage}
    </div>
  )
}

export default App
