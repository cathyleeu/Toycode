import React, { PureComponent } from 'react'
import './index.css'

export default class DirectionContainer extends PureComponent {
  render() {
    let customStyle = {
      width: this.props.width ? this.props.width : "100%",
      alignItems: this.props.alignItems || "",
      justifyContent: this.props.justifyContent || "",
    }
    return (
      <div
        className={`${this.props.direction}_direction`}
        style={customStyle}
      >
        {this.props.children}
      </div>
    )
  }
}
