import React from 'react';
import { connect } from 'react-redux'
import './index.css'

//swich 로 바꾸기
const Feature = ({customerType}) => (
  <div className="Feature-Container has-Header">
    {customerType === "A" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
      </div>
      )
    }
    {customerType === "B" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
        <p>4. 회원 가입후 입력하신 메일로 전달된 가입 인증을 해주셔야 가입이 완료됩니다. </p>
        <p>5. 마이페이지에서 담당자 정보(회계담당자, 교육담당자)를 입력해주세요. </p>
        <p>6. 마이페이지에서 원 정보 수정을 클릭하여, 반 레벨을 꼭 수정하셔야 로그인 발급이 가능합니다.</p>
        <p><strong>4. 주문, 배송, 반품, 계산서, 거래명세서, 입금 문의는 </strong></p>
        <p><h5>ECC 본사(bk831004@ybmsisa.co.kr)로 문의해주세요.</h5></p>
        <p>7. 로그인 발급 문의 </p>
        <p>[문의방법] 카카오톡1:1채팅 </p>
        <p>- 카카오톡> 친구추가아이콘 > ID/플러스친구 검색 > 키즈씽킹 검색 > 친구추가 > 1:1채팅 실행> 문의입력 </p>
      </div>
      )
    }
    {customerType === "C" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
      </div>
      )
    }
    {customerType === "D" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
      </div>
      )
    }
    {customerType === "E" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
      </div>
      )
    }
    {customerType === "T" && (
      <div>
        <h5 className="auth-success">3/30 공지사항</h5>
        <p>1. 4월 로그인 스티커를 인쇄하실 수 있도록 업데이트 하였습니다.</p>
        <p>2. 4월 로그인 스티커는 4월 1일~4월 30일까지 사용하실 수 있습니다.</p>
        <p>3. 새로운 로그인 스티커를 사용하기 전에 태블릿에서 업데이트를 꼭 받아주세요.</p>
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
