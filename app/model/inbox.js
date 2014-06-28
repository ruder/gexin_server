var Schema = require('mongoose').Schema
    , mongoose = require('mongoose')
    , ObjectId = mongoose.Types.ObjectId
    , db=require('../core/db');

//用户
var schema = new Schema({
    //帐号
    accountId:String,
    //密码
    count:Number,
    //创建时间
    date:Date,
    //指令
    commands:[{
        //时间
        date:Date,
        module:String,
        type:String,
        content:String
    }]
});



try{
    module.exports = db.model("Inbox");
}
catch(e){
    module.exports=db.model("Inbox",schema);
}