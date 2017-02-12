import React, {Component} from 'react'


class ReturnGoodsByItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      reQutt:''
    }
  }
  setRefund = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render(){
    const {goods, i} = this.props;
    let optionList = []
    for(var num=0 ; num < goods.qutt+1 ; num++){
      optionList.push(num)
    }
    const optionLists = optionList.map(i => (
      <option key={i} value={i}>{i}</option>
    ))
    return(
      <div className="returnGoods-body-items line-b">
        <p className="line-r w-10 ">{i+1}</p>
        <p className="line-r w-50">{goods.name}</p>
        <p className="line-r w-20">{goods.qutt}</p>
        <select className="w-20" onChange={this.setRefund} value={this.state.reQutt} name="reQutt">
          {optionLists}
        </select>
      </div>
    )
  }
}

export default ReturnGoodsByItem;
