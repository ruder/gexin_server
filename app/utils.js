var utils={};
utils.hit = function (hitRate) {
    if (hitRate <= 0)
        return false;
    return hitRate > utils.random(0, 100);
};
utils.random = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
};

utils.each = function (array, cb) {
    if (typeof array == "number") {
        for (var i = 0; i < array; i++) {
            cb(i);
        };
        return;
    }
    for (var i = array.length - 1; i >= 0; i--)
        cb(array[i], i);
};

utils.findone = function (array, action) {
    if(!array)
        return null;
    for (var i = array.length - 1; i >= 0; i--)
        if(action(array[i]))
            return array[i];
    return null;        
};

utils.find = function (array, action) {
    var ar=[];
    if(!array)
        return ar;
    for (var i = array.length - 1; i >= 0; i--)
        if(action(array[i]))
            ar.push(array[i]);
    return ar;
};

utils.exist=function(array,obj){
    if(!array)
        return false;
    for (var i = array.length - 1; i >= 0; i--)
        if(array[i]==obj)
            return true;
    return false;
};

utils.draw = function (array) {
    if (!array || array.length <= 0)
        return null;

    var index = utils.random(0, array.length);
    var o = array[index];
    array.splice(index, 1);
    return o;
};

utils.randomSelect = function (array) {
    if (!array || array.length <= 0)
        return null;
    var index = utils.random(0, array.length);
    return array[index];
};

utils.max=function(array){

    var m=0;
    utils.each(array,function(a){
        if(m<a)
            m=a;
    });
    return m;
};

utils.remove=function(array,obj){
    for (var i = array.length - 1; i >= 0; i--)
        if(array[i]==obj){
            array.splice(i,1);
            return;
        }
    return false;
};

utils.trim= function(str){
    return str.replace(/(^"s*)|("s*$)/g,"");
};


module.exports = utils;