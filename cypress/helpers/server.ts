import * as harmony from '../../app/server';

process.env.NODE_ENV = 'test';
import './env';
import { stubTokenValidationCall } from '../../test/helpers/auth';

// Stub the call to validate the token
stubTokenValidationCall();

function start() {
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