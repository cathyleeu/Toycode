import React, { PureComponent } from 'react'
import { BodyContainer, DirectionContainer } from '../Components'
import StageChart from './StageChart'
import DashBoardSelect from './DashBoardSelect'
import { Paper } from 'material-ui';
import './index.css'

export default class StudentDashboard extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      ...props.location.state,
      title: [],
      bookIndex: {},
      selectedTitle: null,
      selectedChapter: [],
      selectedData: []
    }
    this.selectTitle = this.selectTitle.bind(this)
    this.renderDataChart = this.renderDataChart.bind(this)

  }
  componentWillMount(){
    let { kinderId, classId, _id } = this.state,
        data = require('./fakeData').fakeData[kinderId][classId][_id];

    let title = Object.keys(data),
        bookIndex = {};

    title.forEach(ch => {
      let name = ch.split("_")
      // console.log(data[ch]);
      // ch[0] = ch[0].replace(ch[0][0], `${ch[0][0].toLocaleUpperCase()}-`)
      bookIndex[name[0]] = {
        ...bookIndex[name[0]],
        [name[1]] : { ...data[ch]}
      };
    })
    title = Object.keys(bookIndex)
    this.setState({
      title, bookIndex
    })

  }
  selectTitle(e) {
    let selectedTitle = e.currentTarget.dataset.title,
        chapter= e.currentTarget.dataset.chapter,
        selectedChapter = Object.keys(this.state.bookIndex[selectedTitle]),
        selectedData = this.state.bookIndex[selectedTitle][chapter] || []

    this.setState({
      selectedTitle,
      selectedChapter,
      selectedData
    })
  }
  renderDataChart(data) {
    let stage = Object.keys(data)
    if(stage.length === 0){
      return <div className="empty_cont">프로그램과 주차를 선택해주세요.</div>
    }
    return stage.map((s,i) => {
      return <StageChart key={i} data={data[s][0]} stage={s} studentName={this.state.name}></StageChart>
    })
  }
  render() {

    return(
      <BodyContainer>
        <DirectionContainer direction="row">
          <p>{this.state.academyName}</p>
          <p>{this.state.className}</p>
          <p>{this.state.name}</p>
        </DirectionContainer>
        <DirectionContainer direction="row">
          <DashBoardSelect
            header={'프로그램'}
            menu={this.state.title}
            handleSelect={this.selectTitle}
            purpose={'title'}
          />
          <DashBoardSelect
            header={'주차'}
            handleSelect={this.selectTitle}
            selectedTitle={this.state.selectedTitle}
            menu={this.state.selectedChapter}
            purpose={'weekly'}
          />
          <Paper className="dash_chart">
            {this.renderDataChart(this.state.selectedData)}
          </Paper>
        </DirectionContainer>
      </BodyContainer>
    )
  }
}
