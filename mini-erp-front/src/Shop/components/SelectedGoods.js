import React, {PureComponent} from 'react'

class SelectedGoods extends PureComponent {
  render(){
    return(
      <div className="selected-goods-detailed-ctx">
        <div> {this.props.detail.title}{this.props.detail.level}{this.props.detail.volume} X {this.props.detail.amount} = {this.props.detail.amount*this.props.detail.price}원 </div>
      </div>
    )
  }
}

export default SelectedGoods
