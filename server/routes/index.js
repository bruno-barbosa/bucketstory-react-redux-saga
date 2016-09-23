import express from 'express'
import apiRoutes from './api'

const router = express.Router() // eslint-disable-line new-cap

router.use('/api', apiRoutes)

export default router
