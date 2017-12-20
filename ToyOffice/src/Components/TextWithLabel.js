import React from 'react'
import './index.css'

const TextWithLabel = ({title, content, subContent}) => (
  <div className="TextWithLabel">
    <p>{title}</p>
    <span>
      <p>{content}</p>
      <p>{subContent}</p>
    </span>
  </div>
)

export default TextWithLabel
