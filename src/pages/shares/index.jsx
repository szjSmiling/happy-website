import React from 'react'

export default function SharePage() {
  const clickHandle = () => {
    console.log('clickhandle....');
  }
  const clickHandle2 = () => {
    console.log('clickhandle2....');
  }
  return (
    <div>
      <h3>分享页</h3>
      <button onClick={clickHandle}></button>
      <button onClick={clickHandle2}></button>
    </div>
  )
}
