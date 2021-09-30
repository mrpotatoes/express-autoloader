// TODO: Use npm link to get this to work as expected
// TODO: Move example stuff around
import path from 'path'
import express from 'express'
import { RoutesLoader } from '../lib'

const PORT = 2121;
const HOST = '0.0.0.0';
const app = express();

app.get('/', async (req, res) => {
  res.send(`GET / is running`);
});

// TODO: Wrap this in an Either() so the code is cleaner and the error handling is simpler.
try {
  RoutesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), true)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`);
});