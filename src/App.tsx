import React from "react";
import AvatarImg from '../assets/images/avatar.jpeg'
import './app.css'
import './app.less'
export default function App() {
  return (
    <div className="content">
      <h2 className="title">SeanHit的个人博客</h2>
      <img className="title" src={AvatarImg} alt="小于10kb的图片" />
    </div>
   
  )
}