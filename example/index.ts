// TODO: Use npm link to get this to work as expected
// TODO: Move example stuff around
import path from 'path'
import express, { Router } from 'express'
import { RoutesLoader } from '../lib'

const PORT = 2121;
const HOST = '0.0.0.0';
const app = express();

app.get('/', async (req, res) => {
  res.send(`GET / is running`);
});

try {
  RoutesLoader(app, path.join(__dirname, '..', 'lib/_routes'), true)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`);
});