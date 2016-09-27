import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const _ = require('lodash')

const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy

const User = require('../models/User')

// ======================================================
// Passport Serializer and Deserializer
// ======================================================
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user)
  })
})

// ======================================================
// LOGIN MIDDLEWARE
// ======================================================
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
}

// ======================================================
// Local Strategy
// ======================================================
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, cb) => {
  User.findOne({ 'profile.email': email.toLowerCase() }, (err, user) => {
    if (err) return cb(err)
    if (!user) return cb(null, false, { msg: `Email ${email} not found.` })

    user.comparePassword(password, (errCompare, isMatch) => {
      if (isMatch) return cb(null, user)
      return cb(null, false, { msg: 'Invalid email or password.' })
    })
  })
}))

/*
  - If(user) Verify if user is logged in
    - Check if there is an account using this service provider
      - If true, return an error message (cannot merge account)
      - Else, link new OAuth provider with current account
  - Else user is not logged in
    - Verify if it's a returning user
    - If true sign user in and invoke callback
    - Else check if there is an account usin gthis service provider
      - If true return an error message (cannot merge account)
      - Else create a new account
*/

// ======================================================
// Google Strategy
// ======================================================
passport.use(new GoogleStrategy({
  clientID          : process.env.GOOGLE_ID,
  clientSecret      : process.env.GOOGLE_SECRET,
  callbackURL       : '/api/auth/social/google/callback',
  passReqToCallback : true
}, (req, accessToken, refreshToken, profile, cb) => {
  if (req.user) {
    User.findOne({ 'social.google': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb('This google account has already been registered.')

      User.findById(req.user.id, (errLink, user) => {
        if (errLink) return cb(errLink)
        const newToken = user.tokens.socialToken
                              .filter(token => token.kind !== 'google')
                              .push({ kind: 'google', accessToken })

        user.social.google = profile.id
        user.profile.name = user.profile.name || profile.displayName
        user.profile.picture = user.profile.picture || profile._json.image.url
        user.profile.gender = user.profile.gender || profile._json.gender
        user.tokens.socialToken = newToken

        user.save(errSave => { cb(errSave, user) })
      })
    })
  } else {
    User.findOne({ 'social.google': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb(null, existingUser)

      User.findOne({ 'profile.email': profile.emails[0].value }, (errLink, existingEmail) => {
        if (errLink) return cb(errLink)
        if (existingEmail) return cb('This google account has already been registered.')

        const user = new User()

        user.social.google = profile.id
        user.profile.picture = profile._json.image.url
        user.profile.email = profile.emails[0].value
        user.profile.name = user.displayName
        user.profile.location = profile._json.location
        user.profile.website = profile._json.blog
        user.tokens.socialToken.push({ kind: 'google', accessToken })

        user.save(errSave => { cb(errSave, user) })
      })
    })
  }
}))

// ======================================================
// Facebook Strategy
// ======================================================
passport.use(new FacebookStrategy({
  clientID          : process.env.FACEBOOK_ID,
  clientSecret      : process.env.FACEBOOK_SECRET,
  callbackURL       : '/api/auth/social/facebook/callback',
  profileFields     : ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback : true
}, (req, accessToken, refreshToken, profile, cb) => {
  if (req.user) {
    User.findOne({ 'social.facebook': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb('This facebook account has already been registered.')

      User.findById(req.user.id, (errLink, user) => {
        if (errLink) return cb(errLink)
        const newToken = user.tokens.socialToken
                              .filter(token => token.kind !== 'facebook')
                              .push({ kind: 'facebook', accessToken })

        user.social.facebook = profile.id
        user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`
        user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`
        user.profile.gender = user.profile.gender || profile._json.gender
        user.token.socialToken = newToken

        user.save(errSave => { cb(errSave, user) })
      })
    })
  } else {
    User.findOne({ 'social.facebook': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb(null, existingUser)

      User.findOne({ 'profile.email': profile._json.email }, (errLink, existingEmail) => {
        if (errLink) return cb(errLink)
        if (existingEmail) return cb('This facebook account has already been registered.')

        const user = new User()

        user.social.facebook = profile.id
        user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`
        user.profile.email = profile._json.email
        user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`
        user.profile.location = (profile._json.location) ? profile._json.location.name : ''
        user.tokens.socialToken.push({ kind: 'facebook', accessToken })

        user.save(errSave => { cb(errSave, user) })
      })
    })
  }
}))

// ======================================================
// Twitter Strategy
// ======================================================
passport.use(new TwitterStrategy({
  consumerKey       : process.env.TWITTER_ID,
  consumerSecret    : process.env.TWITTER_SECRET,
  callbackURL       : '/api/auth/social/twitter/callback',
  passReqToCallback : true
}, (req, accessToken, tokenSecret, profile, cb) => {
  if (req.user) {
    User.findOne({ 'social.twitter': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb('This twitter account has already been registered.')

      User.findById(req.user.id, (errLink, user) => {
        if (errLink) return cb(errLink)
        const newToken = user.tokens.socialToken
                              .filter(token => token.kind !== 'twitter')
                              .push({ kind: 'twitter', accessToken, tokenSecret })

        user.social.twitter = profile.id
        user.profile.name = user.profile.name || profile.displayName
        user.profile.picture = user.profile.picture || profile._json.profile_image_url_https
        user.profile.location = user.profile.location || profile._json.location
        user.token.socialToken = newToken

        user.save(errSave => { cb(errSave, user) })
      })
    })
  } else {
    User.findOne({ 'social.twitter': profile.id }, (err, existingUser) => {
      if (err) return cb(err)
      if (existingUser) return cb(null, existingUser)

      const user = new User()

      user.social.twitter = profile.id
      user.profile.picture = profile._json.profile_image_url_https
      user.profile.email = `${profile.displayName}@twitter.com`
      user.profile.name = profile.displayName
      user.profile.location = profile._json.location
      user.tokens.socialToken.push({ kind: 'twitter', accessToken, tokenSecret })

      user.save(errSave => { cb(errSave, user) })
    })
  }
}))
