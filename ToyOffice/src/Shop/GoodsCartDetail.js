import React, {PureComponent} from 'react'
import { FlatButton } from 'material-ui'


class GoodsCartDetail extends PureComponent {
  state = {
    qutt: this.props.s.amount || 0
  }
  handleChange = e => {
    const { s } = this.props;
    this.setState({[e.target.name]: e.target.value})
    this.props.enterGoodsQutt(s.code, parseInt(e.target.value, 10))
  }
  render(){
    const { s } = this.props
    return(
      <tr className="Select-Goods-Detail">
        <td className="lang">{s.lang === 'ko' ? '국문' : '영문'}</td>
        <td className="title">{s.title}</td>
        <td className="level">{s.level}</td>
        <td className="volume">{s.volume}</td>
        <td className="order">
          <input
            placeholder='주문수량'
            type='number'
            name='qutt'
            value={ s.amount ? parseInt(s.amount, 10) : "" }
            onChange={this.handleChange}
            min='1'
          />
          <FlatButton
            style={{width: '20%'}}
            label="삭제"
            secondary={true}
            onClick={() => this.props.handleDeleteId(s)} />
        </td>
      </tr>
    )
  }
}

export default GoodsCartDetail
