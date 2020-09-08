const dbConfig = require('./dbConfig.json');

module.exports = {
    dbConfig: dbConfig[process.env.NODE_ENV || 'development'] || dbConfig['development'],
}