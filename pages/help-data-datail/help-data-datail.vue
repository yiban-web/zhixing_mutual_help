<template>
	<view class="help-datail">
		<model ref="model"></model>
		<pageHead @goTo="goTo" :title="pageTitle"></pageHead>
		<view class="main">
			<view class="data-item ">
				<view class="text vertical-center">
					<uImage :src="helpDatail.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p>{{helpDatail.helperName}}&emsp; &emsp; 帮扶科目：{{helpDatail.helpSubject}}</p>
						<p style="margin-top: 0.5rem;">{{helpDatail.helperCollege}}</p>
					</view>
				</view>
			</view>

			<view class="help-title vertical-center">
				<p>帮扶时间</p>
			</view>
			<view class="help-time help-text">
				<p v-for="(item,index) in recoverTime(helpDatail.helpTime)" :key="index">{{item}}</p>
			</view>
			<view class="help-title vertical-center">
				<p>帮扶地点</p>
			</view>
			<view class="help-text">
				<p>{{helpDatail.helpAddress}}</p>
			</view>
			<view class="help-title vertical-center">
				<p>联系方式</p>
			</view>
			<view class="help-text">
				<p>{{helpDatail.contact==""||"undefined"?"暂无联系方式":helpDatail.contact}}</p>
			</view>
			<view class="help-title vertical-center">
				<p>所获荣誉</p>
			</view>
			<view class="help-text">
				<p>{{helpDatail.honor==""||"undefined"?"暂无荣誉":helpDatail.honor}}</p>
			</view>
			<view class="help-title vertical-center">
				<p>帮扶具体内容</p>
			</view>
			<view class="help-text">
				<p>{{helpDatail.helpDetail}}</p>
				<view class="state vertical-center" :style="{backgroundColor:stateColorRgb(helpDatail.helpState)}">
					<p class="" :style="{color:stateColor(helpDatail.helpState)}">{{stateText(helpDatail.helpState)}}</p>
				</view>
				<!-- <p class="state" :style="{color:this.stateColor(helpDatail.helpState)}">{{this.stateText(helpDatail.helpState)}}</p>
 -->
			</view>
			<view class="" v-if="userType">
				<uButton :custom-style="customStyle" :disabled="!canApply" :shape="circle" @click="apply(helpDatail.helpClassId)">{{applyState}}</uButton>
			</view>
		</view>
		

	</view>
</template>

<script>
	import {
		apply
	} from "../../service/xk-stu.js"
	export default {
		data() {
			return {
				pageTitle: "帮扶详情",
				helpDatail: {},
				applyState: "",
				canApply: "",
				customStyle: {
					marginTop: "60rpx",
					width: "40vw",
					color: "white",
					backgroundColor: this.$root.buttonColor,
					fontSize: "1.2rem",

				},
				userType: false //false是从领航员过来 true为学困生过来
			};
		},

		onLoad(option) {
			this.helpDatail = JSON.parse(decodeURIComponent(option.data))
			this.getBtnState(this.helpDatail.helpState, this.helpDatail.isApply)
			this.userType = JSON.parse(option.type)
			console.log(this.helpDatail.honor)
			
		},
		methods: {
			getBtnState(state, apply) {
				switch (parseInt(state)) {
					case 1:
						if (apply == 1) {
							this.applyState = "已报名"
							this.canApply = false
							this.customStyle.backgroundColor = "#696969"
						} else {
							this.applyState = "报名"
							this.canApply = true
							this.customStyle.backgroundColor = this.$root.buttonColor
						}
						break;
					case 2:
						this.applyState = "不可报名"
						this.canApply = false
						this.customStyle.backgroundColor = "#696969"
						break;
					case 3:
						this.applyState = "已结束"
						this.canApply = false
						this.customStyle.backgroundColor = "#696969"
						break;
				}
			},
			async apply(id) { //报名

				this.$refs.model.showModel("checkmark-circle", "报名中...", false, 2)
				try{
					let data = await apply({
						helpClassId: id
					})
					this.appliedRes(data.code,data.error)
				}catch(e){
					this.appliedRes(0,"报名失败")
					//TODO handle the exception
				}
			},
			appliedRes(code,error){
				//this.$refs.model.hideModel()
				if(code==1){
					this.$refs.model.showModel("checkmark-circle", "报名成功", true, 1, "", this.successColor)
					this.applyState = "已报名"
					this.canApply = false
					this.customStyle.backgroundColor = "#696969"
				}
				else{
					this.$refs.model.showModel("close-circle", error, true, 1, "", "red")
				}
			},
			goTo() {
				if (this.userType)
					uni.redirectTo({
						url: "../xk-pilot-page/xk-pilot-page?chooseFoot=1"
					});
				else {
					uni.redirectTo({
						url: "../pilot-page/pilot-page?chooseFoot=1"
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.help-datail {
		background-color: $grey-background;
		height: 100vh;
		
	}

	.main {
		background-color: white;
		width: 95%;
		margin-left: 2.5%;
		box-shadow: 1px 3px 8px 3px #C0C0C0;
		max-height: 90vh;
		overflow-y: scroll;
		padding-bottom: 40rpx;

	}

	.data-item {
		.text {
			justify-content: flex-start;
			height: 12vh;

			.uImage {
				margin-left: 40rpx;
			}

			.name-college {
				margin-left: 40rpx;
				font-size: 32rpx;

			}
		}
	}

	.help-title {
		color: white;
		font-size: 18px;
		background-color: $title-background-color;
		height: $title-height;
		padding-left: 40rpx;
		justify-content: left;
	}

	.help-text {
		padding: 40rpx;
		font-size: 18px;

		.state {
			margin-top: 40rpx;
			font-size: 0.8rem;
			height: 1.3rem;
			border-radius: 20px;
			width: 20vw;
			margin-bottom: 10rpx;
			p{
				opacity: 1 !important; 
			}
			//background-color: rgba($color: #000000, $alpha: 1.0);
		}
	}

	.help-time {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;

		p {
			width: 35vw;
		}
	}
</style>
