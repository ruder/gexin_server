var   config = require('../config')
    , async=require('async');

var testOper = function () {
    var tests = [
        "commServer"
      , "db_adu"
    ];

    var tasks=[];

    for (var i = 0; i < tests.length; i++) {
        tasks.push(_testModelCall(tests[i]));
    }

    async.series(tasks, function () {
        console.log("all test is fine !");
    });
};

var _testModelCall = function (tname) {
    var t = require("./" + tname);
    return function (cb) {
        t(function(){
            console.log(tname+" test is fine !");
            cb();
        });
    };
};


if(config.test){
    setTimeout(testOper, 5000);
}

module.exports = {};