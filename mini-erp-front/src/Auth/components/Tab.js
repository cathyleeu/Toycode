import React , {Component} from 'react';
import './Tabs.css';


class Tab extends Component {
  render() {
    return (
      <div className="tab-content">
        {this.props.children}
      </div>
    )
  }
}

export default Tab;
