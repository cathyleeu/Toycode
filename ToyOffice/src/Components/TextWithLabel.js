import React from 'react'
import './index.css'

const TextWithLabel = ({title, content, subContent}) => (
  <div className="TextWithLabel">
    <p>{title}</p>
    <span>
      <p style={{display: content ? 'inline' : 'none'}}>{content}</p>
      <p style={{display: subContent ? 'inline' : 'none'}} >{subContent}</p>
    </span>
  </div>
)

export default TextWithLabel
