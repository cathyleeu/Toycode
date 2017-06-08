import React, {Component} from 'react';
import { connect } from 'react-redux'
import './index.css'
import NewOrders from './NewOrders'

//swich 로 바꾸기
class Feature extends Component {
  render(){
    switch (this.props.customerType) {
      case "Z":
        return(
          <div className="Feature-Container has-Header">
             <NewOrders />
          </div>
        )
      case "B":
        return(
          <div className="Feature-Container has-Header">
            <h5 className="auth-success">공지사항</h5>
            <p>1. 마이페이지에서 담당자 정보(회계담당자, 교육담당자)를 입력해주세요. </p>
            <p>2. 마이페이지에서 원 정보 수정을 클릭하여, 반 레벨을 꼭 수정하셔야 로그인 발급이 가능합니다.</p>
            <strong>3. 주문, 배송, 반품, 계산서, 거래명세서, 입금 문의는 </strong>
            <h5>ECC 본사(bk831004@ybmsisa.co.kr)로 문의해주세요.</h5>
            <p>4. 고객 문의</p>
            <p>[문의방법] 카카오톡1:1채팅 </p>
            <p>- 카카오톡> 친구추가아이콘 > ID/플러스친구 검색 > 키즈씽킹 검색 > 친구추가 > 1:1채팅 실행> 문의입력 </p>
          </div>
        )
      default:
        return(
          <div className="Feature-Container has-Header">
            <p> 키즈씽킹 입금 계좌</p>
            <strong>우리은행 / (주)토이코드 : 1005-102-896893</strong>
             <h5 className="auth-success" style={{marginTop: '16px'}}>공지사항</h5>
             <p>1. 마이페이지에서 담당자 정보(회계담당자, 교육담당자)를 입력해주세요. </p>
             <p>2. 마이페이지에서 원 정보 수정을 클릭하여, 반 레벨을 꼭 수정하셔야 로그인 발급이 가능합니다.</p>
             <p>3. 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
             <p>4. 고객 문의</p>
             <p>[문의방법] 카카오톡1:1채팅 </p>
             <p>- 카카오톡> 친구추가아이콘 > ID/플러스친구 검색 > 키즈씽킹 검색 > 친구추가 > 1:1채팅 실행> 문의입력 </p>
           </div>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  customerType: state.auth.user.customerType
})

export default connect(mapStateToProps)(Feature)
// export default Feature
