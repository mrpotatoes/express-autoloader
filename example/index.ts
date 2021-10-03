/* eslint-disable- functional/no-throw-statement */
import 'console.table'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { RoutesLoader } from '../lib'
import { asyncThing } from '../lib/safeHandler'


const PORT = 2121
const HOST = '0.0.0.0'
const app = express()

const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).send({ error: err });
}

const errorHandler = async (req, res) => ({
  more: 'this is a custom error handler',
})

const failure = async (req, res, next) => {
  throw new Error('this handler should also fail')
}

const success = async (req, res, next) => ({
  hey: 'good'
})

app.use(bodyParser.json())
app.use(jsonErrorHandler)

app.get('/', async (req, res) => {
  res.send(`GET / is running`)
})

// curl -X GET http://localhost:2121/i-cant-still-do-this-of-course
app.get('/i-cant-still-do-this-of-course', async (req, res) => {
  res.send('manually adding still works, yay')
})

app.get('/success', asyncThing(success))
app.get('/failure', asyncThing(failure, errorHandler))


// TODO: Wrap this in an Either() so the code is cleaner and the error handling is simpler.
try {
  const paths = RoutesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), false)

  console.log()
  console.table(paths)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`)
  console.log()
})
