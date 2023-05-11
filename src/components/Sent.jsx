import React from 'react'
import { useNavigate } from 'react-router-dom';


function Sent() {
    const navigate = useNavigate()

  return (
    <div>
        <h1>Thank you for your message!</h1>
        <button onClick={()=>navigate("/form")}>Send one more</button>
    </div>
  )
}

export default Sent