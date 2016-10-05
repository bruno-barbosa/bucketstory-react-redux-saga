import express from 'express'
import passport from 'passport'

import { Account } from '../../controllers/user'

const router = express.Router()

router.get('/profile', Account.getInfo)

export default router
