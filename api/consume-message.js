const { adapt } = require('./_adapter');
const { handler } = require('../functions/consume-message');
module.exports = adapt(handler);
