import React, { PureComponent } from 'react'

export default class ToyCodeInputLabel extends PureComponent {
  render() {
    if(!this.props.label) {
      return false
    }
    return (
      <label className="toycode_label">
        {this.props.label}
      </label>
    );
  }
}
