import React, { useContext } from 'react'
import global from '../Global'

function Logout() {
  const globalData = useContext(global);



  return (
    <div>
      <h1>Welcome <span className='user__name'></span></h1>
      <button className='logout__btn'>LOGOUT</button>
    </div>
  )
}

export default Logout