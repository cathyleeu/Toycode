import React, {PureComponent} from 'react'
import moment from 'moment-timezone'
import AllUserKnderClass from './AllUserKnderClass'

class AllUserKinders extends PureComponent {
  state = {
    allKCNames: this.props.allKCNames,
    kloaded: false
  }
  renderKClassInfo = (kdc, i) => {
    let { allKCNames } = this.state; //한 반만 나온다.. ㅎㅎㅎ
    let names = allKCNames.find(f => f.classId === kdc.code)
    let mon = moment().set({year:2017, month:3});
    if(this.props.kinder.parentId === "C00071") {
      mon = moment().set({year:2017, month:2}); // YBM 대구지사 3월로 고정 예외처리
    }
    return <AllUserKnderClass key={i} kdc={kdc} kinder={this.props.kinder} allKCNames={names} mon={mon}/>
  }
  render(){
    let { kinder } = this.props;
      return(
        <div className="User-Kinders">
          <div className="User-Kinder-Info">
            <p>유치원 로그인 발급</p>
            <p>유치원 명: {kinder.name} | {kinder.phone} | <strong>접속주소코드 <a href={`https://toycode.org/code/${kinder.url}`} target="_blank">toycode.org/code/{kinder.url}</a></strong></p>
            <p>유치원 담당자 : {kinder.manager} | {kinder.managerPh}</p>
          </div>
          <div className="Uesr-Kinder-Addr">
            <p>유치원 주소 : {kinder.zipNo} | {kinder.roadAddr} | {kinder.detailAddr}</p>
          </div>
          <div className="User-Kinder-Classes">
            {kinder.kinderClasses.map(this.renderKClassInfo)}
          </div>
        </div>
      )
    }
}

export default AllUserKinders;
