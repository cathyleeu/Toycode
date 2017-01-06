import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './mui_raw_theme'
import Header from './header'




export default class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={theme}>
          <div>
            <Header />
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>

    );
  }
}


//
//
//
// const App = () => (
//   <MuiThemeProvider muiTheme={theme}>
//       <Header />
//       {this.props.children}
//   </MuiThemeProvider>
// )
//
//
// export default App
