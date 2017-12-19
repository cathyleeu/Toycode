import React from 'react' //, { PureComponent } 

// export default class StageChart extends PureComponent {
//   render(){
//     console.log(this.props);
//     return (
//       <div>
//
//       </div>
//     )
//   }
// }


const StageChart = ({data}) => {
  // console.log(data);
  return (
    <div>
      block: {data.block}
      problem: {data.problem}
      duration: {data.duration}
      score: {data.score}
    </div>
  )
}
export default StageChart
