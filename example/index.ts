/* eslint-disable- functional/no-throw-statement */
import 'console.table'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { routesLoader } from '../lib'
import { pathCache } from '../lib/utils/formatters'

const PORT = 2121
const HOST = '0.0.0.0'
const app = express()

const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).send({ error: err });
}

app.use(bodyParser.json())
app.use(jsonErrorHandler)

app.get('/', async (req, res) => {
  res.send(`GET / is running`)
})

app.get('/i-cant-still-do-this-of-course', async (req, res) => {
  res.send('manually adding still works, yay')
})

try {
  const paths = routesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), false)
  const formatted = paths
    .filter(e => (e.method) ? true : false)
    .map(e => pathCache(e))

  console.log()
  console.table(formatted)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`)
  console.log()
})
