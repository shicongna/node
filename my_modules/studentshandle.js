var MongoClient=require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/studentslist";
function finddata(next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
function insertdata(options,next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").insertOne(options,function(){
            finddata(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function removedata(condition,next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").removeOne(condition,function(){
            finddata(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function updatedata(condition,options,next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").updateOne(condition,options,function(){
            finddata(function(data){
                next(data);
            })
            db.close();
        })
    })
}
function findgrade(next){
    MongoClient.connect(url,function(err,db){
        db.collection("students").find().toArray(function(err,docs){
            db.close()
            for (var i = 0; i <docs.length; i++) {
                for (var j = 0; i + j < docs.length - 1; j++) {
                    if (docs[j].grade > docs[j + 1].grade) {
                        var m = docs[j]
                        docs[j] = docs[j + 1]
                        docs[j + 1] = m
                    }
                }
            }
            next(docs)
        })
    })
}
// findgrade()
function nan(options,next){
    MongoClient.connect(url,function (err,db) {
        var sex=options.sex
        var tiao={sex:"male"}
        db.collection("students").find(tiao).toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}

function nv(options,next){
    MongoClient.connect(url,function (err,db) {
        var sex=options.sex
        var tiao={sex:"female"}
        db.collection("students").find(tiao).toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
}
module.exports={
    finddata:finddata,
    insertdata:insertdata,
    removedata:removedata,
    updatedata:updatedata,
    findgrade:findgrade,
    nan:nan,
    nv:nv
}

