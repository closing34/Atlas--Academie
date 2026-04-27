const { adapt } = require('./_adapter');
const { handler } = require('../functions/auth');
module.exports = adapt(handler);
