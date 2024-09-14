import React from 'react'

export default function Overlay(props) {
  return (
    <>
      <div className="overlay" onClick={props.func}></div>
    </>
  )
}
