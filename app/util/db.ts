// Import has to happen after the knexfile, so disable that rule
// eslint-disable-next-line import/order
import knexfile from '../../db/knexfile';
import { knex, Knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import env from './env';
import logger from './log';

/**
 * Batch size -- to avoid overly large SQL statements.
 */
export const batchSize = env.nodeEnv === 'development' ? 100 : 2000;

export type Transaction = Knex.Transaction | Knex;

const environment = env.nodeEnv;
const config = knexfile[environment];
const database = knex(config);

// attachPaginate will fail when code is reloaded by mocha -w
try {
  attachPaginate();
} catch (e) {
  if ((e.message as string).startsWith('Can\'t extend QueryBuilder with existing method (\'paginate\')')) {
    logger.warn(e.message);
  } else {
    throw e;
  }
}

/**
 * Restart knex and return the db object. Used in testing.
 */
export async function refreshDatabase(): Promise<Knex> {
  if (module.exports.default) {
    await module.exports.default.destroy();
  }
  module.exports.default = knex(config);
  return module.exports.default;
}

export default database;
