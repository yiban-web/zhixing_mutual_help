<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<view class="body">
			<view class="" v-if="classList.length==0">
				<no-data></no-data>
			</view>
			<view v-for="(item,index) in classList" :key="item.helpClassId" class="item" v-else>
				<detail :helpDatail="item" :type="1"></detail>
				<uButton :custom-style="btnStyle(3)" shape="circle" v-if="item.signIn == 1&&item.helpState==3" @click="goPj(item.helpClassId)">去评价</uButton>
				<view class="btn-group" v-else-if="item.signIn==1&&item.helpState==2">
					<uButton :custom-style="btnStyle(4)" shape="circle" disabled>正在进行</uButton>
					<uButton :custom-style="btnStyle(1)" shape="circle" @click="leaveClass(item.helpClassId,index)">离开课程</uButton>
				</view>
				<uButton :custom-style="btnStyle(2)" shape="circle" disabled v-else-if="item.helpState==1">未开始</uButton>

				<uButton :custom-style="btnStyle(2)" shape="circle" disabled v-else-if="item.helpState==3||item.helpState==4">已结束</uButton>
				<uButton :custom-style="btnStyle(1)" shape="circle" @click="signIn(item.helpClassId,index)" v-else-if="item.signIn == 2&&item.helpState==2">签到</uButton>
			</view>
		</view>
	</view>

</template>

<script>
	import detail from "../../../components/class-datail/class-datail.vue"
	import noData from "../../../components/no-data/no-data.vue"

	import {
		myCourse,
		scanCode
	} from "../../../service/xk-stu.js"
	import {
		leaveClassApi
	} from "../../../service/pilot.js"
	export default {
		components: {
			detail,
			noData
		},
		mounted() {
			this.getData()
		},
		data() {
			return {
				classList: [],
				code: ""

			}
		},
		methods: {
			goPj(id) {
				uni.redirectTo({
					url: `../../pages/stu-evaluate/stu-evaluate?classId=${id}`+"&type=2"
				})
			},
			async leaveClass(id, index) {
				try {
					let data = await leaveClassApi({
						helpClassId: id,
						userId: ""
					})
					if (data.code == 1) {
						this.classList[index].helpState = 3
						this.$refs.model.showModel("checkmark-circle", "离开成功", true, 1)
					}
				} catch (e) {
					//TODO handle the exception
					this.$refs.model.showModel("close-circle", "操作失败", true, 1)
					return
				}
			},
			async signIn(id, index) {
				let this2 = this
				//this2.code = res.result
				/* 				this2.$refs.model.showModel("","签到中",false,2)
								//console.log(res.result,id)
								try{
									let data = await scanCode({
										code:"1234",
										 helpClassId:id
									})
									console.log(data)
									if(data.code==1){
										this2.$refs.model.showModel("checkmark-circle","签到成功",true,1)
										this2.classList[index].signIn = 1
									}
									else{
										this2.$refs.model.showModel("close-circle","签到失败",true,1)
									}
								}catch(e){
									this2.$refs.model.showModel("close-circle","签到失败",true,1)
								} */
				uni.scanCode({
					onlyFromCamera: true,
					success: async function(res) {
						this2.code = res.result
						this2.$refs.model.showModel("", "签到中", false, 2)
						//console.log(res.result,id)
						try {
							let data = await scanCode({
								code: res.result,
								helpClassId: id
							})
							console.log(data)
							if (data.code == 1) {
								this2.$refs.model.showModel("checkmark-circle", "签到成功", true, 1)
								this2.classList[index].signIn = 1
							} else {
								this2.$refs.model.showModel("close-circle", "签到失败", true, 1)
							}
						} catch (e) {
							this2.$refs.model.showModel("close-circle", "签到失败", true, 1)
						}

					},
					fail: function() {
						this2.$refs.model.showModel("close-circle", "签到失败", true, 1)
					}
				});
			},
			async getData() {
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try {
					let data = await myCourse()
					if (data.code == 1) {
						this.classList = data.data
					}
				} catch (e) {
					this.$refs.model.showModel("", "", true, 6, getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
				return false
			},
			btnStyle(type) {
				let css = {
					marginTop: "20rpx",
					marginBottom: "20rpx",
					width: "30vw",
					color: "white",
					backgroundColor: this.$root.buttonColor,
					fontSize: "1.2rem",
				}
				switch (type) {
					case 1:
						break;
					case 2:
						css.backgroundColor = "#696969";
						break;
					case 3:
						css.backgroundColor = "rgb(255,179,0)";
						break;
					case 4:
						css.backgroundColor = "rgb(231,131,108)";
						break;
				}
				return css
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		height: 80vh;
		overflow-y: scroll;

		.body {
			background-color: white;
			width: 95%;
			margin-left: 2.5%;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
			padding-bottom: 100rpx;
		}
	}

	.item {
		border-bottom: 2px dashed #F2F2F2;
		.btn-group{
			display: flex;
			justify-content: space-around;
		}
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
		color: $title-background-color;
		font-size: 16px;
		background-color: #F9F9F9;
		height: 50rpx;
		padding-left: 40rpx;
		justify-content: left;
	}

	.help-text {
		padding: 20rpx 40rpx;
		font-size: 17px;
	}

	.help-time {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
