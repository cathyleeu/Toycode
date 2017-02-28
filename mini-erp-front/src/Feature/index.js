import React from 'react';
import { connect } from 'react-redux'
import './index.css'


const Feature = ({customerType}) => (
  <div className="Feature-Container has-Header">
    {customerType === "A" && (
      <div>
        <h5 className="auth-success">지사 공지사항 준비중</h5>
      </div>
      )
    }
    {customerType === "B" && (
      <div>
        <h5 className="auth-success">2/13 ECC 공지사항</h5>
        <p>1. 회원 가입후 입력하신 메일로 전달된 가입 인증을 해주셔야 가입이 완료됩니다. </p>
        <p>2. 담당자 정보(회계담당자, 교육담당자)를 입력해주세요. </p>
        <p>3. 주문은 2/13부터 주문사이트와 유선으로 가능합니다. (주문: 070-5102-1822)</p>
        <p>4. 주문배송, 반품 문의 채널</p>
        <p>[문의방법1] 카카오톡1:1채팅 </p>
        <p>- 카카오톡> 친구추가아이콘 > ID/플러스친구 검색 > 키즈씽킹 검색 > 친구추가 > 1:1채팅 실행> 문의입력 </p>
        <p>[문의방법2] 유선 문의: 070-5102-1822</p>
      </div>
      )
    }
    {customerType === "T" && (
      <div>
        <h5 className="auth-success">원 공지사항 준비중</h5>
      </div>
      )
    }

  </div>
)


const mapStateToProps = (state) => ({
  customerType: state.auth.user.customerType
})

export default connect(mapStateToProps)(Feature)
// export default Feature
