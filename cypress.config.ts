process.env.NODE_ENV = 'test';
import { defineConfig } from "cypress";
import { JobStatus } from "./app/models/job";
import { refreshDatabase } from './app/util/db';
import db from './app/util/db';
import { truncateAll } from './test/common/db';
import { buildJob } from './test/common/jobs';


export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1234',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "db:truncate"() {
          await refreshDatabase();
          await truncateAll();
          return null;
        },
        async "db:seed"() {
          const job = buildJob({
            username: 'joe',
            status: JobStatus.SUCCESSFUL,
            message: `Completed successfully`,
            progress: 100,
            links: [{ href: 'http://example.com/woody1', rel: 'link', type: 'text/plain' }],
            request: `http://example.com/harmony`,
            isAsync: true,
            numInputGranules: 89723,
          })
          await job.save(db);
          return job.requestId;
        },
      });
    },
    env: {
      'COOKIE_SECRET': 'cookie-secret'
    },
    video: false,
  },
});
