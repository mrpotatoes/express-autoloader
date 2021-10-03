/* eslint-disable- functional/no-throw-statement */
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

app.use(bodyParser.json())
app.use(jsonErrorHandler)

app.get('/', async (req, res) => {
  res.send(`GET / is running`)
})

// curl -X GET http://localhost:2121/i-cant-still-do-this-of-course
app.get('/i-cant-still-do-this-of-course', async (req, res) => {
  res.send('manually adding still works, yay')
})

const errorHandler = async (req, res) => {
  // console.log('ERROR HANDLER CALLED')

  return {
    more: 'so much more',
  }
}

const failure = async (req, res, next) => {
  throw new Error('this handler should also fail')
}

const success = async (req, res, next) => ({
  hey: 'good'
})

app.get('/success', asyncThing(success))
app.get('/failure', asyncThing(failure, errorHandler))


// TODO: Wrap this in an Either() so the code is cleaner and the error handling is simpler.
try {
  RoutesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), true)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`)
  console.log()
})
