import '../../test/helpers/env';
import * as harmony from '../../app/server';
import { stubTokenValidationCall } from '../../test/helpers/auth';
import { cmrApiConfig } from '../../app/util/cmr';
import { recreateDatabase } from '../../test/helpers/db';

// Ensures in tests that the Authorization header is not passed to CMR
cmrApiConfig.useToken = false;

// Stub the call to validate the token
stubTokenValidationCall();

async function start() {

  await recreateDatabase();

  harmony.start({
    EXAMPLE_SERVICES: 'true',
    skipEarthdataLogin: 'false',
    startWorkflowTerminationListener: 'false',
    startWorkReaper: 'false',
    startWorkFailer: 'false',
    PORT: '1234',
    BACKEND_PORT: '0',
  });
}

if (require.main === module) {
  start();
}