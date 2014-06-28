var mongoose=require('mongoose')
  , config=require('../config');

var db= mongoose.createConnection();
//global.db = db;
 var options = {
        db: { native_parser: true },
        server: { poolSize: 5 },
        user: '',
        pass: ''
};

var host = config.db.host;
var port = config.db.port;
var database =config.db.database;
var user =config.db.user;
var pass =config.db.pass;
options.user = user;
options.pass = pass;
db.open(host, database, port, options);
db.on('error', function (err) {
    //监听BAE mongodb异常后关闭闲置连接
    console.log('mongodb error :' + err);
    db.close();
}); 
     
db.on('close', function () {
    //if(!db.db.serverConfig.connected)
        db.open(host, database, port, options);
});

/*setInterval(function(){
    if(!db.db.serverConfig.connected)
        db.open(host, database, port, options);
},10*1000);*/

module.exports = db;