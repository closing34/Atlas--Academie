const { adapt } = require('./_adapter');
const { handler } = require('../functions/create-checkout');
module.exports = adapt(handler);
