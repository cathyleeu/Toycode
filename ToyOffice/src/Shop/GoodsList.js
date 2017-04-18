import React from 'react'

const GoodsList = ({goods}) => (
  <div>
    {goods.map((g,i) => (
      <div key={i}>
        {g.title}{g.level}{g.volume}
      </div>
    ))}
  </div>
)

export default GoodsList
