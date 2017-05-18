import React, {PureComponent} from 'react'
import Perf from 'react-addons-perf'

class OrderModiItem extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      qutt: props.qutt || 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillMount(){
    window.performance.mark('OrderModiItem')
  }
  componentDidMount(){
    console.log(window.performance.now('OrderModiItem'))
  }
  componentDidUpdate() {
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
  }
  handleChange(e){
    Perf.start()
    let {isModiGoodsQutt, name, modiId} = this.props;
    this.setState({[e.target.name]: e.target.value})
    isModiGoodsQutt(name, parseInt(e.target.value, 10), modiId)
  }
  handleDelete(){
    let { isDeleteGoods, name, modiId } = this.props;
    if(confirm(`${name}을 삭제하시겠습니까?`)){
      isDeleteGoods(name, modiId)
    }
  }
  render(){
    return(
      <tr>
        <td>{this.props.name}</td>
        <td><input type="number" name="qutt" value={parseInt(this.props.qutt, 10)} min='1' onChange={this.handleChange}/></td>
        <td>{this.props.sales}</td>
        <td><button onClick={this.handleDelete}>DELETE</button></td>
      </tr>
    )
  }
}

export default OrderModiItem
