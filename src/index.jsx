import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import Container from './Container'
import Home from './routes/Home'
import Login from './routes/Login'
import store from './redux/configureStore'
import isEmpty from 'lodash/isEmpty'
import './styles/index.less'

const NoMatch = () => {
  return (
    <h1>404 not found</h1>
  )
}

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

// onEnter hooks for login and home page to redirect if necessary
const checkAuth = function (nextState, replace) {
  const { user } = store.getState()
  if (isEmpty(user)) {
    replace('/')
  }
}
const checkSkipAuth = function (nextState, replace) {
  const { user } = store.getState()
  if (!isEmpty(user)) {
    replace('/home')
  }
}

var Index = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <Route path='/' component={Container}>
            <IndexRoute component={Login} onEnter={checkSkipAuth} />
            <Route path='home' component={Home} onEnter={checkAuth} />
            <Route path='*' component={NoMatch} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
