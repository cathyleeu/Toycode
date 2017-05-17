import React, { PureComponent } from 'react'
import KinderCardInput from './KinderCardInput'

class KinderCard extends PureComponent{
  state = {
    name: this.props.name,
    lang: this.props.lang,
    phone: this.props.phone,
    zipNo: this.props.zipNo,
    roadAddr: this.props.roadAddr,
    detailAddr: this.props.detailAddr,
    manager: this.props.manager,
    managerPh: this.props.managerPh
  }
  render(){
    let { name, lang, phone, zipNo, roadAddr, detailAddr, manager, managerPh } = this.state;
    console.log(this.props);
    return(
      <div className="KinderCard-Cont">
        <div className="KinderCard-top">
          {name}
          <button>유치원 수정하기</button>
        </div>
        <div className="KinderCard-info">
          <div className="KinderCard-info-l">
            <div>
              <KinderCardInput label={'전화번호'} value={phone}/>
            </div>
            <div className="KinderCard-info-addr">
              <KinderCardInput label={'주소'} value={zipNo}/>
              <KinderCardInput value={roadAddr}/>
              <KinderCardInput value={detailAddr}/>
            </div>
            <div className="KinderCard-info-mng">
              <KinderCardInput label={'원 담당자'} value={manager}/>
              <KinderCardInput label={'담당자 전화번호'} value={managerPh}/>
            </div>
          </div>
          <div>
            <KinderCardInput label={'언어'} value={lang}/>
          </div>
        </div>
      </div>
    )
  }
}

export default KinderCard
