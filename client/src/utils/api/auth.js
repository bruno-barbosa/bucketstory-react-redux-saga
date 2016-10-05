import { API_URL } from 'utils/api'

// Inject fetch polyfill if fetch is unsuported
if (!window.fetch) { window.fetch = require('whatwg-fetch') }

const authApi = {
  getUser () {
    return fetch(`${API_URL}/user/profile`, {
      method      : 'GET',
      headers     : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      credentials : 'same-origin',
      cache       : 'default'
    })
    .then(statusHelper)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  },

  login (userData) {
    return fetch(`${API_URL}/auth/local/login`, {
      method      : 'POST',
      headers     : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      credentials : 'same-origin',
      cache       : 'default',
      body        : JSON.stringify({
        email     : userData.email,
        password  : userData.password
      })
    })
    .then(statusHelper)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  },

  register (userData) {
    return fetch(`${API_URL}/auth/local/register`, {
      method      : 'POST',
      headers     : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      },
      credentials : 'same-origin',
      cache       : 'default',
      body        : JSON.stringify({
        name      : userData.name,
        email     : userData.email,
        password  : userData.password
      })
    })
    .then(statusHelper)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  },

  logout () {
    return fetch(`${API_URL}/auth/local/logout`, {
      method  : 'DELETE',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json'
      }
    })
    .then(statusHelper)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error)
  }
}

function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}

function localStorage () {

}

export default authApi
