var http = require('http')
    URL = require('url');

var cserver={};

cserver.call_path="excute";
cserver.module_prefix="../../";

cserver.register=function(app){
    app.post("/"+cserver.call_path, function (req, res) {
        cserver.response(req,res);
    });
};

cserver.response=function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    try {
        var parmas = JSON.parse(req.body.parmas);

        var pns = parmas[0].split('.');
        var mname = pns.pop();
        var mpath = cserver.module_prefix + pns.join("/") + ".js";

        var m = require(mpath);
        if (!m) {
            res.json({ err: "无法找到指定的模块！" });
            return;
        }
        var mothod = m[mname];
        if (!mothod) {
            res.json({ err: "无法找到指定的操作！" });
            return;
        }

        var callbackfuction = function (err, d) {
            res.json({ err: err, d: d });
        };

        for (var i = 0; i < parmas.length; i++) {
            if (parmas[i] == "callback") {
                parmas[i] = callbackfuction;
            }
            else{
                parmas[i]=parmas[i];
            }
        }

        if (typeof mothod == "function") {
            parmas.splice(0, 1);
            parmas.push(req);
            parmas.push(res);

            var d = mothod.apply(m, parmas);

        }
        else {
            var d = mothod;
            res.json({ err: null, d: d });
        }
    }
    catch (e) {
        //throw e;
        res.json({ err: e });
    }
};

//调用实例 commServer.call("http://192.168.0.100:3000/","app.test.commServer.test",{t:"a",count:1},function(err,d){ });
//被调用方法 app.test.commServer.test.test=function(p,callback){....}
cserver.call=function(){

    var parmas = [];
    var callback = undefined; //只能一个callback
    var fail = undefined;
    var url=arguments[0];
    var u=URL.parse(url);

    for (var i = 1; i < arguments.length; i++) {
        var a = arguments[i];
        if (typeof a == "function") {
            if (!callback) {
                parmas.push("callback")
                callback = a;
            }
            else {
                fail = a;
            }
        }
        else
            parmas.push(a);
    }

    var post_data = JSON.stringify( { parmas: JSON.stringify(parmas)});

    var options = {
        hostname: u.hostname,
        port: u.port,
        path: '/'+cserver.call_path,
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Content-Length": post_data.length
        }
    };


    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            if(callback){
                try{
                    var obj=JSON.parse(chunk);
                    try{
                        callback(obj.err,obj.d);
                    }catch(ex){

                    }
                }
                catch(e){
                    callback(e);
                }

            }
        });
    });
    req.on('error', function(e) {
        if(callback)
            callback(e);
    });

    req.write(post_data + "\n");
    req.end();
};

module.exports=cserver;