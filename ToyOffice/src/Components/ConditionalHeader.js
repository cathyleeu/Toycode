import React, { PureComponent } from 'react'
// import FlatButton from 'material-ui/FlatButton';
import PrimaryButton from './PrimaryButton'



/*
  headerType = [flip, normal]
    flipStatus = true || false
    flip
      btnFront = [edit, ? ]
      btnBack = [done, cancle]
    normal
      btnFront = [ ? , ? ]
*/


export default class ConditionalHeader extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      // headerType: props.headerType,
      displayBtn: {
        true : props.btnBack,
        false : props.btnFront
      },
      flipStatus: props.flipStatus || false
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.flipStatus !== this.props.flipStatus){
      this.setState({ flipStatus: newProps.flipStatus})
    }
  }
  render(){
    let customStyle = {
      width: this.props.customWidth,
      minWidth: this.props.customMinWidth,
      alignItems: this.props.alignItems || "center"
    }
    let customIconStyle = {
      fontSize: this.props.headerIconSize,
      color: this.props.headerIconColor,
      margin: this.props.headerIconMargin
    }
    let { displayBtn, flipStatus } = this.state;
    //FIXME: dataName : data 들어가는 props들을 다 뿌려주는 것
    return (
      <div className={this.props.headerStyle} style={customStyle}>
        <i className={this.props.headerIcon} aria-hidden="true" style={customIconStyle}></i>
        <h3>{this.props.headerTitle}</h3>
        <p>{this.props.headerSecondTitle}</p>
        { this.props.headerType === "normal"
            ? false
            : displayBtn[flipStatus].map((btn, i) => {
                 return (
                  <PrimaryButton
                    key={i}
                    dataName={btn.dataName}
                    dataApi={btn.dataApi}
                    dataPurpose={btn.purpose}
                    content={btn.name}
                    onClick={this.props.onClick}
                    purpose={btn.purpose}
                  />
                )
              })
        }
        {this.props.children}
      </div>
    )
  }
}
