import React, { PureComponent } from 'react'
import './index.css'


const ButtonColors = {
  create: {
    mouseleave: "#24afc3",
    mouseenter: "#31d2ea",
    mousedown: "#31d2ea",
  },
  edit: {
    mouseleave: "#FF3877",
    mouseenter: "#ff6998",
    mousedown: "#ff6998",
  },
  delete: {
    mouseleave: "#f1be2b",
    mouseenter: "#fcd222",
    mousedown: "#fcd222",
  },
  multi: {
    mouseleave: "#3b5998",
    mouseenter: "#4a6fbd",
    mousedown: "#4a6fbd",
  },
  cancle: {
    mouseleave: "#6E6E6E",
    mouseenter: "#909090",
    mousedown: "#909090",
  },
  complete: {
    mouseleave: "#24afc3",
    mouseenter: "#31d2ea",
    mousedown: "#31d2ea",
  }
}



export default class PrimaryButton extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      buttonColor: ButtonColors[props.purpose].mouseleave,
      dataAttr: {}
    }
    this.handleHover = this.handleHover.bind(this)
    this.replacer = this.replacer.bind(this)
    this.handleDataSet = this.handleDataSet.bind(this)
  }
  componentWillMount(){
    this.handleDataSet(this.props)
  }
  componentWillReceiveProps(newProps){
    if(newProps.content !== this.props.content) {
      this.handleDataSet(newProps)
    }
  }
  handleHover(e){
    let { purpose } = this.props;
    this.setState({
      buttonColor: ButtonColors[purpose][e.type]
    })
  }
  handleDataSet(propsData){
    let propsKeys = Object.keys(propsData), dataAttr = {}
        propsKeys = propsKeys.filter( key => key.match('data'));
    if(propsKeys) {
      propsKeys = propsKeys.forEach( key => {
        let newKey = key.replace(/([A-Z])/g, this.replacer);
        dataAttr = {
          ...dataAttr,
          [newKey] : propsData[key]
        }
      })
      this.setState({
        dataAttr
      })
    }
  }
  replacer(match, p1) {
	   return match.replace(p1, `-${p1.toLocaleLowerCase()}`)
  }
  render() {
    let {
      content,
      // buttonStyle,
      onClick,
      buttonName,
      buttonType,
      // buttonColor,
      buttonWidth,
      buttonHeight,
      customClassName,
      // buttonHoverColor,
      // purpose
    } = this.props;
    let customStyle = {
      backgroundColor: this.state.buttonColor,
      width: buttonWidth,
      height: buttonHeight
    }
    let className = customClassName ? customClassName : "";
    return (
      <button
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        name={buttonName}
        {...this.state.dataAttr}
        className={`primary_btn ${className}`}
        style={customStyle}
        onClick={onClick}
        type={buttonType}
      >
        {content}
        {this.props.children}
      </button>
    )
  }
}
