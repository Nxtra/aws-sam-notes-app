'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const routes = require('routes')

let expressApp = express()
expressApp.use(cors())
expressApp.use(bodyParser.json())
expressApp.use(bodyParser.urlencoded({extended: true}))
expressApp.use(awsServerlessExpressMiddleware.eventContext())

routes.addRoutes(expressApp)

let server = awsServerlessExpress.createServer(expressApp)
exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
