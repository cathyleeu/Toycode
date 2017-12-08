import React, { PureComponent } from 'react'



export default class ToyCodeSelect extends PureComponent {
  render() {
    return (
      <div className="top_aligned">
      <label className="toycode_label">{this.props.labelName}</label>
        <select
          className="toycode_select"
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          {this.props.options.map((o, i) => <option key={i} value={o.value}>{o.name}</option>)}
        </select>
      </div>
    )
  }
}
