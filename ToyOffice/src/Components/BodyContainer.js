import React, { PureComponent } from 'react'
// import './index.css'

export default class BodyContainer extends PureComponent {
  render(){
    return (
      <div className="body_container" data-subStyle={this.props.subStyle}>
        {this.props.children}
      </div>
    )
  }
}
