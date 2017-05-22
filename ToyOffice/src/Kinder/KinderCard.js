import React, { PureComponent } from 'react'
import KinderCardInput from './KinderCardInput'

class KinderCard extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      name: props.name,
      lang: props.lang,
      phone: props.phone,
      zipNo: props.zipNo,
      roadAddr: props.roadAddr,
      detailAddr: props.detailAddr,
      manager: props.manager,
      managerPh: props.managerPh,
      classes: props.kinderClasses,
      modi: false
    }
    this.handleModi = this.handleModi.bind(this)
  }

  handleModi(status){
    this.setState({modi: status})
  }
  render(){
    console.log(this.props);
    let { name, lang, phone, zipNo, roadAddr, detailAddr, manager, managerPh, modi, classes } = this.state,
        kinderClasses = classes.map((cl, i) => <div key={i}>{cl.className}</div>);

    return(
      <div className="KinderCard-Cont">
        <div className="KinderCard-top">
          {name}
          {this.state.modi
            ? (
              <div>
                <button onClick={() => this.handleModi(false)}>유치원 수정완료</button>
                <button>반 추가</button>
              </div>
            )
            : <button onClick={() => this.handleModi(true)}>유치원 수정하기</button>
          }
        </div>
        <div className="KinderCard-info">
          <div className="KinderCard-info-l">
            <div>
              <KinderCardInput label={'전화번호'} value={phone} modi={!modi}/>
            </div>
            <div className="KinderCard-info-addr">
              <KinderCardInput label={'주소'} value={zipNo} modi={!modi}/>
              <KinderCardInput value={roadAddr} modi={!modi}/>
              <KinderCardInput value={detailAddr} modi={!modi}/>
            </div>
            <div className="KinderCard-info-mng">
              <KinderCardInput label={'원 담당자'} value={manager} modi={!modi}/>
              <KinderCardInput label={'담당자 전화번호'} value={managerPh} modi={!modi}/>
            </div>
          </div>
          <div>
            <KinderCardInput label={'언어'} value={lang} modi={!modi}/>
            {kinderClasses}
          </div>
        </div>
      </div>
    )
  }
}

export default KinderCard
