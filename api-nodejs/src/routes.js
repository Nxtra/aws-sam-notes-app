'use strict'
const indexPage = require('pug-loader!./index.pug')
const info = require('info')
const notes = require('notes')

exports.addRoutes = function (app) {
  app.get('/', (req, res) => {
    console.log('/', 2)
    res.send(
      indexPage({
        apiUrl: req.apiGateway ? `https://${req.apiGateway.event.headers.Host}/${req.apiGateway.event.requestContext.stage}` : 'http://localhost:3000'
      })
    )
  })

  app.get('/info', (req, res) => {
    console.log('info')
    res.json(info)
  })

  app.get('/notes', (req, res) => {
    console.log('GET /notes')
    res.json([{todo: 'implement'}])
  })

  app.post('/notes', async (req, res) => {
    console.log('POST /notes', req.body)
    try {
      let response = await notes.create(req.body)
      res.json(response)
    } catch (e) {
      console.error('POST /notes', e)
      res.sendStatus(500)
    }
  })

  app.get('/notes/:id', async (req, res) => {
    console.log('GET /notes/:id', req.params.id)
    try {
      res.json(await notes.get(req.params.id))
    } catch (e) {
      console.error('/notes/:id', e)
      res.sendStatus(500)
    }
  })
}
