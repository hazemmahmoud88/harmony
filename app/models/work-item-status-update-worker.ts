import { join } from 'path';
import { Worker } from 'worker_threads';
import { WorkItemStatus } from './work-item-interface';

/**
 * Update the status of work items by job ID. Creates a worker thread to do the actual work.
 * @param jobID - the jobID associated with the work items
 * @param oldStatuses - restricts the updates to work items where the status is in oldStatuses
 * @param newStatus - the value of the updated status
 */
export function updateWorkItemStatusesByJobId(
  jobID: string,
  oldStatuses: WorkItemStatus[],
  newStatus: WorkItemStatus,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(join(__dirname, 'worker.js'), {
      workerData: [jobID, oldStatuses, newStatus],
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`WorkItem status update worker stopped with exit code ${code}`));
    });
  });
}