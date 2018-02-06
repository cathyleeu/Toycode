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
  classAverage
}) => (
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


class ReportByStudent extends PureComponent {
  constructor(){
    super()
    this.state = {
      comment: "",
      select: "",
      guideComment: {
        "A": "우수한 학생입니다.",
        "B": "보통 학생입니다.",
        "C": "미흡한 학생입니다."
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
  render(){
    const data = [
      {name: '1권', 미완료: 5, 블럭초과: 40, 완료: 240, 반평균블록: 80, 사용한블록: 140},
      {name: '2권', 미완료: 6, 블럭초과: 98, 완료: 210, 반평균블록: 96, 사용한블록: 150},
      {name: '3권', 미완료: 13, 블럭초과: 80, 완료: 220, 반평균블록: 98, 사용한블록: 89},
      {name: '4권', 미완료: 14, 블럭초과: 29, 완료: 200, 반평균블록: 120, 사용한블록: 128},
      {name: '5권', 미완료: 5, 블럭초과: 18, 완료: 181, 반평균블록: 110, 사용한블록: 100},
      {name: '특별상권', 미완료: 14, 블럭초과: 20, 완료: 250, 반평균블록: 180, 사용한블록: 170}
    ];
    let { school, className, level, name } = this.props;
    return (
      <section className="print">
        <div className="reports-top">
          <h1>키즈씽킹 학습 이력 결과표</h1>
          <p>{school} {className} {name} ({level}레벨)</p>
        </div>
        <div className="reports-body">
          <div className="reports-chart-cont">
            <ReportsSubHeader name="키즈씽킹 학습 현황 그래프"/>
            <ComposedChart width={500} height={220} data={data}
                margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip/>
              <Legend/>
              <CartesianGrid stroke='#f5f5f5'/>
              <Bar dataKey="블럭초과" stackId="a" fill="#A84546" />
              <Bar dataKey="완료" stackId="a" fill="#82ca9d" />
              <Bar dataKey="미완료" fill="#ffc658"/>
              <Line type='monotone' dataKey='반평균블록' stroke='#ff7300'/>
              <Line type='monotone' dataKey='사용한블록' stroke='#8884d8'/>
           </ComposedChart>
         </div>
         <ReportsGuideCont>
           <DescribeName name="막대 그래프">
             <li>미완료 (주황색)</li>
             <li>아직풀지못한문제수</li>
             <li>블록초과(적색)</li>
             <li>기준보다 많은 블록을 사용</li>
             <li>완료(녹색)</li>
             <li>최소의 블록을 사용한 경우</li>
           </DescribeName>
           <DescribeName name="꺾은선 그래프">
             <li>반평균블록(파랑색)</li>
             <li>반평균블록사용수</li>
             <li>사용한블록(보라색)</li>
             <li>원아가 사용한 블록의 수</li>
           </DescribeName>
         </ReportsGuideCont>
        </div>
        <div className="reports-body">
         <div className="reports-chart-cont">
           <ReportsSubHeader name="키즈씽킹 학습 이력 통계"/>
           <ReportCard
            reportTitle="사용 블럭 수"
            studentName={name}
            studentValue={10}
            totalAverage={8.5}
            classAverage={9.5}
          />
          <ReportCard
            reportTitle="시도 횟수"
            studentName={name}
            studentValue={3}
            totalAverage={4.2}
            classAverage={2.3}
          />
          <ReportCard
            reportTitle="풀이 시간"
            studentName={name}
            studentValue={"02:22"}
            totalAverage={"03:05"}
            classAverage={"02:25"}
          />
          <ReportCard
            reportTitle="점수"
            studentName={name}
            studentValue={11}
            totalAverage={12.5}
            classAverage={7.5}
          />
         </div>
          <ReportsGuideCont>
            <DescribeName name="사용 블럭 수" decs="문제를 풀기위해 사용한 평균 블록 수 입니다. 적은 블록을 사용할 수록 좋아요!"/>
            <DescribeName name="재시도 횟수" decs="답을 찾기 위하여 재시도한 횟수입니다. 틀린 경우 스스로 문제점을 고칠 수 있어요."/>
            <DescribeName name="풀이시간" decs="문제를 풀이하는데 들어가는 평균 시간입니다."/>
            <DescribeName name="점수(포인트)" decs="문제를 풀때마다 포인트를 모 을 수 있어요. 포인트를 모으기 위해서 추가 문제를 풀어 보아요~"/>
          </ReportsGuideCont>
        </div>
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
    let getUrl = decodeURIComponent(window.location.href)
    let obj = {}
    let reportData = getUrl.split("?")[1].split("&")
    reportData.forEach(r => {
      if(r.split("=")[0] === "students") {
        obj[r.split("=")[0]] = r.split("=")[1].split(",")
        return;
      }
      obj[r.split("=")[0]] = r.split("=")[1]
    })
    obj.school = obj.school.split("+").join('')
    let fakeData = require('./fakeData').fakeData[obj.academyId]
    let data =  fakeData ? fakeData[obj.classId] : null
    this.setState({
      ...obj,
      data
    })
  }
  renderReportsByStudent(name, id) {
    return <ReportByStudent key={id} name={name} school={this.state.school} className={this.state.className} level={this.state.level}/>
  }
  render(){
    return (
        <div id="print-reports">
          <div className="print-guide">
            <h4>이력관리 사용 가이드: 의견 및 평가</h4>
            <pre>
              의견 및 평가 란 옆에
              에서 A,B,C 중 학생에게 를 선택하면 기본적 코멘트 가이드가 입력됩니다.
            </pre>
            {/* <ul>
              <li>A를 클릭한 경우 : 비교적 우수한 학생들에 대한 기본 코멘트 입니다.</li>
              <li>B를 클릭한 경우 : 아직풀지못한문제수</li>
              <li>C를 클릭한 경우 : 아직풀지못한문제수</li>
            </ul> */}
            <button onClick={() => window.print()}>인쇄하기</button>
          </div>
          {this.state.students.map(this.renderReportsByStudent)}
        </div>
    )
  }
}


const mapStateToProps = (state) => ({
  // recordedKinders: state.auth.user.kinders,
  // loginInfo: state.issuedLogin,
  // studentsNames: state.issuedLogin,
  // customerType: state.auth.user.customerType
})

export default connect(mapStateToProps, actions)(ReportsContainer)