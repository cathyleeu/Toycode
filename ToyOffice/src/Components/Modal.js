import React, { PureComponent } from 'react'
import './Modal.css'



// styleType : searchAddr, addrbooks
export default class Modal extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      display: props.isModalOpen
    }
  }
  componentWillReceiveProps(newProps) {
    if(newProps.isModalOpen !== this.props.isModalOpen) {
      this.setState({
        display: newProps.isModalOpen
      })
    }
  }
  render() {
    let { closeModal, children, styleType, closeName } = this.props;
    return (
      <div style={{display: this.state.display ? 'block' : 'none'}} className="outerStyle">
    		<div className="overlay" onClick={closeModal} data-name={closeName}></div>
    		<div onClick={closeModal} data-name={closeName}></div>
    		<div className={styleType}>
    			{children}
    		</div>
    	</div>
    )
  }
}
