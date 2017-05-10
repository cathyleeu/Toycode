import React, {PureComponent} from 'react'


class OrderModiItem extends PureComponent {
  state = {
    qutt: this.props.qutt
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    return(
      <div>
        {this.props.name}
        <input type="number" name="qutt" value={this.state.qutt} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default OrderModiItem
