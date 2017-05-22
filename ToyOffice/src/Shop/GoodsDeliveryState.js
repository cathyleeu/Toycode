import React from 'react'
import { Commas } from '../CommonFunc'

export const GoodsDeliveryState = (
  {state}
) => (
  <tr className="Delivery-Statement-Detail">
    <td className="lang">{state.title}{state.level}{state.volume}</td>
    <td className="title">{state.amount}</td>
    <td className="title">{Commas(state.dPrice)}</td>
    <td className="title">60%</td>
    <td className="level">{Commas(state.dPrice*state.amount*0.6)}</td>
  </tr>
)
