import React, {Component} from 'react'



class CustomModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      license: props.user.branch.license || '',
      name: props.user.branch.name || '',
      sub_name: props.user.branch.sub_name || '',
      erpCode: props.user.erpCode || '',

    }
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  handleModifying = () => {
    this.props.handleCloseModal('none')
  }
  render(){
    const {name, license, erpCode, sub_name} = this.state
    return(
      <div style={{display: this.props.ModalOpen }} className="outerStyle">
        <div className="overlay"></div>
        <div className="searchModal">
          <div className='class_row'>
            <div></div>
            <p>고객 정보 수정</p>
            <button className="modal-btn-close" onClick={() => this.props.handleCloseModal('none')}>X</button>
          </div>
          <div className='class_column'>
            <label>상호 명: <input value={name} name='name' onChange={this.handleChange} /> </label>
            <label>부 상호 명: <input value={sub_name} name='sub_name' onChange={this.handleChange} /> </label>
            <label>사업자 번호:
              <input value={license} name='license' onChange={this.handleChange}/>
            </label>
            <label>ERP_CODE:
              <input value={erpCode} name='erpCode' onChange={this.handleChange}/>
            </label>
          </div>
          <button onClick={this.handleModifying} className="modal-btn-success">수정완료</button>
        </div>
      </div>
    )
  }
}

export default CustomModal;
