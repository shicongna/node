$(".insertdata").click(function () {
    // insertdata按钮已创建好，直接获取点击事件，即可弹出模态框
    $("#myModal").modal();
    $(".number").removeAttr("readonly");
})

// $(".updatedata").click(function () {
//     // 新添加的修改按钮没有绑定事件，不能用，用事件委托处理
//     var number = $(this).attr("data_num");
//     $(".number").val(number).attr("readonly","readonly");
// })

// $("#grade").click(function(){
// 	$.ajax({
// 		method: "get",
// 		url: "/findgrade",
// 		data:data
// 		}).done(function (data) {
// 		bubblesort(data)
// })
// 		})

// function bubblesort(array){
// 			for(var i=0;i<array.length;i++){
// 				for(var j=0;i+j<array.length-1;j++){
// 					if(array[j]>array[j+1]){
// 						var m=array[j];
// 						array[j]=array[j+1];
// 						array[j+1]=m
// 					}
// 				}	
// 			}
// 			return array
// 		}
		



