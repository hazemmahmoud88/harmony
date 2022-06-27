import _ from 'lodash';
import { parentPort, workerData } from 'worker_threads';
import logger from '../util/log';
import db from '../util/db';
import WorkItem from './work-item';

const [jobID, oldStatuses, newStatus] = workerData;
const updatedAt = new Date();
logger.info(`Updating work item statuses to ${newStatus}`);
db(WorkItem.table)
  .where({ jobID })
  .whereIn('status', oldStatuses)
  .update({ status: newStatus, updatedAt })
  .then(value => parentPort.postMessage(value))
  .catch(reason => { throw new Error(reason); });