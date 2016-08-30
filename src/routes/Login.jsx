import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import { login, requestCloseSnackBar, requestCloseDialog, openDialog } from '../redux/actions'
import { push } from 'react-router-redux'

const openForgotPasswordDialog = (e, openDialog, requestCloseDialog) => {
  e.preventDefault()
  openDialog({
    open: true,
    title: 'Forgot Your Password?'
  })
}
const Login = React.createClass({
  displayName: 'Login',
  propTypes: {
    login: React.PropTypes.func.isRequired,
    requestCloseSnackBar: React.PropTypes.func.isRequired,
    requestCloseDialog: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.func.isRequired,
    user: React.PropTypes.object,
    snackbar: React.PropTypes.object
  },
  onSubmit: function (e) {
    e.preventDefault()
    let email = this.refs.email.getValue()
    let password = this.refs.password.getValue()
    this.props.login(email, password)
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.user) {
      this.props.push('/home')
    }
  },
  render: function () {
    const dialogActions = (<FlatButton label='Thanks!' primary onClick={() => this.props.requestCloseDialog()} />)
    return (
      <div>
        <Paper className='login-container' zDepth={4}>
          <AppBar title='Sign In' iconElementLeft={(<span />)} />
          <form className='login-container__form' onSubmit={this.onSubmit}>
            <TextField
              ref='email'
              hintText='foo@bar.com'
              floatingLabelText='Email'
            />
            <TextField
              ref='password'
              hintText='secrets'
              type='password'
              floatingLabelText='Password'
            />
            <RaisedButton
              className='login-container__sign-in'
              label='Sign In'
              primary
              type='submit' />
            <div className='login-container__forgot-password'>
              <FlatButton
                labelStyle={{textTransform: 'none', color: 'rgba(0, 0, 0, 0.298039)'}}
                label='Forgot Your Password?'
                onClick={(e) => { openForgotPasswordDialog(e, this.props.openDialog, this.props.requestCloseDialog) }} />
            </div>
          </form>
        </Paper>
        <Dialog
          title={this.props.dialog.title}
          open={this.props.dialog.open}
          actions={dialogActions}
          modal={this.props.dialog.modal}
          onRequestClose={() => this.props.requestCloseDialog()}>
          <div>Don't worry, here's one! dtschust@gmail.com, password foobar</div>
        </Dialog>
        <Snackbar {...this.props.snackbar} onRequestClose={() => this.props.requestCloseSnackBar()} />
      </div>
    )
  }
})

const mapStateToProps = ({user, snackbar, dialog}) => {
  return {
    user: user.user,
    snackbar,
    dialog
  }
}

const mapDispatchToProps = { login, push, requestCloseSnackBar, requestCloseDialog, openDialog }
export default connect(mapStateToProps, mapDispatchToProps)(Login)
