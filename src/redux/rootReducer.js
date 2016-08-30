import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { routerReducer } from 'react-router-redux'
import * as Actions from './actions'

// reducer for user auth and storing user data
const user = createReducer({
  [Actions.loginLoading]: (state, payload) => {
    return { loading: true }
  },
  [Actions.loginSuccess]: (state, payload) => {
    return { user: payload }
  },
  [Actions.loginFail]: (state, payload) => {
    return { error: payload }
  }
}, {})

// notifications reducer
const initialSnackBarProps = {
  open: false,
  message: '',
  autoHideDuration: 3000
}
const snackbar = createReducer({
  [Actions.loginFail]: (state, payload) => {
    return { ...state, open: true, message: payload }
  },
  [Actions.requestCloseSnackBar]: (state, payload) => {
    return { ...state, open: false }
  }
}, initialSnackBarProps
)

// dialog box reducer
const initialDialogProps = {
  title: '',
  modal: false,
  open: false
}

const dialog = createReducer({
  [Actions.openDialog]: (state, payload) => {
    return { ...state, open: true, ...payload }
  },
  [Actions.requestCloseDialog]: (state, payload) => {
    return { ...state, open: false }
  }
}, initialDialogProps)

const rootReducer = combineReducers({
  user,
  snackbar,
  dialog,
  routing: routerReducer
})

export default rootReducer
