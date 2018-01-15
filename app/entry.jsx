import 'babel-polyfill'
import React from 'react'
import ReactDOM, {render} from 'react-dom'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Dashboard from './pages/dashboard/index.jsx'
import TrashPage from './pages/trash/index.jsx'
import Main from './components/main'
import store from 'core/store'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

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
      <Router>
        <Main>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/trash' component={TrashPage} />
          </Switch>
        </Main>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(wrapper, document.getElementById('content'))
