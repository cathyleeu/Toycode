import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux'
import KinderCard from './KinderCard'
import './index.css'

class KinderContainer extends PureComponent {
  state = {
    kinders: this.props.kinders,
    loaded: false
  }
  componentWillMount(){
    if(this.props.kinders){
      this.setState({loaded: true})
    }
  }
  componentWillReceiveProps(newProps){
    if(newProps.kinders !== this.props.kinders){
      this.setState({kinders: newProps.kinders, loaded: true})
    }
  }
  renderKinderCard = (kin,i) => {
    return <KinderCard key={i} {...kin} />
  }
  render(){
    if(!this.state.loaded){
      return <div>로딩중</div>
    }
    return(
      <div className="Child-Cont">
        <div className="Kinder-Cont-top">
          <h3>소속 원 정보</h3>
          <FlatButton label="유치원 등록하기" primary={true}/>
        </div>
        {this.state.kinders.map(this.renderKinderCard)}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  kinders: state.login.user.kinders
})


export default connect(mapStateToProps, null)(KinderContainer)
