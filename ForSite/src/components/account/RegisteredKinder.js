import React, {Component} from 'react'

class RegisteredKinder extends Component {
  constructor(props) {
    super(props)
    const {kinder} = this.props
    this.state ={
      name: kinder.name,
      address: kinder.address,
      phone: kinder.phone,
      manager: kinder.manager,
      managerPh: kinder.managerPh
    }
  }
  isHandleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  render(){
    return(
      <div>
        <input type="text" value={this.state.name} onChange={this.isHandleChange} name="name"/>
        <input type="text" value={this.state.phone} onChange={this.isHandleChange} name="phone"/>
        <input type="text" value={this.state.address} onChange={this.isHandleChange} name="address"/>
        <input type="text" value={this.state.manager} onChange={this.isHandleChange} name="manager"/>
        <input type="text" value={this.state.managerPh} onChange={this.isHandleChange} name="managerPh"/>
      </div>
    )
  }
}


export default RegisteredKinder
