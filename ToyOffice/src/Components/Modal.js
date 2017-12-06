import React, { PureComponent } from 'react'
import './Modal.css'



// styleType : searchAddr, addrbooks
export default class Modal extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      display: props.isModalOpen,
      styleType: props.styleType || "",
      modalWidth: props.modalWidth || "",
      modalHeight: props.modalHeight || ""
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
    let { closeModal, children, closeName } = this.props;
    let modalStyle = `plainModal ${this.state.styleType}`;
        modalStyle = modalStyle.trim()
    return (
      <div style={{display: this.state.display ? 'block' : 'none'}} className="outerStyle">
    		<div className="overlay" onClick={closeModal} data-name={closeName}></div>
    		<div onClick={closeModal} data-name={closeName}></div>
    		<div className={modalStyle}
             style={{
               width: this.state.modalWidth,
               height: this.state.modalHeight,
             }}>
    			{children}
    		</div>
    	</div>
    )
  }
}
