import React, { PureComponent } from 'react'

export default class ReportCard extends PureComponent {
  render(){
    // reportTitle : 사용 블럭 수
    return (
      <div className="report_card">
        <div className="report_card_header">
          {this.props.reportTitle}
        </div>
        <div className="report_card_body">
          <p>{this.props.studentName}</p>
          <p>{this.props.studentValue}</p>
        </div>
        <div className="report_card_foot">
          <div>
            <p>전체 평균</p>
            <p>{this.props.totalAverage}</p>
          </div>
          <div>
            <p>반 평균</p>
            <p>{this.props.classAverage}</p>
          </div>
        </div>
      </div>
    )
  }
}
