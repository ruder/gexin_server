var assert = require('assert')
  , async=require('async')
  , db=require('../core/db');

var Schema = require('mongoose').Schema;

var TestSchema = Schema({ name: String });

var Test = db.model('testModel', TestSchema);

module.exports = function (callback) {
    var obj = new Test();
    obj.name = 't';

    async.series({
        "step1:save": function (cb) {
            obj.save(function (err, o1) {
                cb();
            })
        },
        "step2:find": function (cb) {
            Test.find({ name: obj.name }, function (err, o1) {
                assert.ok(o1.length != 0, 'mongodb cant save object~');
                cb();
            });
        },
        "step3:delete": function (cb) {
            obj.remove(function () {
                cb();
            })
        },
        "step4:find2": function (cb) {
            Test.find({ name: obj.name }, function (err, o2) {
                assert.ok(o2.length == 0, 'mongodb cant delete object~');
                cb();
            });
        }
    }, function () {
        callback();
    });

};