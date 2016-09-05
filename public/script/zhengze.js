 $("#txt").blur(function(){
	    	var val=$(this).val();
	    	var re=/[0-9]{10,11}\@[a-z0-9]{2,3}\.com/
	    	var result=re.test(val)
	    	if(result){
	    		$("#word").text("验证正确").removeClass("active").addClass("active1")
	    	}else{
	    		$("#word").text("请输入正确邮箱格式").removeClass("active1").addClass("active")
	    	}
	    })
// $("#pwd").blur(function(){
// 	    	var val=$(this).val();
// 	    	var re=/[0-9a-zA-Z]{5,15}/
// 	    	var result=re.test(val)
// 	    	if(result){
// 	    		$("#wordpwd").text("验证正确").removeClass("active").addClass("active1")
// 	    	}else{
// 	    		$("#wordpwd").text("密码错误").removeClass("active1").addClass("active")
// 	    	}
// 	    })
