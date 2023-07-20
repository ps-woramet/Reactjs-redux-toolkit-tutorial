// rafce
import React from 'react'

import { useDispatch } from 'react-redux'
import {clickred, clickblue} from '../store/userSlice'

const ComponentB = () => {

  const dispatch = useDispatch();

  const data = {
    username: 'ps-woramet',
    password: '123456'
  }

  const handleClickred = () =>{
    dispatch(clickred(data))
  }

  return (
    <div>
      <h2>Component B</h2>
      <button onClick = {handleClickred} style={{color: 'white', background: 'red'}}>red button</button>
      <button onClick = {() => dispatch(clickblue())} style={{color: 'white', background: 'blue'}}>blue button</button>
    </div>
  )
}

export default ComponentB
