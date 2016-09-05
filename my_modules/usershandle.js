var MongoClient=require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/userslist";
function finddata(next){
    MongoClient.connect(url,function(err,db){
        db.collection("users").find().toArray(function(err,docs){
            next(docs);
            db.close();
        })
    })
};
function removedata(condition,next){
    MongoClient.connect(url,function(err,db){
        db.collection("users").removeOne(condition,function(){
            finddata(function(data){
                next(data)
            })
            db.close();
        })
    })
};
function insertdata(options,next){
    MongoClient.connect(url,function(err,db){
        db.collection("users").insertOne(options,function(){
            finddata(function(data){
                next(data)
            })
            db.close();
        })
    })
}
function updatedata(condition,options,next){
    MongoClient.connect(url,function(err,db){
        db.collection("users").updateOne(condition,options,function(){
            finddata(function(data){
                next(data);
            })
            db.close();
        })
    })
}
// MongoClient.connect(url,function(err,db){
//     db.collection("users").removeOne({ "_id": "57be8a46b" },function(){
//         db.close();
//     })
// })
// MongoClient.connect(url,function(err,db){
//     db.collection("users").find().toArray(function(err,docs){
//         console.log(docs)
//         db.close();
//     })
// })
function checkuser(options,next){
    //0 用户名不存在
    //1 密码错误
    //2 登录成功
    MongoClient.connect(url,function(err,db){
        db.collection("users").find().toArray(function(err,docs){
            db.close()
            for(var i=0;i<docs.length;i++){
                if(options.email==docs[i].email){
                    if(options.password==docs[i].password){
                        next(docs[i].username);
                        return;
                    }else{
                        next(1);
                        return;
                    }
                }
            }
            next(0);
            return;
        })

    })
}

module.exports={
    finddata:finddata,
    insertdata:insertdata,
    removedata:removedata,
    updatedata:updatedata,
    checkuser:checkuser
};
