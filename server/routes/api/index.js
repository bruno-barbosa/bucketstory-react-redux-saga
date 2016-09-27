import express from 'express'

import authRoutes from './auth'

const router = express.Router() // eslint-disable-line new-cap

router.use('/auth', authRoutes)

export default router
