import * as PG from 'pg';
import memoize from 'memoizee'
import { Dependencies } from '../../lib/types/misc'

export const PG_ENUM = {
  BEGIN: 'BEGIN',
  COMMIT: 'COMMIT',
  ROLLBACK: 'ROLLBACK',
};

export interface TestDependencies extends Dependencies {
  name: string,
  client?: () => Promise<PG.PoolClient>,
}

export const middleware1 = async (req, res, next) => {
  console.log('Middleware 1')
  next()
}

export const middleware2 = async (req, res, next) => {
  console.log('Middleware 2')
  next()
}

export const poolBuilder = memoize(async (): Promise<PG.PoolClient> => {
  const pool = new PG.Pool()
  const client = await pool.connect()
  return client
}, { promise: true })
