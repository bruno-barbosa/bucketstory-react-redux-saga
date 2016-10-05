// Server dependencies imports
import helmet from 'helmet'
import mongoose from 'mongoose'
import express from 'express'

// Log and optimization imports
import logger from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'

// Passport and session dependencies imports
import cors from 'cors'
import passport from 'passport'
import mongoStore from 'connect-mongo'
import session from 'express-session'
import validator from 'express-validator'

// Webpack config imports
import _debug from 'debug'
import webpack from 'webpack'
import historyFallback from 'connect-history-api-fallback'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHMRMiddleware from 'webpack-hot-middleware'

import config from '../tools/config'
import webpackConfig from '../tools/build/webpack.config'

import indexRoute from './routes/index'

require('./middlewares/passport')

const app = express()

const debug = _debug('server:express')
debug('Starting express server')

const paths = config.utils_paths

const MongoStore = mongoStore(session)

// ========================================================
// Assign es6 promises to Mongoose and connect to MongoDB
// ========================================================
mongoose.Promise = global.Promise
if (process.env.MOCHA) {
  const MONGOURL = 'mongodb://localhost/bucketstory-tests'
  mongoose.connect(MONGOURL)
} else {
  const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/bucketstory'
  mongoose.connect(MONGOURL, err => {
    debug(err || `MongoDB connected to ${MONGOURL}`); // eslint-disable-line
  })
}

// ========================================================
// General Purporse middlewares
// ========================================================
app.use(helmet())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())
app.use(session({
  resave            : true,
  saveUninitialized : false,
  secret            : process.env.SESSION_SECRET,
  store             : new MongoStore({
    url            : process.env.MONGODB_URI,
    autoReconnect  : true
    })
}))

// ========================================================
// Initialize passport with express-session
// ========================================================
app.use(passport.initialize())
app.use(passport.session())

// Sets res.locals.user to req.user
app.use((req, res, next) => {
  res.locals.user = req.user // eslint-disable-line no-param-reassign
  next()
})

// Provides a fallback from non-existing directories using HTML5 api fallback
app.use(historyFallback())

// ========================================================
// Webpack middleware
// ========================================================

// Check process.env and enables webpack dev middleware accordingly
//  Sets statics to correct enviromnent variable
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, {
    publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(webpackHMRMiddleware(compiler))

  app.use(express.static(paths.dist()))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  app.use(express.static(paths.dist()))
}

// Initialize api routes
app.use('/', cors(), indexRoute)

export default app
