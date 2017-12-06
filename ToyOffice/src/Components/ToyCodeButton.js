import React, { PureComponent } from 'react'

export default class ToyCodeButton extends PureComponent {
  render() {
    let {
      content,
      buttonStyle,
      handleButtonEvent,
      buttonName,
      buttonType
    } = this.props;
    return (
      <button
        type={buttonType}
        name={buttonName}
        className={buttonStyle}
        onClick={handleButtonEvent}
      >
        {content}
      </button>
    )
  }
}
