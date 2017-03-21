import React from 'react'

const Input = (props) => (
  <input
    className={props.className ? props.className : "form-control"}
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onBlur={props.onBlur}
    name={props.name}
    id={props.id}
  />
)

export default Input


// import React, {Component} from 'react'
//
// class Input extends Component {
//   render(){
//     const props = this.props;
//     return(
//       <input
//         className={props.className ? props.className : "form-control"}
//         type={props.type}
//         value={props.value}
//         placeholder={props.placeholder}
//         onChange={props.onChange}
//         onBlur={props.onBlur}
//         name={props.name}
//         id={props.id}
//       />
//     )
//   }
//   shouldComponentUpdate(nextProps, nextState){
//     if(this.props !== nextProps){
//       console.log('나 변했졍', nextProps)
//        return true
//      };
//   }
// }
