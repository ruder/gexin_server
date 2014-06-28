
var config = {};

config.isDev = true;
config.test = true;

require('./db')(config);
require('./server')(config);

module.exports = config;