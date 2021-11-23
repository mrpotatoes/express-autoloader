import 'console.table'
import * as PG from 'pg';
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { routesLoader } from '../../lib'
import { Dependencies } from '../../lib/types/misc'
// import { poolBuilder } from '../tests/__mocks__/middlewares'

const PORT = 2121
const HOST = '0.0.0.0'
const app = express()

process.env.PGUSER = 'USER'
process.env.PGDATABASE = 'TEST_DB'
process.env.PGHOST = 'localhost'
process.env.PGPORT = '0000'

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

interface ExampleDependencies extends Dependencies {
  client?: () => Promise<PG.PoolClient>
}

// Global dependencies (for all routes).
const deps: Dependencies = {
  // logger: {
  //   pass: (url, deets) => {
  //     console.log(url, deets)
  //   },
  //   fail: (url, error) => {
  //     // Toggle these to see different error output.
  //     // console.log(url, error)
  //     console.log(`[ERROR]: ${url} → ${error}`)
  //   }
  // },
  error: async (deps: ExampleDependencies) => {
    console.log('override', Object.keys(deps))
    console.log()

    // const client = await poolBuilder()
    // await client.query('ROLLBACK');
    console.log('running this error handler instead')
    return {}
  },
}

try {
  console.log(
    path.join(__dirname, '../', '__mocks__')
  )
  // const paths = routesLoader(app, path.join(__dirname, '../', 'tests/__mocks__'), deps)

  // console.log()
  // console.table(paths)
} catch (error) {
  console.log(error.toString())
}

app.listen(PORT, HOST, () => {
  console.info(`http://localhost:${PORT}`)
  console.log()
})
