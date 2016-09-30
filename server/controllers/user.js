/* eslint-disable no-param-reassign */

import passport from 'passport'
import uuid from 'uuid'

import User from '../models/User'

// ======================================================
// Auth
// ======================================================
class Auth {
  static postLogin (req, res, next) {
    // Validate received data
    req.assert('email', 'Email is not valid').isEmail()
    req.sanitize('email').normalizeEmail({ remove_dots: false })
    req.assert('password', 'Password cannot be empty').notEmpty()

    const errors = req.validationErrors()

    if (errors) return res.send(errors)

    passport.authenticate('local', (err, user, info) => {
      if (err || !user) return res.send(err || info)

      req.login(user, (errLogin) => {
        if (errLogin) return res.send(errLogin)

        req.user.profile.password = null
        res.send(req.user)
      })
    })(req, res, next)
  }

  static postLogout (req, res) {
    req.logout()
    res.send('User logout successfuly.')
  }

  static postRegister (req, res, next) {
    // Validate received data
    req.assert('email', 'Email is not valid').isEmail()
    req.sanitize('email').normalizeEmail({ remove_dots: false })
    req.assert('password', 'Password must be at least 8 characters long').len(8)

    const errors = req.validationErrors()

    if (errors) return res.send(errors)

    User.findOne({ 'profile.email': req.body.email }, (err, existingUser) => {
      if (err) return next(err)
      if (existingUser) return res.end(res.writeHead(400, 'This email has already been registered'))
      const accessToken = uuid()
      const user = new User()

      user.profile.name = req.body.name
      user.profile.email = req.body.email
      user.profile.password = req.body.password
      user.tokens.socialToken.push({ kind: 'local', accessToken })

      user.save(errSave => {
        if (errSave) next(errSave)

        req.login(user, errLogin => {
          if (errLogin) return next(errLogin)

          req.user.profile.password = null
          res.send(req.user)
        })
      })
    })
  }
}

// ======================================================
// Account
// ======================================================
class Account {
  static getInfo (req, res, next) {
    if (!req.user) return res.status(304).end()

    User.findById(req.user.id, (err, dbUser) => {
      if (err) return next(err)
      res.send(dbUser)
    }) // Populate collections if necessary
  }

  static postUpdate (req, res, next) {
    // Validate received data
    req.assert('email', 'Please enter a valid email address').isEmail()
    req.sanitize('email').normalizeEmail({ remove_dots: false })

    const errors = req.validationErrors()

    if (errors) res.send(errors)

    User.findById(req.user._id, (err, dbUser) => {
      if (err) return next(err)

      dbUser.profile.pciture = req.body.user.picture || ''
      dbUser.profile.name = req.body.user.name || ''
      dbUser.profile.email = req.body.user.email || ''
      dbUser.profile.gender = req.body.user.gender || ''
      dbUser.profile.location = req.body.user.location || ''
      dbUser.profile.website = req.body.user.website || ''
      dbUser.profile.role = req.body.user.role || ''

      dbUser.save(errSave => {
        if (errSave) {
          if (errSave.code === 11000) return res.send(errors)
          return next(errSave)
        }
        res.send('Profile updated successfuly.')
      })
    })
  }

  static postUpdatePassword (req, res, next) {
    req.assert('password', 'Password mus be at least 8 characters long').len(8)

    const errors = req.validationErrors()

    if (errors) res.send(errors)

    User.findById(req.user.id, (err, dbUser) => {
      if (err) return next(err)

      dbUser.profile.password = req.body.user.password

      dbUser.save(errSave => {
        res.send('Password successfuly updated.')
      })
    })
  }

  static delete (req, res, next) {
    User.remove({ _id: req.user._id }, err => {
      if (err) return next(err)

      req.logout()
      res.send('Account successfuly deleted.')
    })
  }

  static unlinkOAuth (req, res, next) {
    const provider = req.params.provider
    User.findById(req.user._id, (err, dbUser) => {
      if (err) return next(err)
      dbUser[provider] = undefined
      dbUser.tokens.socialToken = dbUser.tokens.socialToken.filter(token => token.kind !== provider)

      dbUser.save(errSave => {
        if (errSave) return next(errSave)
        res.send(`${provider} account has been unlinked`)
      })
    })
  }
}

/* TODO  User controllers
 Add password reset controller
 password mailer based on token
*/

export { Auth, Account }
