import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';



class AccountTableHeader extends Component {
  state = {
    modi: this.props.modi
  }
  componentWillReceiveProps(newProps){
    if(newProps.modi !== this.props.modi){
      this.setState({ modi: newProps.modi})
    }
  }
  render(){
    let { typeOf, onClick, title } = this.props;
    return(
      <div className="Account-table-top">
        <h3>{title}</h3>
        {this.state.modi
          ? <FlatButton
              label="수정하기"
              secondary={true}
              onClick={() => onClick(typeOf, "수정")}
            />
          : <div>
              <FlatButton
                label="수정완료"
                primary={true}
                onClick={() => onClick(typeOf, "완료")}
               />
              <FlatButton
                label="취소하기"
                onClick={() => onClick(typeOf, "취소")}
               />
            </div>
        }
      </div>
    )
  }
}


export default AccountTableHeader
