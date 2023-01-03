import util from 'util';
import db from '../../app/util/db';

export const tables = ['jobs', 'work_items', 'workflow_steps', 'job_links'];

// eslint-disable-next-line @typescript-eslint/no-var-requires
const exec = util.promisify(require('child_process').exec);

/**
 * Truncates all database tables
 *
 * @returns A promise that resolves to nothing on completion
 */
export async function truncateAll(): Promise<void> {
  await Promise.all(tables.map((t) => db(t).truncate()));
}

const createDatabaseCommand = './bin/create-database -o test';

/**
 * Recreates the test database
 * Note this is done because database migrations do not work for sqlite
 */
export async function recreateDatabase(): Promise<void> {
  return exec(createDatabaseCommand);
}