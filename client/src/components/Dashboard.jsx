import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      User dashboard here
      <br></br>
      <button
        onClick={() => navigate(`/profile`)
        }
      > go to profile</button >
    </div >
  )
}
