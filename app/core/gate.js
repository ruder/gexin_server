
var gate={};


//获得用户基础信息
gate.getUserInfo=function(userid,callback){

};

//给用户发消息
gate.pushMessage=function(userid,messages,callback){

};

gate.getConnectorServer=function(userid,callback){
    callback(null,"http://192.168.0.100:3000/");
};


module.exports=gate;
