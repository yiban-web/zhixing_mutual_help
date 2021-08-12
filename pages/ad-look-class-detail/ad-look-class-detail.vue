<template>
	<view>
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" title="个人课程信息"></pageHead>
		<view class="main">
			<view class="body" v-show="loading">
				<datail :helpDatail="helpDatail" :type="2" ></datail>
				<view class="reload-data vertical-center" @click="getData">
					<p>刷新数据</p>
				</view>
				<view v-if="userType!=3">
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
				<view v-else  class="sign-state">
					<p>签到情况：{{helpDatail.signId==1?"已签到":"未签到"}}</p>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	//要生成帮扶记录 18
	import stuHead from "../../components/stu-head/stu-head.vue"
	import datail from "../../components/class-datail/class-datail.vue"
	import {lookClassData} from "../../service/manager.js"
	export default {
		components: {
			stuHead,
			datail
		},
		data() {
			return {
				helpDatail: {},
				btnWord:"",
				canvasUrl:"",
				classState:-1,
				title:"我的课程",
				classId:"",
				userId:"",
				userType:0,
				loading:false
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			goTo() {
				uni.redirectTo({
				    url: '../manager-page/manager-page'
				});
			},
			stateColor(state) {
				switch (state) {
					case 1:
						return "#9E487F";
					case 2:
						return "red";
					case 3:
						return "#909399"
				}
				return "black"
			},
			async getData(){
				this.loading = false
				try{
					this.$refs.model.showModel("", "加载中...", false, 2, "")
					let data = await lookClassData({
						userId:this.userId,
						helpClassId:this.classId,
						userType:this.userType
					})
					if(data.code==1){
						this.loading = true
						this.helpDatail = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			}
		},
		onLoad(option) {
			//console.log(JSON.parse(decodeURIComponent(option.data)))
			this.classId = option.classId
			this.userId = option.userId
			this.userType = option.type=='true'?4:3
		},
		watch:{
			classState:function(val,oldVal){
				this.btnWordChange(val)
				this.helpDatail.helpState = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		max-height: 90vh;
		overflow-y: scroll;
		p {
		margin-bottom: 20rpx;
	}
	}

	.body {
		background-color: white;
		width: 95%;
		margin-left: 2.5%;
		box-shadow: 1px 3px 8px 3px #C0C0C0;
		padding-bottom: 20rpx;
	}

	.text {
		color: $u-content-color;
		font-size: 1rem;
	}

	.class-data {
		padding: 40rpx;

		.subject {
			display: flex;
			justify-content: space-between;
		}

		.class-time {
			display: flex;
		}

		.help-time {
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;
			width: 50vw;

		}
	}

	

	.caozuo-btn {
		justify-content: space-around;
		margin-bottom: 20rpx;
		.word {
			color: $title-background-color;
			text-align: center;
			font-size: 1rem;
			margin-top: 20rpx;
		}
	}
	
	.sign-case{
		height: $title-height;
		background-color: $yellow-background;
		padding-left: 40rpx;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		p{
			font-size: 1.1rem;
			margin-bottom: 0;
		}
	}
	.sign-state{
		margin: 10rpx 40rpx;
		font-size: 1rem;
		color: $u-content-color;
		line-height: 60rpx;
	}
	.reload-data{
		margin-left: 40rpx;
		margin-bottom: 40rpx;
		padding: 10rpx;
		border: 1px solid #6699CC;
		color: #6699CC;
		width: 30vw;
		height: 70rpx;
		border-radius: 10px;
		p{
			margin-bottom: 0;
		}
	}
	.reload-data:active{
		background-color: #6699CC;
		color: white;
	}
</style>
