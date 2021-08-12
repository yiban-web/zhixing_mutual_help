<template>
	<view>
		<model ref="model"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="">
			<datail :helpDatail="helpDatail" :type="2"></datail>
			<view class="sign-case vertical-center">
				<p>帮扶记录</p>
			</view>
			<view class="help-title vertical-center">
				<p>自我评价</p>
			</view>
			<view class="star">
				<uRate :count="5" v-model="params.selfEvaluation" active-color="#EE836C" size="42" :disabled="successPj" v-if="!isCreateRecord"></uRate>
				<uRate :count="5" v-model="helpDatail.recordData.selfEvaluation" active-color="#EE836C" size="42":disabled="true" v-else></uRate>
				
			</view>
			<view class="help-title vertical-center ">
				<p>评价理由</p>
			</view>
			<view class="uField">
				<uField v-model="params.evaluateReason" placeholder="请输入评价理由" type="textarea" class="last" :disabled="successPj" v-if="!isCreateRecord"></uField>
				<uField v-model="helpDatail.recordData.evaluateReason" type="textarea" class="last" :disabled="true" v-else></uField>
			</view>
			<!-- <uplode :params="params" :maxCount="maxCount" :isCreateRecord="helpDatail.isCreateRecord" :action="action" :images="helpDatail.recordData.selfImage"
			ref="uplode" @uploaded="uploadRes" ></uplode> -->
			<view class="btn">
				<uButton :custom-style="customStyle0" shape="circle" @click="submit" v-if="params.selfEvaluation != 0&&params.evaluateReason!=''&&!successPj">提交评价</uButton>
				<uButton :custom-style="customStyle1" shape="circle" disabled v-else-if="helpDatail.isCreateRecord==0">提交评价</uButton>
			</view>
		</view>
		<view class="xks-pj">
			<view class="sign-case vertical-center">
				<p>学困生评价</p>
			</view>
			<view class="xks-pj-data">
				<view class="star">
					<uRate :count="5" v-model="helpDatail.recordData.evaluateGrade.s" active-color="#EE836C" size="42" :disabled="true" v-if="helpDatail.recordData.evaluateGrade!=-1"></uRate>
					<p v-else>未评价</p>
				</view>
				<view class="xks-pj-tx vertical-center" @click="postRemind">
					<p>发送评价提醒</p>
				</view> 
			</view>
		</view>
		<view class="" v-if="successPj||helpDatail.isCreateRecord">
			<view>
				<view class="sign-case vertical-center">
					<p>报名状况</p>
				</view>
				<stuHead :user="helpDatail.applyPeople"></stuHead>
			</view>
			<view>
				<view class="sign-case vertical-center">
					<p>已签到人数</p>
				</view>
				<stuHead :user="helpDatail.signPeople"></stuHead>
			</view>
		</view>
	</view>
</template>

<script>
	//生成帮扶记录
	import uploadImg from "../../components/upload-image/upload-image.vue"
	import uRate from "uView-ui/components/u-rate/u-rate.vue"
	import uField from "uView-ui/components/u-field/u-field.vue"
	import datail from "../../components/class-datail/class-datail.vue"
	import uplode from "../../components/upload-image/upload-image.vue"
	import stuHead from "../../components/stu-head/stu-head.vue"
	import {createRecord,postRemind} from "../../service/pilot.js"
	export default {
		components: {
			uploadImg,
			uRate,
			uField,
			datail,
			uplode,
			stuHead
		},
		data() {
			return {
				helpDatail: {},
				maxCount: 4,
				action: `${uni.getStorageSync('API_URL')}/helper/createRecord`,
				successPj:false,
				title:"我的课程",
				isCreateRecord:false,//评价过
				params: {
					helpClassId: 0,
					selfEvaluation: 0,
					evaluateReason: "",
				},
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
			};
		},
		methods: {
			goTo() {
				uni.redirectTo({
					url:"../pilot-page/pilot-page"
				});
			},
			async submit() {
				let fromData = new Object()
				for(let i in this.params){
					fromData[i] = this.params[i]
				}
				//this.$refs.uplode.getParams(fromData)
				if (false&&this.$refs.uplode.isHaveImg()) {//取消上传图片功能
					this.$refs.uplode.uploadImg(fromData)
				} else {
					this.$refs.model.showModel("", "提交中...", false, 2)
					try{
						let data = await createRecord(fromData)
						this.uploadRes(data.code)
					}catch(e){
						this.$refs.model.hideModel()
						return false
					}
					
				}
			},
			uploadRes(code){//请求之后处理
			    //this.$refs.model.hideModel()
				if(code==1){
					this.helpDatail.isCreateRecord = 1
					this.$refs.model.showModel("checkmark-circle", "评价成功", true, 1)
					this.successPj = true
				}
				else{
					//this.$refs.model.showModel("close-circle", "评价失败", true, 1)
				}
			},
			async postRemind(){//发送评价提醒
			    this.$refs.model.showModel("", "发送中...", false, 2)
			    try{
			    	let data = await postRemind({
			    		helpClassId:this.helpDatail.helpClassId
			    	})
					console.log(data)
			    	if(data.code==1){
			    		this.$refs.model.showModel("checkmark-circle", "发送成功", true, 1)
						return
			    	}
			    }catch(e){
					this.$refs.model.hideModel()
			    	//TODO handle the exception
			    }
				this.$refs.model.hideModel()
			}
		},
		onLoad(option) {
			this.helpDatail = JSON.parse(decodeURIComponent(option.data))
			this.params.helpClassId = this.helpDatail.helpClassId
			if(this.helpDatail.isCreateRecord==1){
				this.isCreateRecord = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign-case {
		height: $title-height;
		background-color: $yellow-background;
		padding-left: 40rpx;
		width: 100%;
		justify-content: flex-start;
		align-items: center;

		p {
			font-size: 1.2rem;
			margin-bottom: 0;
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

	.star {
		padding: 20rpx 40rpx;
	}

	.class-data {
		padding: 20rpx 40rpx;
		font-size: 1rem;
		color: $u-content-color;
		line-height: 160%;
	}

	.uField {
		padding: 10rpx 40rpx;
	}
	.xks-pj{
		font-size: 1rem;
		color: $u-content-color;
		margin-bottom: 40rpx;
		margin-top: 40rpx;
		.xks-pj-data{
			padding-left: 40rpx;
		}
		.xks-pj-tx{
			background-color: $yellow-background;
			height: 2rem;
			border-radius: 10px;
			width: 30vw;
		}
	}
	
</style>
