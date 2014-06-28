  var crypto = require('crypto')
  , Schema = require('mongoose').Schema
  , mongoose = require('mongoose')
  , ObjectId = mongoose.Types.ObjectId
  , db=require('../core/db');

//用户
var schema = new Schema({
    //登陆帐号
    loginId:String,
    //密码
    password:String,
    //总消费
    payMoney:Number,
    //初始消费
    initMoney:Number,
    //权限等级
    level:Number,
    //创建时间
    date:Date
});

schema.statics.get = function (loginid, cb) {
    this.findOne({ loginId: new RegExp(loginid, 'i') }, cb);
};
schema.statics.getById = function (id, cb) {
    this.findOne({ _id: new ObjectId(id) }, cb);
};

schema.methods.setPassword=function(pass,cb){
    var md5 = crypto.createHash("sha1");
    this.password = md5.update(pass, 'utf8').digest("hex");
    this.save(cb);
};

schema.methods.validatePass=function(pass){

    if(!pass)
        return false;

    var md5 = crypto.createHash("sha1");
    pass = md5.update(pass, 'utf8').digest("hex");
    return this.password.toLowerCase()==pass.toLowerCase();
};


try{
  module.exports = db.model("User");
}
catch(e){
  module.exports=db.model("User",schema);
}