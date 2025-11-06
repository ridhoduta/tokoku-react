import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const handleLogin = () =>{
        navigate('/login')
    }
  return (
    <div>
      ini adalah halaman home
      <button onClick={handleLogin}>
        login
      </button>
    </div>
  )
}

export default Home
