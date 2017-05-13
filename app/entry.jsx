import 'babel-polyfill'
import React from 'react'
import ReactDOM, {render} from 'react-dom'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dashboard from './pages/dashboard/index.jsx'
import store from 'core/store'

injectTapEventPlugin() //https://github.com/callemall/material-ui/issues/1011

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#673AB7'
  },
  spacing: {
    iconSize: 24
  },
  appBar: {
    height: 48
  }
})

const wrapper = (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(wrapper, document.getElementById('content'))
