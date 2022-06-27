// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
require(path.resolve(__dirname, 'ts-worker.ts'));