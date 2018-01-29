import React, { PureComponent } from 'react'
import { Paper, Divider, Menu } from 'material-ui';

const style = {
  paper: {
    display: 'flex',
    // float: 'left',
    width: '18%',
    // margin: '16px 32px 16px 0',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0
  },
}

export default class DashBoardSelect extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      menu: [],
      menuWidth: window.innerWidth*0.13
    }
    this.renderMenu = this.renderMenu.bind(this)
  }
  componentWillMount(){
    if(this.props.purpose === "title") {
      let menu = this.props.menu.map((t, i) => {
          let level = t[0].toLocaleUpperCase(),
              volume = t.split(/[a-z]/)[1];
          return `${level}-${volume}`
      })
      this.setState({
        menu
      })
    }
  }
  componentWillReceiveProps(newProps) {
    if(newProps.menu !== this.props.menu) {
      this.setState({ menu: newProps.menu })
    }
  }
  renderMenu(m, i){
    // console.log(m);
    return <p
              key={i}
              className="menu_element"
              onClick={this.props.handleSelect}
              data-title={
                this.props.purpose === 'title'
                ? this.props.menu[i]
                : this.props.selectedTitle
              }
              data-chapter={m}
              >
              {m}
           </p>
  }
  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    let menuWidth = window.innerWidth*0.13;
    this.setState({
      menuWidth
    })
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  render(){
    // console.log(this.state.menuWidth);
    return (
      <Paper style={style.paper}>
        <Menu
          width={this.state.menuWidth}
        >
          <p className="menu_header">{this.props.header}</p>
          <Divider />
          {this.state.menu.map(this.renderMenu)}
        </Menu>
      </Paper>
    )
  }
  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
}
