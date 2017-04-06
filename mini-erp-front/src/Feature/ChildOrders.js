import React from 'react'


const ChildOrders = (props) => (
  <div className='cst-container'>
    <div className='IV-Goods'>
      <div>
        {props.rqt.userName}
        {props.rqt.requestedGoods.map((g,i) => <p key={i}>{g.name} {g.qutt} {g.sales}</p>)}
      </div>
      {console.log(props.rqt)}
    </div>
  </div>
)


export default ChildOrders
