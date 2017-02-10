import React, {Component} from 'react';
import ReturnGoodsByItem from './ReturnGoodsByItem'

class ReturnGoodsByIVes extends Component{
  constructor(props){
    super(props)
    this.state={
      refundType: 'return'
    }
  }
  setRefund = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  isReqRefund = () => {
    const {requestRefund} = this.props;

    console.log(requestRefund)

  }
  render(){
    const {invoice, requestRefund} = this.props;
    const ReturnGoodsNode = invoice.requestedGoods.map((goods,i) => (
      <ReturnGoodsByItem goods={goods} key={i} i={i}/>
    ))
    const refundCtx={
      userName: 'gg',
      userEmail : 'gg',
      userCode: 'gg',
      refundType: this.state.refundType,
      delivery: {
        to: 'gg',
        address: {
          zipNo:  'gg',
          roadAddr: 'gg',
          detailAddr: 'gg'
        },
        phone: 'gg'
      },
      requestDesc: "thanks"
    }
    return(
      <div className="returnGoods">
        <div className="returnGoods-top">
          <div className="returnGoods-top-h line-b">
            <h6>
              <input type="radio" name="refundType" value="return" id="return" onClick={this.setRefund}/>
              <label htmlFor="return"><strong>반품  |</strong></label>
              <input type="radio" name="refundType" value="change" id="change" onClick={this.setRefund}/>
              <label htmlFor="change"><strong>교환 신청서</strong></label>
            </h6>
            <p>신청 항목을 선택해주세요.</p>
          </div>
          <div className="returnGoods-top-info">
            <div className="returnGoods-applicant line-b">
              <p className="w-20 line-r">지사명</p><input className="w-30 line-r" placeholder="지사명 입력하는 곳"/>
              <p className="w-20 line-r">연락처</p><input className="w-30" placeholder="연락처 입력하는 곳"/>
            </div>
            <div className="returnGoods-addr line-b">
              <p className="w-20 line-r">주소</p><input className="w-80" placeholder="주소 입력하는 곳"/>
            </div>
          </div>
        </div>
        <div className="returnGoods-body">
          <div className="returnGoods-body-title">
            <p className="line-r w-10">번호</p>
            <p className="line-r w-50">품목</p>
            <p className="line-r w-20">주문 수량</p>
            <p className="w-20">반품 수량</p>
          </div>
          {ReturnGoodsNode}
          <div className="returnGoods-body-reason line-b">
            <div className="w-10 line-r"><p>상세사유</p></div>
            <div className="w-90">
              <div className="line-b">
                <div><input type="checkbox" /><p>난이도</p></div>
                <div><input type="checkbox" /><p>원아 수 조정</p></div>
              </div>
              <textarea placeholder="상세 사유를 적어주세요."></textarea>
            </div>
          </div>
        </div>

        {this.state.refundType === 'return' ? (
          <div>
            <p>반품 유의사항 </p>
            <a href="#">자세히보기</a>
            <button onClick={() => requestRefund(refundCtx)}>반품 신청하기</button>
          </div>
        ):(
          <div>
            <p>교환 유의사항 </p>
            <a href="#">자세히보기</a>
            <button>교환 신청하기</button>
          </div>
        )}
      </div>
    )
  }
}


export default ReturnGoodsByIVes;
