import { v4 as uuid } from 'uuid';
import { Job, JobRecord, JobStatus } from '../../app/models/job';

const exampleProps = {
  username: 'anonymous',
  status: JobStatus.RUNNING,
  message: 'it is running',
  progress: 42,
  links: [{ href: 'http://example.com' }],
  request: 'http://example.com/harmony?foo=bar',
  numInputGranules: 100,
  isAsync: true,
  ignoreErrors: false,
} as JobRecord;

/**
 * Creates a job with default values for fields that are not passed in
 *
 * @param fields - fields to use for the job record
 * @returns a job
 */
export function buildJob(fields: Partial<JobRecord> = {}): Job {
  const requestId = uuid().toString();
  const job = new Job({ requestId, jobID: requestId, ...exampleProps, ...fields });
  // Make sure the jobID and the requestId always match
  job.jobID = job.requestId;

  const jobLinks = job.links;
  if (jobLinks) {
    for (const jobLink of jobLinks) {
      jobLink.jobID = requestId;
      if (jobLink.temporal) {
        if (jobLink.temporal.start && typeof jobLink.temporal.start === 'string') {
          jobLink.temporal.start = new Date(jobLink.temporal.start);
        }
        if (jobLink.temporal.end && typeof jobLink.temporal.end === 'string') {
          jobLink.temporal.end = new Date(jobLink.temporal.end);
        }
      }
    }
  }
  return job;
}