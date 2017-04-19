import React from 'react'


const GoodsCartList = ({selected}) => (
  <div >
    {selected.map((s,i) => (
      <div key={i}>
        <p>{s.title}{s.level}{s.volume}</p>
      </div>
    ))}
  </div>
)

export default GoodsCartList
