import React, {PureComponent} from 'react'

class SelectedGoods extends PureComponent {
  render(){
    let { title, level, volume, amount, price } = this.props.detail;
    return(
      <div className="selected-goods-detailed-ctx">
        <div> {title}{level}{volume} X {amount} = {amount*price}원 </div>
      </div>
    )
  }
}

export default SelectedGoods
