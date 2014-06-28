

var caches={};

caches.data={};
caches.step=5;

caches.get=function(key,second,geter,callback){
    var d=caches.data[key];
    if(d){
        callback(null, d.obj);
        return;
    }
    geter(function(err,data){
        if(err){
            callback(err,data);
            return;
        }
        caches.data[key]={second:second,obj:data};
        callback(null,data);
    });
};

caches.watch=function(){

    for(var index in caches.data){
      var d=caches.data[index];
        if(d){
            d.second-=caches.step;
            if(d.second<=0){
                delete caches.data[index];
            }
        }
    }

    setTimeout(function(){
        caches.watch();
    },caches.step*1000);
};

caches.watch();

module.exports=caches;