import path from 'path'
import express from 'express'
import { RoutesLoader } from '../lib'

const PORT = 2121
const HOST = '0.0.0.0'
const app = express()

app.get('/', async (req, res) => {
  res.send(`GET / is running`);
})

// curl -X GET http://localhost:2121/i-cant-still-do-this-of-course
app.get('/i-cant-still-do-this-of-course', async (req, res) => {
  res.send('manually adding still works, yay');
})

// TODO: Wrap this in an Either() so the code is cleaner and the error handling is simpler.
try {
  RoutesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), true)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`);
})
