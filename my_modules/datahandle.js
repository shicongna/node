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

module.exports={
    finddata:finddata,
    insertdata:insertdata,
    removedata:removedata
    // updatadata:updatadata
}