import { createAction } from 'redux-act'
import {default as users} from '../../fixtures/users'

export const loginLoading = createAction('Login Loading State')
export const loginSuccess = createAction('Login Success')
export const loginFail = createAction('Login Failure')
export const requestCloseSnackBar = createAction('User requests to close the notification snackbar')
export const openDialog = createAction('Open a dialog')
export const requestCloseDialog = createAction('Close a dialog')

// Super fake login, just verifies based of hardcoded user data.
export const login = function (origEmail, password) {
  return (dispatch) => {
    let email = origEmail.toLowerCase()
    dispatch(loginLoading())
    setTimeout(() => {
      if (users && users[email] && users[email].password === password) {
        dispatch(loginSuccess(users[email]))
      } else {
        dispatch(loginFail('Invalid Username or Password'))
      }
    }, 2000)
  }
}
