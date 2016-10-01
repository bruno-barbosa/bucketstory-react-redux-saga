import express from 'express'
import passport from 'passport'

import { Auth } from '../../controllers/user'

const router = express.Router()

router.post('/local/register', Auth.postRegister)
router.post('/local/login', Auth.postLogin)
router.delete('/local/logout', Auth.postLogout)

// Google authentication
router.get('/social/google', passport.authenticate('google'))
router.get('/social/google/callback', passport.authenticate('google',
{ failureRedirect: '/local/login' }), (req, res) => {
  res.send(' ')
})

// Facebook authentication
router.get('/social/facebook', passport.authenticate('facebook'))
router.get('/social/facebook/callback', passport.authenticate('facebook',
{ failureRedirect: '/local/login' }), (req, res) => {
  res.send(' ')
})

// Twitter authentication
router.get('/social/twitter', passport.authenticate('twitter'))
router.get('/social/twitter/callback', passport.authenticate('twitter',
{ failureRedirect: '/local/login' }), (req, res) => {
  res.send(' ')
})

export default router
