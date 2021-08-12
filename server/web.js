const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 8888
let name="党锴瑞"
let img = "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLYjZpXXEtE4gh8uKG2KhDGgN1ia0qZee2wx32hUq0cKvr1MxeuJDq5JmgnibdWllaicfRC3KWxMo3sw/132"
app.use(bodyparser.urlencoded({
	extended: true
}))
app.use(bodyparser.json())
app.all('*', function(req, res, next) {

	res.header("Access-Control-Allow-Origin", "*"); //项目上线后改成页面的地址

	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	
	//res.status(404).send({ errMsg: 'something blew up' })

	next();

});
app.post('/bbb', function(req, res) {
	console.log(req.body)
	console.log("123")

	res.send(JSON.stringify({
		code: 1,
		data: "post成功"
	}))

})

app.get('/aaa', (req, res) => {

	res.send({
		code: 1,
		data: "get成功"
	})
})
//common
app.get('/common/getUserType', (req, res) => {

	res.send({
		code: 1,
		userType: 8
	})
})


//student
app.post('/student/submitEvaluate', (req, res) => {
	res.send({
		code: 1
	})
})
app.get("/student/showUserData", (req, res) => {  //改过
	let type = req.query.userType
	let data = []
	//console.log(JSON.parse(req.query.college).length)
	if (JSON.parse(req.query.college).length != 0) {
		data = showUserData(2, type)
	} else {
		console.log(1)
		data = showUserData(6, type)
	}
	//console.log(data)
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/student/myCourse", (req, res) => {
	let data = poiltNum(5)
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/student/myEvaluate", (req, res) => {
	let data = poiltNum(5)
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/student/myInfo", (req, res) => {
	let data = {
		name: name,
		class: "计183",
		college: "计算机院",
		userType: 3,
		headUrl:img
	}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.post("/student/apply",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.get("/student/scanCode",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})

app.get("/student/oneClassEvaluate", (req, res) => {
	let data = poiltNum(1)
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})


//helper

app.get('/helper/signQRCode', (req, res) => {

	res.send({
		code: "QWED",
	})
})

app.post("/helper/leaveClass",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.post("/helper/postMessage",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.get("/helper/pilotData",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data:{
			name: name,
			class: "计183",
			college: "计算机院",
			userType: 4,
			helpSubject:["高数","线代"],
			headUrl: img
		}
	})
})
app.get("/helper/lookMyHelpCourse",(req,res)=>{
	let num=5
	let data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			helpClassId: "1234121"+i + 1, //帮扶信息的唯一标式
			helperName: name,
			helpSubject: "高数",
			helperCollege: "土木建筑工程学院",
			helpState: i%3+1,
			applyPeople: [{
				name: "张三",
				headUrl: img,
				sex:i%2
			},{
				name: "张三",
				headUrl: img,
				sex:i%2
			},{
				name: "张三",
				headUrl: img,
				sex:i%2
			}], //报名情况
			signPeople: [{
				name: "张三",
				headUrl: img,
				sex:i%2,
				class:"计182",
				userId:"123455",
				logOut:1
			},
			{
				name: "张三",
				headUrl: img,
				sex:i%2,
				userId:"123455",
				class:"计182",
				logOut:0
			}], //已签到情况
			isCreateRecord: i%2,
			recordData: {
				selfEvaluation: 1, //自我评价分数
				evaluateGrade: -1, //学困生评价 -1表示未评价
				evaluateReason: "啦啦啦啦啦啦啦",
				selfImage:[]
				// selfImage: [
				// 	img,
				// 	img
				// ],
			},
				headUrl: img,
				helpTime: 1612254895,
				helpAddress: "曲江校区教10-205",
				helpDetail: "数组与函数极限算法，洛必达法则。数组与函数极限算法，洛必达法则。",
		}
	}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.post("/helper/lookMyclassData",(req,res)=>{
	let num=5
	let i=3
	let data = {
			helpClassId: "1234121", //帮扶信息的唯一标式
			helperName: name,
			helpSubject: "高数",
			helperCollege: "土木建筑工程学院",
			helpState: i%3+1,
			applyPeople: [{
				name: "张三123ewqefazsvszgdvx",
				headUrl: img,
				sex:i%2
			},{
				name: "张三",
				headUrl: img,
				sex:i%2
			},{
				name: "张三SDfesgvsfazs",
				headUrl: img,
				sex:i%2
			}], //报名情况
			signPeople: [{
				name: "张三",
				headUrl: img,
				sex:i%2
			},
			{
				name: "王五",
				headUrl: img,
				sex:i%2
			}], //已签到情况
			isCreateRecord: i%2,
			recordData: {
				selfEvaluation: 1, //自我评价分数
				evaluateGrade: -1, //学困生评价 -1表示未评价
				evaluateReason: "啦啦啦啦啦啦啦",
				selfImage:[]
				// selfImage: [
				// 	img,
				// 	img
				// ],
			},
				headUrl: img,
				helpTime: 1612254895,
				helpAddress: "曲江校区教10-205",
				helpDetail: "数组与函数极限算法，洛必达法则。数组与函数极限算法，洛必达法则。",
		}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/helper/startCount",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.get("/helper/endCount",(req,res)=>{
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
//领航员
app.post('/helper/createRecord', (req, res) => { //提交帮扶记
	res.send({
		code: 0
	})
})

app.get("/helper/postRemind", (req, res) => {
	res.send({
		code: 1
	})
})
app.post('/helper/applyResult',(req,res) => {
		res.send(
				{
				   code:1,//0 1 0成功 1失败
				   data:{
				       helpClassId:1,
				       helperName:name,
				       helperCollege:"计算机学院",
				       class:"计183",
				       helpSubject:["高数","C语言"],
				       honor:"1231",
				       image:[],
				       headUrl:img,
				       applyState: 2,
					   haveApply:0
				   }
				}
		);
})

app.post('/helper/rankingList',(req,res)=>{
	res.send({
						   code: 1,//0/1
						   data:[
						   {
						      helperName:"张某某",
						      helpCollage:"国际工学院国际工学院国际工学院",
						      class:"国际191班",
						      headUrl:"头像地址",
						      helperGrade:5, //星级
						      userId:"" //使用者的唯一id标识
						   },
							 {
							    helperName:"张某某",
							    helpCollage:"国际工学院",
							    class:"国际191班",
							    headUrl:"头像地址",
							    helperGrade:4, //星级
							    userId:"" //使用者的唯一id标识
							 },
							 {
							    helperName:"张某某",
							    helpCollage:"国际工学院",
							    class:"国际191班",
							    headUrl:"头像地址",
							    helperGrade:3, //星级
							    userId:"" //使用者的唯一id标识
							 },
							 {
							    helperName:"张某某",
							    helpCollage:"国际工学院",
							    class:"国际191班",
							    headUrl:"头像地址",
							    helperGrade:3, //星级
							    userId:"" //使用者的唯一id标识
							 }
						   ]
				});
})
app.post('/helper/applyFor',(req,res)=>{
	console.log(req.body);
	res.send({
		code:1
	})
})

//管理员
app.post("/admin/adLookUserList", (req, res) => {
	//console.log(req.body)
	let num = 7
	let data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			userId: i + 1,
			class: "计183",
			helperName: name,
			helperCollege: "计算机院",
			headUrl: img,
		}
	}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.post("/admin/adLookUserData", (req, res) => {
	let data = classData(3)
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})

app.get("/admin/adLookApply", (req, res) => {
	let data
	if (req.query.applyState == 0) {
		data = applyData(4)
	} else {
		data = applyData(1)
	}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/admin/lookManager", (req, res) => {
	let data
	if (req.query.adType == 7) {
		data = lookManager(4)
	} else {
		data = lookManager(1)
	}
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: data
	})
})
app.get("/admin/adMyData", (req, res) => {
	res.send({
		code: 1,
		errMsg: '服务器错误',
		data: {
			adName: "王小华",
			adCollege: "计算机学院",
			adNumber: "318293792",
			headUrl: img,
			userType: 6
		}

	})
})

app.post("/admin/adAuditApply", (req, res) => {
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.post("/admin/addStu", (req, res) => {
	res.send({
		code: 1,
		errMsg: '服务器错误',
	})
})
app.post("/admin/searchImport",(req,res)=>{
	console.log(req)
	res.send(
		{
		code:1,
			data:[
				{
					'stuNum':'3190921999',
					'helperName':'张一',
					'class':'英语181',
					'helperCollege':'外国语学院'
				},
				{
					'stuNum':'3190921999',
					'helperName':'张二',
					'class':'英语181',
					'helperCollege':'外国语学院'
				},
				{
					'stuNum':'3190921999',
					'helperName':'张三',
					'class':'英语181',
					'helperCollege':'外国语学院'
				}
			]
		}
	)
})

app.post("/admin/importFriend",(req,res)=>{
	console.log("/admin/importPoilt")
	res.send({
		code: 1,
	})
})


function showUserData(num, type) {
	let data = []
	switch (type) {
		case "4" || 4:
			data = poiltNum(num);
			break;
		case "5" || 5:
			data = poiltNum(num);
			break;
	}

	return data
}

function poiltNum(num) {
	console.log(num)
	let data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			helpClassId: "1231" + i, //帮扶信息的唯一标式
			helperName: name,
			helpSubject: "高数",
			helperCollege: "计算机院",
			helpState: i % 3 + 1,
			headUrl: img,
			helpTime: 1612254895,
			helpAddress: "曲江校区教10-205",
			helpDetail: "数组与函数极限算法，洛必达法则。数组与函数极限算法，洛必达法则。",
			isApply: i % 2 == 0 ? 0 : 1,
			helpTime: 1612254895,
			signIn: i % 2 == 0 ? 2 : 1,
			evaluate: i % 2 == 0 ? 1 : 0,
			evaluateGrade: i % 5 + 1,
			evaluateReason: "讲的一级棒",
			image: [img, img],
			class:"计183班"
		}
	}
	return data
}


function applyData(num) {
	data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			userId: "320777701" + i,
			helperName: name,
			helperCollege: "计算机学院",
			class: "计183",
			helpSubject: ["高数", "线代","C语言"],
			honor: "国家励志奖学金",
			image: [], // 可能有多张图片
			headUrl: img,
			applyState: i%3+1,

		}
	}
	return data
}

function classData(num) {
	let data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			helpClassId: i + 1, //帮扶信息的唯一标式
			helperName: name,
			helpSubject: "高数",
			helperCollege: "计算机院",
			helpState: 1,
			headUrl: img,
			helpTime: 1612254895,
			helpAddress: "曲江校区教10-205",
			helpDetail: "数组与函数极限算法，洛必达法则。数组与函数极限算法，洛必达法则。",
			isApply: i%2
		}
	}
	return data
}



function lookManager(num) {
	let data = new Array(num)
	for (let i = 0; i < num; i++) {
		data[i] = {
			adName: "马老师",
			adCollege: "计算机学院",
			adNumber: "3180922033",
			headUrl: img,
			userType: 7
		}
	}
	return data
}


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
