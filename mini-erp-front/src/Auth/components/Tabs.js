import React , {Component} from 'react';
import './Tabs.css';


class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: this.getSelectedIndex()
    }
  }
  getSelectedIndex() {
    let selectedIndex = 0
    React.Children.forEach(this.props.children, function(child, index) {
      if (child.props.selected) {
        selectedIndex = index
      }
    })
    return selectedIndex
  }
  getNavItems() {
    return React.Children.map(this.props.children, function(child, index) {
      if (this.state.selectedIndex === index) {
        return (<span className="selected">{child.props.title}</span>)
      } else if (child.props.disabled) {
        return (<span className="disabled">{child.props.title}</span>)
      } else {
        return (<span onClick={() => this.setState({ selectedIndex: index })}>{child.props.title}</span>)
      }
    }.bind(this))
  }
  render() {
    let selectedChild = React.Children.toArray(this.props.children)[this.state.selectedIndex]
    let style = {
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight}px`,
          overflow: 'scroll'
        }
    return (
      <div className="tabs signUp-container" style={style}>
        <div className="tab-nav">
          {this.getNavItems()}
        </div>
        {selectedChild}
      </div>
    )
  }
}

export default Tabs;
