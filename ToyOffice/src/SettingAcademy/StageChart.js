import React, { PureComponent } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ReportCard from './ReportCard'

export default class StageChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };
  render(){
    let { data, stage, studentName } = this.props;
    if(this.props.data.length === 0){
      return false
    }
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={`${stage} 리포트`}
          subtitle={`${studentName} 학생`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <ReportCard
            reportTitle="사용 블럭 수"
            studentName={studentName}
            studentValue={data.block}
            totalAverage={8.5}
            classAverage={9.5}
          />
          <ReportCard
            reportTitle="시도 횟수"
            studentName={studentName}
            studentValue={data.failed}
            totalAverage={4.2}
            classAverage={2.3}
          />
          <ReportCard
            reportTitle="풀이 시간"
            studentName={studentName}
            studentValue={data.duration}
            totalAverage={"03:05"}
            classAverage={"02:25"}
          />
          <ReportCard
            reportTitle="점수"
            studentName={studentName}
            studentValue={data.score}
            totalAverage={12.5}
            classAverage={7.5}
          />
        </CardText>
      </Card>
    )
  }
}
