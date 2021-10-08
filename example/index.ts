import 'console.table'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { routesLoader } from '../lib'

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
  const paths = routesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), true)

  console.log()
  console.table(paths)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`)
  console.log()
})
