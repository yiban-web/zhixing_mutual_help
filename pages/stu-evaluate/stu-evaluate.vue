<template>

	<view>
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="main">
			<view class="body">
				<detail :helpDatail="helpDatail" type="1"></detail>
				<view class="pingJia vertical-center">
					<p>评价</p>
				</view>
				<view class="help-title vertical-center">
					<p>综合评价</p>
				</view>
				<view class="star">
					<view class="item" >
						<text>{{starList[0]}}</text><uRate :count="5" v-model="grade[0]" active-color="#EE836C" size="42" style="" :disabled="yesPj"></uRate>
					</view>
					<view class="item" >
						<text>{{starList[1]}}</text><uRate :count="5" v-model="grade[1]" active-color="#EE836C" size="42" style="" :disabled="yesPj"></uRate>
					</view>
					<view class="item" >
						<text>{{starList[2]}}</text><uRate :count="5" v-model="grade[2]" active-color="#EE836C" size="42" style="" :disabled="yesPj"></uRate>
					</view>
					
				</view>
				<view class="help-title vertical-center ">
					<p>评价理由</p>
				</view>
				<view class="uField">
					<uField v-model="reason" placeholder="请输入评价理由" type="textarea" class="last" :disabled="yesPj"></uField>
				</view>
				<!-- <uplode :params="returnParams()" :maxCount="maxCount" :isCreateRecord="yesPj" :action="action" :images="helpDatail.image"
				 ref="uplode" @uploaded="uploadRes"></uplode> -->
			</view>
			<view class="btn">

				<uButton :custom-style="customStyle1" shape="circle" disabled v-if="helpDatail.evaluate==1">已评价</uButton>
				<uButton :custom-style="customStyle1" shape="circle" disabled v-else-if="grade[0] == 0||grade[1] == 0||grade[2] == 0">提交评价</uButton>
				<uButton :custom-style="customStyle0" shape="circle" @click="submit" v-else-if="helpDatail.evaluate==0">提交评价</uButton>
			</view>
		</view>

	</view>
</template>

<script>
	//这个页面是我的评价
	import detail from "../../components/class-datail/class-datail.vue"
	import uRate from "uView-ui/components/u-rate/u-rate.vue"
	import uField from "uView-ui/components/u-field/u-field.vue"
	import uplode from "../../components/upload-image/upload-image.vue"
	import {
		submitEvaluate,oneClassEvaluate
	} from "../../service/xk-stu.js"
	export default {
		components: {
			detail,
			uRate,
			uField,
			uplode
		},
		data() {
			return {
				helpDatail: {},
				starList:["课程质量","课程效果","互助态度"],
				classId:"",
				grade: [0,0,0],
				title:"我的",
				reason: "",
				action: `${uni.getStorageSync('API_URL')}/student/submitEvaluate`,
				filesArr: [],
				customStyle0: {
					marginTop: "20rpx",
					marginBottom: "20rpx",
					width: "30vw",
					color: "white",
					backgroundColor: this.$root.buttonColor,
					fontSize: "1.2rem",
				},
				customStyle1: {
					marginTop: "20rpx",
					marginBottom: "20rpx",
					width: "30vw",
					color: "white",
					backgroundColor: "#696969",
					fontSize: "1.2rem",
				},
				params: {
					data: "124"
				},
				header: {
					'Cookie': "PHPSESSID=" + uni.getStorageSync("sessionId")
				},
				maxCount: 4, //最大上传数量
				nowCount: 0, //目前选择数量
				haveImg: false, //是否有照片
				yesPj: false, //已评价 
				seccessPj: false ,//评价成功
				backFoot:3,//2返回签到，3返回我的
			};
		},
		onLoad(option) {
			console.log("classId",option.classId)
			this.classId = option.classId
			this.getData()
			option.type==2?this.backFoot = 2:this.backFoot = 3  //2跳到我的课程，3到我的
		},
		methods: {
			goTo() {
				uni.redirectTo({
					url:`../xk-pilot-page/xk-pilot-page?chooseFoot=${this.backFoot}`
				});
			},
			async submit() { //上传图片
			    this.$refs.model.showModel("","提交中",false,2)
				/* if (this.$refs.uplode.isHaveImg()&&0) {
					this.$refs.uplode.uploadImg()
				} else {
					try{
						let data = await submitEvaluate(this.returnParams())
						this.uploadRes(data.code)
					}catch(e){
						this.uploadRes(0)
						return
						//TODO handle the exception
					}
					this.$refs.hideModel()
				} */
				try{
					let data = await submitEvaluate(this.returnParams())
					this.uploadRes(data.code)
				}catch(e){
					this.uploadRes(0)
					return
					//TODO handle the exception
				}
				this.$refs.hideModel()
			},
			async getData(){
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try{
					let data = await oneClassEvaluate({
						helpClassId:this.classId
					})
					if(data.code==1){
						this.helpDatail = data.data
						if(this.helpDatail.evaluate==1){
							this.yesPj = true
							for(let i in this.helpDatail.evaluateGrade){
								this.$set(this.grade,i,this.helpDatail.evaluateGrade[i])
							}
							//this.grade = this.helpDatail.evaluateGrade
							this.reason = this.helpDatail.evaluateReason
						}
					}
				}catch(e){
					console.log(e)
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
					//TODO handle the exception
				}
				this.$refs.model.hideModel()
			},
			uploadRes(code) { //请求之后处理
			    //this.$refs.hideModel()
				console.log(code)
				if (code == 1) {
					this.helpDatail.evaluate = 1
					this.maxCount = this.nowCount
					this.$refs.model.showModel("checkmark-circle", "评价成功", true, 1)
					this.seccessPj = true
					this.yesPj = true
				} else {
					this.$refs.model.showModel("close-circle", "评价失败", true, 1)
				}
			},
			returnParams() { //请求数据
				return {
					helpClassId: this.helpDatail.helpClassId,
					evaluateGrade: this.grade,
					evaluateReason: this.reason,
					image: []
				}
			},
			previewImg(item) { //预览图片
				this.$refs.model.showModel("", "", true, 4, item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		min-height: 110vh;

		.body {
			background-color: white;
			max-width: 95%;
			margin-left: 2.5%;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
			.uField{
				padding: 20rpx 40rpx;
			}
		}
	}

	.pingJia {
		height: 70rpx;
		background-color: #F4F1BB;
		color: black;
		font-size: 1.2rem;
		padding-left: 40rpx;
		justify-content: left;
	}

	.star {
		padding: 20rpx 40rpx;
		.item{
			margin-bottom: 10rpx;
		}

	}

	.help-title {
		color: $u-content-color;
		font-size: 16px;
		background-color: #F9F9F9;
		height: 50rpx;
		padding-left: 40rpx;
		justify-content: left;
	}

	.upload-img {
		padding: 10rpx 40rpx;
		border-top: 2px dashed #F2F2F2;
		min-height: 140rpx;

		.uploaded-img {
			display: flex;

			.uImage {
				margin-right: 30rpx;
			}
		}
	}

	.btn {
		margin-top: 50rpx;
	}
</style>
