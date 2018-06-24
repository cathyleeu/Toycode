import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'


const DescribeName = ({
  name,
  decs,
  children
}) => (
    <li>
      {name}
      <ul>
        <li>{decs}</li>
        {children}
      </ul>
    </li>
)

const ReportsSubHeader = ({
  name,
  display
}) => {
  let style = {
    display
  }
  return (
    <p className="reports-sub" style={style}>{name}</p>
)}

const ReportsGuideCont = ({
  children
}) => (
  <div className="reports-guide-cont">
    <ul className="reports-guide">
      {children}
    </ul>
  </div>
)

const CommentSelect = ({
  level,
  onChange
}) => (
  <label> {level}
    <input type="radio" name="select" value={level} onChange={onChange}/>
  </label>
)




const ReportCard = ({
  reportTitle,
  studentName,
  studentValue,
  totalAverage,
  classAverage,
  code
}) => {
  if(code === "engloo" && reportTitle === "점수") {
    reportTitle = "해결한 문제"
  }
  return(
    <div className="report_card">
      <div className="report_card_header">
        {reportTitle}
      </div>
      <div className="report_card_foot">
        <div>
          <p>{studentName}</p>
          <p>{studentValue}</p>
        </div>
        <div>
          <p>전체 평균</p>
          <p>{totalAverage}</p>
        </div>
        <div>
          <p>반 평균</p>
          <p>{classAverage}</p>
        </div>
      </div>
    </div>
  )
}


