var m_dbname='MCsKIeSjhWMutWHNQzGe'
  , m_user = 'YuUTk3N1iPZONGhfsPaDuMuu'
  , m_pass = 'GogKrotCaTru6dSMqMhPw6sUiBYLGbsi';

module.exports = function (config) {
    var db = config.db = {};
    var isDev = config.isDev;
    db.host = isDev ? 'localhost' : 'mongo.duapp.com';
    db.port = isDev ? '27017' : '8908';
    db.database = isDev ? 'test' : m_dbname;
    db.user = isDev ? '' : m_user;
    db.pass = isDev ? '' : m_pass;
};