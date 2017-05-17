import React, {Component} from 'react'
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
    return(
      <div className="Account-table-top">
        <h3>{this.props.title}</h3>
        {this.state.modi
          ? <FlatButton
              label="수정하기"
              secondary={true}
              onClick={this.props.onClickTrue}
            />
          : <div>
              <FlatButton
                label="수정완료"
                primary={true}
                onClick={this.props.onClickFalse}
               />
              <FlatButton
                label="취소하기"
                onClick={this.props.onClickCancle}
               />
            </div>
        }
      </div>
    )
  }
}


export default AccountTableHeader
