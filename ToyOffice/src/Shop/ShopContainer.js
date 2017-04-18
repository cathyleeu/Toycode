import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import {Tabs, Tab} from 'material-ui/Tabs';
import './index.css'
import ComingSoon from './ComingSoon'
import GoodsList from './GoodsList'


class ShopContainer extends Component{
  state = {
    lang: 'ko',
    volume: '',
    goods: this.props.goods
  }
  componentDidMount(){
    this.props.fetchBooks()
  }
  componentWillReceiveProps(newProps){
    this.setState({goods: newProps.goods})
  }
  handleSelectVal = (name, val) => this.setState({[name]: val})
  renderGoods = () => {
    //TODO: 리팩토링
    if(this.state.goods.length === 0){
      return <ComingSoon />
    }
    if(this.state.volume){ //권을 선택 한 상황
      let goods = this.state.goods.filter(g => g.lang === this.state.lang && g.volume === this.state.volume)
      if(goods.length === 0){
        return <ComingSoon />
      }
      return <GoodsList goods={goods} />
    } else {
      let goods = this.state.goods.filter(g => g.lang === this.state.lang)
      return <GoodsList goods={goods} />
    }
  }
  render(){
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
      <div className="Child-Cont">
        <div className="Shop-Cont">
          {/* <div className="Shop-Search">Search Bar</div> */}
          <div className="Shop-Goods">
            <div className="Shop-Select-vol">
              <Tabs
                onChange={(val) => this.handleSelectVal('lang', val)}
                tabItemContainerStyle={styles.line} // inkBarStyle={styles.line} // 선택된 바 스타일
                >
                  {lang.map((l,i) => (
                    <Tab label={l.name} buttonStyle={styles.line} value={l.lang} key={i} >
                      {vol.map((v,i) => <button key={i} className='Shop-Select-btn' value={v.volume} onClick={() => this.handleSelectVal('volume', v.volume)}>{v.sub}</button>)}
                    </Tab>
                  ))}
              </Tabs>
            </div>
            <div className="Shop-Select-level">
              {this.renderGoods()}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({goods}) => ({
  goods: goods.books
})

export default connect(mapStateToProps, actions)(ShopContainer)
