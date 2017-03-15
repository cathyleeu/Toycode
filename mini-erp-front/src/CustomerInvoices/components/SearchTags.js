import React from 'react'


const SearchTags = (props) => {
  return(
    <button
      className={props.cssName}
      onClick={() => props.isGetTags(props.tag.type)}>
      {props.tag.title}
    </button>
  )
}

export default SearchTags;
