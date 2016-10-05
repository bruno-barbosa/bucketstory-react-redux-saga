/**
 * Only one constant for REQUEST and FAILURE
 * could be used to handle all requests and failures
 * however for clarity's sake I've decided to use one each
 * disregarding the code repetition.
 *
 * This may be changed in the future.
 */

export const GETUSER_REQUEST = 'AUTH/GETUSER_REQUEST'
export const GETUSER_SUCCESS = 'AUTH/GETUSER_SUCCESS'
export const GETUSER_FAILURE = 'AUTH/GETUSER_FAILURE'

export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'AUTH/LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'AUTH/LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'AUTH/LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'AUTH/LOGOUT_SUCCESS'

export const REGISTER_REQUEST = 'AUTH/REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'AUTH/REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'AUTH/REGISTER_FAILURE'

export const PROVIDER_GOOGLE = 'AUTH/PROVIDER_GOOGLE'
export const PROVIDER_FACEBOOK = 'AUTH/PROVIDER_FACEBOOK'
export const PROVIDER_TWITTER = 'AUTH/PROVIDER_TWITTER'