class ReportByStudent extends PureComponent {
  constructor(){
    super()
    this.state = {
      comment: "",
      select: "",
      englooComment : {
        A1: "A1 입니다.",
        A2: "A2 입니다.",
        A3: "A3 입니다.",
        A4: "A4 입니다.",
        A5: "A5 입니다.",
        A6: "A6 입니다.",
        A7: "A7 입니다.",
        A8: "A8 입니다.",
        A9: "A9 입니다.",
        A10: "A10 입니다.",
        A11: "A11 입니다.",
        A12: "A12 입니다."
      },
      guideComment: {
        "A": "키즈씽킹의 실습 문제는 다양한 방법의 정답이 있을 수 있으며, 블록을 많이 사용해도 정답으로 인정됩니다. 보다 적은 블록을 사용하는 것은 사고력 훈련을 하는데 도움이 되므로, 학생이 실습 문제를 풀때 되도록 적은 블록을 쓸 수 있도록 유도하고 있습니다. 반 평균보다 블록을 적게 사용했다는 것은 보다 깔끔하고 효과적으로 문제를 풀었다고 볼 수 있습니다.",
        "B": "키즈씽킹의 문제는 어른도 한번에 풀기에 복잡할수도 있습니다. 따라서 블록을 조금씩 조립해 가면서 중간 결과를 예측하며 문제를 풀게됩니다. 적은 시도 횟수로 문제를 풀 수 있다면 그만큼 머리속으로 예측을 잘 한다고 볼 수 있습니다. 그러나 중간 결과를 확인하면서 문제를 푸는 것은 마치 수학에서 검산을 하는 것과 같기 때문에 시도횟수가 많다고 해서 문제를 잘 풀지 못하는 것이 아닙니다.",
        "C": "키즈씽킹은 매주 새로운, 다양한 문제를 제공하고 있습니다. 제공되는 문제들은 쉬움, 보통, 어려움의 3단계로 나눠져 있습니다. 그 중에서 쉬움에 해당하는 문제만 매주 풀어도 교재 수준을 따라가는데 문제가 없습니다. 쉬운 문제만 풀더라도 유아수준에서는 충분히 사고력에 도움을 받을 수 있으므로, 조금 어렵더라도 문제를 끝까지 풀 수 있도록 독려해주세요."
      },
      header: "키즈씽킹",
      subHead: "",
      scoreName : "점수(포인트)",
      reportsResults: {},
      lebel: "",
      loaded: false
    }
  }
  componentWillMount(){
    let { classId, level, code, userId, school, className, name } = this.props;
    let chapter;

    if(code === "engloo") {
      this.setState({
        header: "키즈코딩",
        subHead : `${name} (${level.split("_")[1].toLocaleUpperCase()})`,
        scoreName : "해결한 문제"
      })
      chapter = level.toLocaleLowerCase();
    } else {
      this.setState({
        subHead : `${school} ${className} ${name} (${level}레벨)`
      })
      // 대구 지사에 맞춰서 만든 것이기 때문에 챕터를 이런식으로 고정하였음.
      chapter = `${level}0_w0`.toLocaleLowerCase();
    }
    this.props.requestedReports(classId, userId, chapter)
  }
  componentWillReceiveProps(newProps){
    if(newProps.reportsResults !== this.props.reportsResults) {
      let { chapterAves } = newProps.reportsResults;
      if(chapterAves) {
        chapterAves = chapterAves.map(ch => {
          let vol = ch.name.split("_")[2].match(/\d+/)[0];
          ch.name = `${vol}권`
          return ch
        })

        chapterAves = chapterAves.sort((a, b) => {
          return +a.name.match(/\d+/) > +b.name.match(/\d+/)
        })
       this.setState({
         reportsResults: {
           ...newProps.reportsResults,
           chapterAves
         },
         loaded: true
       })
      }
    }
  }
  handleChange = (e) => {
    if(e.target.name === "select") {
      this.setState({
        comment: this.state.guideComment[e.target.value]
      })
      return;
    }
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  renderReportCards(target) {
    return (
      <ReportCard
       studentName={this.props.name}
       code={this.props.code}
       {...this.state.reportsResults[target]}
     />
    )
  }
  renderComment(code) {
    if(code === "engloo") {
      let level = this.props.level.split("_")[1].toLocaleUpperCase()
      return (
        <div className="reports-bottom">
          <ReportsSubHeader name="의견 및 평가" display="inline"/>
          <textarea
            name="comment"
            maxLength="500"
            value={this.state.englooComment[level]} />
        </div>
      )
    } else {
      return (
        <div className="reports-bottom">
          <ReportsSubHeader name="의견 및 평가" display="inline"/>
          <CommentSelect level="A" onChange={this.handleChange}/>
          <CommentSelect level="B" onChange={this.handleChange}/>
          <CommentSelect level="C" onChange={this.handleChange}/>
          <textarea
            name="comment"
            onChange={this.handleChange}
            maxLength="500"
            placeholder="500자 미만으로 작성해주세요."
            value={this.state.comment} />
        </div>
      )
    }
  }
  render(){
    if(!this.state.loaded) {
      return false
    }
    return (
      <section className="print">
        <div className="reports-top">
          <h1>{this.state.header} 학습 이력 결과표</h1>
          <p>{this.state.subHead}</p>
        </div>
        <div className="reports-body">
          <div className="reports-chart-cont">
            <ReportsSubHeader name="키즈씽킹 학습 현황 그래프"/>
            <ComposedChart width={500} height={220} data={this.state.reportsResults.chapterAves}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip/>
              <Legend/>
              <CartesianGrid stroke='#f5f5f5'/>
              <Bar dataKey="학생블럭수" stackId="a" fill="#82ca9d" />
              <Bar dataKey="반평균블럭" fill="#ffc658"/>
              <Line type='monotone' dataKey='학생시도횟수' stroke='#ff7300'/>
              <Line type='monotone' dataKey='반평균시도횟수' stroke='#8884d8'/>
           </ComposedChart>
         </div>
         <ReportsGuideCont>
           <DescribeName name="막대 그래프">
             <li>학생블럭수(녹색)</li>
             <li>성공까지 블록을 사용한 수</li>
             <li>반평균블럭(주황색)</li>
             <li>성공까지 블록을 사용한 반 평균 수</li>
           </DescribeName>
           <DescribeName name="꺾은선 그래프">
             <li>학생시도횟수(주황색)</li>
             <li>성공까지 다시 시도한 횟수</li>
             <li>반 평균시도횟수(보라색)</li>
             <li>성공까지 다시 시도한 반 평균 횟수</li>
           </DescribeName>
         </ReportsGuideCont>
        </div>
        <div className="reports-body">
         <div className="reports-chart-cont">
           <ReportsSubHeader name="키즈씽킹 학습 이력 통계"/>

           {this.renderReportCards('block')}
           {this.renderReportCards('failed')}
           {this.renderReportCards('duration')}
           {this.renderReportCards('score')}

         </div>
          <ReportsGuideCont>
            <DescribeName name="사용 블럭 수" decs="문제를 풀기위해 사용한 평균 블록 수 입니다. 적은 블록을 사용할 수록 좋아요!"/>
            <DescribeName name="재시도 횟수" decs="답을 찾기 위하여 재시도한 횟수입니다. 틀린 경우 스스로 문제점을 고칠 수 있어요."/>
            <DescribeName name="풀이시간" decs="문제를 풀이하는데 들어가는 평균 시간입니다."/>
            <DescribeName name={this.state.scoreName} decs="문제를 풀때마다 포인트를 모을 수 있어요. 포인트를 모으기 위해서 추가 문제를 풀어 보아요."/>
          </ReportsGuideCont>
        </div>
        {this.renderComment(this.props.code)}
      </section>
    )
  }
}

class ReportsContainer extends Component {
  constructor(){
    super()
    this.state = {
    }
    this.renderReportsByStudent = this.renderReportsByStudent.bind(this)
  }
  componentWillMount(){
    let reportData = this.props.location.query;

    // let getUrl = decodeURIComponent(window.location.href)
    // let reportData = getUrl.split("?")[1].split("&")
    // reportData.forEach(r => {
    //   if(r.split("=")[0] === "students") {
    //     obj[r.split("=")[0]] = r.split("=")[1].split(",")
    //     return;
    //   }
    //   obj[r.split("=")[0]] = r.split("=")[1]
    // })

    reportData.students = reportData.students.split(",")
    this.setState({
      ...reportData
    })
    history.replaceState("", "", "reports");

  }
  renderReportsByStudent(name, id) {
    let { students, userId, ...stateRest } = this.state;
    userId = stateRest.code === "engloo" ? userId : id;
    students = [];
    return <ReportByStudent
              key={id}
              name={name}
              userId={userId}
              students={students}
              reportsResults={this.props.reportsResults[userId]}
              requestedReports={this.props.requestedReports}
              {...stateRest}
            />
  }
  render(){
    return (
        <div id="print-reports">
          <div className="print-guide">
            <h4>이력관리 사용 가이드: 의견 및 평가</h4>
            <pre>
              {this.state.code === "engloo"
                ? ""
                : "의견 및 평가 란 옆 A,B,C 중 학생에게 를 선택하면 기본적 코멘트 가이드가 입력됩니다."}
              <br></br>
              데이터가 없는 경우, 학생들의 리포트가 뜨지 않습니다.
            </pre>
            <button onClick={() => window.print()}>인쇄하기</button>
          </div>
          {this.state.students.map(this.renderReportsByStudent)}
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  reportsResults: state.issuedLogin.reports
})

export default connect(mapStateToProps, actions)(ReportsContainer)
