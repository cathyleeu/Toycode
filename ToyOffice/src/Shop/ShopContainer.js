import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

import './index.css'

import ComingSoon from './ComingSoon'
import GoodsList from './GoodsList'
import GoodsCartList from './GoodsCartList'
import GoodsDelivery from './GoodsDelivery'

import {
  Tabs,
  Tab
} from 'material-ui/Tabs';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  BodyContainer
} from '../Components'


class ShopContainer extends PureComponent{
  state = {
    lang: 'ko',
    volume: '',
    goods: [],
    finished: false,
    stepIndex: 0,
    goodsInCart: this.props.selected,
  }

  componentDidMount(){
    this.props.fetchBooks()
    this.setState({
      goods: this.props.goods
    })
  }

  componentWillReceiveProps(newProps){
    this.setState({
      goods: newProps.goods,
      goodsInCart: newProps.selected
    })
  }
  handleNext = () => {
    const { stepIndex, goodsInCart} = this.state,
          { deliveryInfo, selected, user } = this.props;

    switch (stepIndex) {
      case 0:
        if(goodsInCart.length !== 0){
          return this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
          });
        } else {
          return alert('상품을 선택해주세요.')
        }
      case 1:
        let filterZero = [];
        goodsInCart.forEach(
          f => {
            if( !f.amount || !f.hasOwnProperty("amount")){
              filterZero.push(f)
            }
          }
        )
        if(filterZero.length === 0){
          return this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
          })
        } else {
          return alert('모든 상품의 수량을 입력해주세요.')
        }
       case 2:
        if(!deliveryInfo.phone){
          return alert('연락처를 입력하세요.')
        } else if(!deliveryInfo.recipient){
          return alert('수령인을 입력하세요.')
        } else {
          if(confirm('주문을 완료 하시겠습니까?')){
            this.props.requestGoodsOrder(deliveryInfo, selected, user)
            return this.setState({
              stepIndex: stepIndex + 1,
              finished: stepIndex >= 2,
            });
          } else {
            return false;
          }
        }
      default:
        return this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
        });
    }
  }
  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }
  // handleChange = e => {
  //   this.setState({[e.target.name]:e.target.value})
  // }
  handleDeleteId = (s) => {
    if(confirm(`선택하신 ${s.title} ${s.level} ${s.volume}을 삭제하시겠습니까?`)){
      this.props.goodsDelete(s.code)
    } else {
      return false
    }
  }
  renderStepActions = (step) => {
    const { stepIndex } = this.state;
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? '주문하기' : '다음'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="뒤로"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  handleSelectVal = (name, val) => this.setState({[name]: val})

  renderGoods = () => {
    //TODO: 리팩토링
    if(this.state.goods.length === 0){
      return <ComingSoon />
    }
    // console.log(this.state.goods)
    if(this.state.volume){ //권을 선택 한 상황
      let goods = this.state.goods.filter(g => g.lang === this.state.lang && g.volume === this.state.volume)
      if(goods.length === 0){
        return <ComingSoon />
      }
      return <GoodsList goods={goods} lang={this.state.lang} addToCartUnsafe={this.props.addToCartUnsafe} selected={this.props.selected}/>
    } else {
      let goods = this.state.goods.filter(g => g.lang === this.state.lang)
      return <GoodsList goods={goods} lang={this.state.lang} addToCartUnsafe={this.props.addToCartUnsafe} selected={this.props.selected}/>
    }
  }
  renderSelectedGoods = () => {
    let { goodsInCart } = this.state;
    if(goodsInCart.length === 0){
      return <div>상품을 선택해 주세요.</div>
    } else {
      return <GoodsCartList {...this.props} goodsInCart={goodsInCart} handleDeleteId={this.handleDeleteId}/>
    }
  }
  render(){
    const {finished, stepIndex, goodsInCart} = this.state;
    let lang = [{lang:'ko', name: '한글'}, {lang:'en', name: 'English'}]
    let vol = [
      {volume:'1', sub: '1권'},
      {volume:'2', sub: '2권'},
      {volume:'3', sub: '3권'},
      {volume:'4', sub: '4권'},
      {volume:'5', sub: '5권'},
      {volume:'5.5', sub: '여름특별호'},
      {volume:'6', sub: '6권'},
      {volume:'7', sub: '7권'},
      {volume:'8', sub: '8권'},
      {volume:'9', sub: '9권'},
      {volume:'10', sub: '10권'},
      {volume:'10.5', sub: '겨울특별호'}]
    const styles = {
      line:{
        height: 30,
      },
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return(
      <BodyContainer>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>
              <div className="Shop-Goods-desc">
                <h3>키즈씽킹 주문</h3>
                <p>언어, 권 등을 선택해주세요.</p>
              </div>
            </StepLabel>
            <StepContent>
              <div className="Shop-Goods">
                <div className="Shop-Select-vol">
                  <Tabs
                    onChange={(val) => this.handleSelectVal('lang', val)}
                    tabItemContainerStyle={styles.line} // inkBarStyle={styles.line} // 선택된 바 스타일
                    >
                      {lang.map((l,i) => (
                        <Tab label={l.name} buttonStyle={styles.line} value={l.lang} key={i} >
                          <div className="Shop-Select-vol-num">
                          {vol.map((v,i) => <button key={i} className='Shop-Select-btn' value={v.volume} onClick={() => this.handleSelectVal('volume', v.volume)}>{v.sub}</button>)}
                          </div>
                        </Tab>
                      ))}
                  </Tabs>
                </div>
                <div className="Shop-Select-level">
                  {this.renderGoods()}
                </div>
              </div>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <div className="Shop-Goods-desc">
                <h3>장바구니 담기</h3>
                <p>수량을 입력해주세요.</p>
              </div>
            </StepLabel>
            <StepContent>
              <div className="Cart-Goods">
                <div className="Goods-Cart-list">
                  {this.renderSelectedGoods()}
                </div>
              </div>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <div className="Shop-Goods-desc">
                <h3>배송지 입력</h3>
                <p>주소 및 전화번호를 입력해주세요.</p>
              </div>
            </StepLabel>
            <StepContent>
              <div className="Cart-Goods">
                <div className="Goods-Cart-list">
                  <GoodsDelivery goodsInCart={goodsInCart} {...this.props}/>
                </div>
              </div>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <div>
            <p style={{margin: '20px 0', textAlign: 'center'}}>
              주문이 완료 되었습니다.</p>
              <p style={{margin: '20px 0', textAlign: 'center'}}>
                새로운 주문을 하시려면,
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                여기
              </a> 를 클릭하세요.
            </p>
          </div>
        )}
      </BodyContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  goods: state.goods.books,
  selected: state.goods.selectedGoods,
  deliveryInfo: state.goods.deliveryInfo,
  user: state.login.user,
})

export default connect(mapStateToProps, actions)(ShopContainer)
