import React, { PureComponent } from 'react'
import { BodyContainer, DirectionContainer } from '../Components'
import StageChart from './StageChart'
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
    this.selectChapter = this.selectChapter.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
    this.renderChapter = this.renderChapter.bind(this)
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
    // console.log(e.target.dataset.name);
    let selectedTitle = e.target.dataset.name,
        selectedChapter = Object.keys(this.state.bookIndex[selectedTitle])
    // console.log(this.state.bookIndex[selectedTitle])
    this.setState({
      selectedTitle,
      selectedChapter
    })
  }
  selectChapter(e) {
    let { title, chapter } = e.target.dataset,
        selectedData = this.state.bookIndex[title][chapter];
    this.setState({
      selectedData
    })
  }
  renderTitle(t, i){
    let level = t[0].toLocaleUpperCase(),
        volume = t.split(/[a-z]/)[1];
    return (
      <p key={i} onClick={this.selectTitle} data-name={t}> 키즈씽킹 {level}-{volume}</p>
    )
  }
  renderChapter(chapter) {
    return (
      <div>
        { chapter.map(
           (ch, i) => <p key={i} onClick={this.selectChapter} data-title={this.state.selectedTitle} data-chapter={ch}> {i+1} 주차  {ch} </p>)
        }
      </div>
    )
  }
  renderDataChart(data) {
    let stage = Object.keys(data)
    // if(stage.length > 0){
    //   debugger
    // }

    return stage.map((s,i) => <StageChart key={i} data={data[s][0]}></StageChart>)
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
          <div className="dash_title">
            { this.state.title.map(this.renderTitle)}
          </div>
          <div className="dash_chapter">
            {this.renderChapter(this.state.selectedChapter)}
          </div>
          <div className="dash_chart">
            {this.renderDataChart(this.state.selectedData)}
          </div>
        </DirectionContainer>
      </BodyContainer>
    )
  }
}
