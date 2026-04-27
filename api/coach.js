const { adapt } = require('./_adapter');
const { handler } = require('../functions/coach');
module.exports = adapt(handler);
