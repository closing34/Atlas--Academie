const { adapt } = require('./_adapter');
const { handler } = require('../functions/simulator');
module.exports = adapt(handler);
