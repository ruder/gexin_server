var  assert=require('assert'),
    commServer=require('../core/commServer'),
    gate=require('../core/gate');


var t=function (callback) {

    gate.getConnectorServer("",function(err,url){
        commServer.call(url,"app.test.commServer.test",{t:"a",count:1},function(err,d){
            assert.areEqual(d,"a1_abc");
            callback();
        });
    });
};

t.test=function(p,callback){
  callback(null, p.t+ p.count+"_abc");
};

module.exports = t;
  