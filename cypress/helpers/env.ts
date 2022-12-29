process.env['SHARED_SECRET_KEY'] = 'shared-secret';
process.env['COOKIE_SECRET'] = 'cookie-secret';
process.env.CALLBACK_URL_ROOT = 'http://localhost:1234';

// We do not use an EDL application or call backend services in our tests.
process.env.OAUTH_REDIRECT_URI = `http://localhost:0/oauth2/redirect`;
process.env.OAUTH_CLIENT_ID = 'foo';
process.env.OAUTH_UID = 'foo';
process.env.OAUTH_PASSWORD = 'foo';

// needed to keep lots of tests from auto-pausing
process.env.PREVIEW_THRESHOLD = '500';

// prevent tests from using a different page size and creating many fixtures
process.env.CMR_MAX_PAGE_SIZE = '100';

// use reasonable aggregation batch sizes for tests
process.env.MAX_BATCH_INPUTS = '3';
process.env.MAX_BATCH_SIZE_IN_BYTES = '10000';

// eslint-disable-next-line import/first
import '../../app/util/env'; // Must set required env before loading the env file

