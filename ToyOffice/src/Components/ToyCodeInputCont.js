import React, { PureComponent } from 'react'
import ToyCodeInputLabel from './ToyCodeInputLabel'
import ToyCodeInput from './ToyCodeInput'

export default class ToyCodeInputCont extends PureComponent {
  render(){
    return (
      <div className={this.props.styleType}>
       <ToyCodeInputLabel
         label={this.props.label}/>
       <ToyCodeInput
         name={this.props.name}
         inputWidth={this.props.inputWidth}
         holder={this.props.holder}
         handleChange={this.props.handleChange}
         readOnly={this.props.readOnly}
         onBlur={this.props.onBlur}
         value={this.props.value}
         inputType={this.props.inputType}
        />
      </div>
    )
  }
}
