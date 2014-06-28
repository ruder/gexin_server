
var ep={};

ep.points={};

ep.get=function(uid){
    return ep.points[uid];
};

ep.set=function(uid,socket){
    ep.points[uid]=socket;
};

ep.remove=function(uid){
    delete ep.points[uid];
};



module.exports=ep;