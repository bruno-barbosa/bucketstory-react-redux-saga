
// Inject fetch polyfill if fetch is unsuported
if (!window.fetch) { const fetch = require('whatwg-fetch') }

const authApi = {
  register (userData) {
    return fetch(`http://localhost:3000/api/auth/local/register`, {
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

export default authApi
