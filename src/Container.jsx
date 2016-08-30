/* global fetch */
import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import CircularProgress from 'material-ui/CircularProgress'
import ReduxBugReporter from 'redux-bug-reporter'
import 'redux-bug-reporter/dist/redux-bug-reporter.css'
import parser from 'ua-parser-js'
import 'isomorphic-fetch'

// submit function for redux-bug-reporter
const submitFn = (newBug) => {
  let {useragent, notes, description, screenshotURL, reporter, actions, initialState, state, consoleErrors, meta, windowDimensions, windowLocation} = newBug
  try {
    actions = JSON.stringify(actions)
    state = JSON.stringify(state)
    initialState = JSON.stringify(initialState)
    meta = JSON.stringify(meta)
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(e)
    })
  }
  var { name: uaName, version: uaVersion } = parser(useragent).browser
  let title = `${description}`
  let body = `## Notes
${notes}
## Meta information
*Bug filed by*: ${reporter}
*Screenshot URL (if added)*: ${screenshotURL}
*Console Errors*: \`${consoleErrors}\`
*URL*: ${windowLocation}
*Window Dimensions*: ${windowDimensions}
*Meta information*: ${meta}
*User Agent*: ${uaName} version ${uaVersion}
Playback script:
\`\`\`js
window.bugReporterPlayback(${actions},${initialState},${state},100)
\`\`\`
*Bug submitted through [redux-bug-reporter](https://github.com/dtschust/redux-bug-reporter)*
`
// This is a heroku app running https://github.com/dtschust/github-issue-filer to file issues for us. If it goes down, make a new one.
  return fetch('https://login-page-filer.herokuapp.com/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body: body
    })
  }).then(function (response) {
    return response.json()
  })
}

const Loader = () => {
  return (
    <div className='loading-overlay'>
      <div className='loading-element'>
        <CircularProgress size={2} />
      </div>
    </div>
  )
}

const Container = ({ children, loading }) => {
  return (
    <div className='app-container'>
      <AppBar
        title='Example Résumé App' iconElementLeft={(<span />)}
      />
      {children}
      {loading && <Loader />}
      <ReduxBugReporter submit={submitFn} projectName='login-page' />
    </div>

  )
}

const mapStateToProps = ({user}) => {
  return {
    loading: user.loading
  }
}
export default connect(mapStateToProps)(Container)
