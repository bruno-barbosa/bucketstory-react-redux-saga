import { authActions } from 'redux/actions'

// Inject fetch polyfill if fethc is unsuported
if (!window.fetch) { const fetch = require('whatwg-fetch') }

const authApi = {
  register (userData) {
    fetch(`http://localhost:3000/api/auth/local/register`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify({
        name      : userData.name,
        email     : userData.email,
        password  : userData.password
      })
    })
    .then(response => {
      if (response.status === 200 && response.status < 300) {
        console.log(response)
        authActions.signupSuccess(response)
      } else {
        const error = new Error(response.statusText)
        error.reponse = response
        authActions.signupFailure()
        throw error
      }
    })
    .catch(error => { console.log('request failed', error) })
  },

  login (userData) {
    fetch(`http://localhost:3000/api/auth/local/login`, {
      method  : 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      body    : JSON.stringify({
        email     : userData.email,
        password  : userData.password
      })
    })
    .then(response => {
      if (response.status === 200 && response.status < 300) {
        console.log(response)
        authActions.signupSuccess(response)
      } else {
        const error = new Error(response.statusText)
        error.reponse = response
        authActions.signupFailure()
        throw error
      }
    })
    .catch(error => { console.log('request failed', error) })
  }
}

export default authApi
