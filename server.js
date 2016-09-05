var express=require("express");
var path=require("path");
var datahandle=require("./my_modules/datahandle")
var studentshandle=require("./my_modules/studentshandle");
var usershandle=require("./my_modules/usershandle")
var session=require("express-session");
var bodyParser=require("body-parser");
var app=express();
app.set("view engine","jade");
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    "secret":"hello",
    "cookie":{maxAge:60*1000}
}));
app.get("/",function(req,res){
    var h2info=req.query.info;
    res.render("login",{"info":h2info})
});
app.get("/getdata",function(req,res){
    studentshandle.finddata(function(data){
        res.send(data)
    })
})
app.get("/getuserdata",function(req,res){
    usershandle.finddata(function(data){
        res.send(data)
    })
})
app.get("/userlist",function(req,res){
    res.render("users")
});
app.get("/studentlist",function(req,res){
    res.render("students")
});
app.get("/login",function(req,res){
    if(req.session.username){
        res.render("users",{name:req.session.username});
    }else{
        res.redirect("/")
    }
})
app.get("/findgrade",function(req,res){
    studentshandle.findgrade(function(data){
        res.send(data)
    })
})
app.get("/nan",function (req,res) {
    studentshandle.nan(req.query,function(data){
        res.send(data);
    })
})
app.get("/nv",function (req,res) {
    studentshandle.nv(req.query,function(data){
        res.send(data);
    })
})
app.post("/login",function(req,res){
    var userinfo=req.body;
    usershandle.checkuser(userinfo,function(result){
        console.log(result)
        if(result==0){
            res.redirect("/?info=用户不存在")
        }else if(result==1){
            res.redirect("/?info=密码错误")
        }else{
            req.session.username=result
            res.redirect("/login");
        }
    })
})
app.post("/insertdata",function(req,res){
    studentshandle.insertdata(req.body,function(data){
        res.send(data);
    })
})
app.post("/insertuserdata",function(req,res){
    usershandle.insertdata(req.body,function(data){
        res.send(data);
    })
})
app.post("/removedata",function(req,res){
    studentshandle.removedata(req.body,function(data){
        res.send(data);
    })
})
app.post("/removeuserdata",function(req,res){
    usershandle.removedata(req.body,function(data){
        res.send(data);
    })
})
app.post("/updatedata",function(req,res){
    var data=req.body;
    var condition = {"number":data.number}
    studentshandle.updatedata(condition,data,function(){
        res.send(data)
    })
})
app.post("/updateuserdata",function(req,res){
    var data=req.body;
    var condition = {"number":data.number}
    usershandle.updatedata(condition,data,function(){
        res.send(data);
    })
})
app.listen(3000,function(){
    console.log("服务器已成功启动")
})


