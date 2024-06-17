import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Home<br/>
      <Link to="/about">about 으로 가기</Link>
    </div>
    
  )
}

export default Home
