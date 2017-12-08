import React, { PureComponent } from 'react'
import ConditionalHeader from './ConditionalHeader'


export default class FilteredList extends PureComponent {
  constructor(){
    super()
    this.renderFilterLists = this.renderFilterLists.bind(this)
  }
  renderFilterLists(f, i) {
    return <div key={i}>{f.className}</div>
  }
  render(){
    let { name, kinderClasses } = this.props.filtered;
    return(
      <div>
        <ConditionalHeader
          headerStyle="Kinder-Cont-top"
          headerType="normal"
          name="createAcademyClass"
          headerTitle={name}
          btnTitle="반 등록하기"
          primary={true}
          onClick={(e) => this.props.handleModal(e)}
        />
        {kinderClasses.map(this.renderFilterLists)}
      </div>
    )
  }
}
