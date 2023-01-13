import React, { useState } from "react";
import AvatarImg from '../assets/images/avatar.jpeg'
import './app.css'
import './app.less'
export default function App() {

  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return (

    <div className="content">
      <h2 className="title">SeanHit的个人博客</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
    
  </div>
   
  )
}