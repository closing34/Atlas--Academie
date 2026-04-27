const { adapt } = require('./_adapter');
const { handler } = require('../functions/check-access');
module.exports = adapt(handler);
