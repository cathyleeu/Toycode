import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';


export default class ConditionalHeader extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      headerType: props.headerType
    }
    // this.normal = this.normal.bind(this)
  }
  componentWillReceiveProps(newProps){
    if(newProps.headerType !== this.props.headerType){
      this.setState({ headerType: newProps.headerType})
    }
  }
  normal = () => {
    return (
      <FlatButton
        data-name={this.props.name}
        label={this.props.btnTitle}
        primary={this.props.primary}
        secondary={this.props.secondary}
        onClick={this.props.onClick}
      />
    )
  }
  flipped(){
    return (
      <div>
        <FlatButton
          data-name={this.props.name}
          data-result="complete"
          label="완료"
          primary={true}
          onClick={this.props.onClick}
         />
        <FlatButton
          data-name={this.props.name}
          data-result="cancle"
          label="취소"
          onClick={this.props.onClick}
         />
      </div>
    )
  }
  render(){
    let type = {
      normal: this.normal(),
      flipped: this.flipped(),
    }
    return (
      <div className={this.props.headerStyle}>
        <h3>{this.props.headerTitle}</h3>
        {type[this.state.headerType]}
      </div>
    )
  }
}
