<template>
	<view>
		
		<view v-if="dataList.length==0">
			<no-data></no-data>
		</view>
		
		<scroll-view :scroll-y="true" :lower-threshold="50" @scrolltolower="getNewData()" class="main" :scroll-top="scrollTop"
		 @scroll="scroll" v-else>
			<view class="data-list" v-if="listType==1">
				<view class="data-item body" v-for="item in dataList" :key="item.helpClassId"  @click="kownDatail(item)" >
					<view class="state vertical-center" :style="{backgroundColor:stateColorRgb(item.helpState)}">
						<p class="" :style="{color:stateColor(item.helpState)}">{{stateText(item.helpState)}}</p>
					</view>
					<view class="text vertical-center">
						<uImage :src="item.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
						<view class="name-college">
							<p>{{item.helperName}}&emsp; &emsp; 帮扶科目：{{item.helpSubject}}</p>
							<p style="margin-top: 0.5rem;">{{item.helperCollege}}</p>
						</view>
					</view>
					<p class="link">了解详情请戳 ></p>
				</view>
			</view>
			<view class="data-item body" v-for="(item2,index) in dataList" :key="item2.userId" v-if="listType==2">
				<view class="text vertical-center" @click="kownDatail(item2)">
					<uImage :src="item2.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p>{{item2.helperName}}&emsp; &emsp; {{item2.class}}</p>
						<p style="margin-top: 0.5rem;">{{item2.helperCollege}}</p>
					</view>
				</view>
			</view>
			<view class="goTop vertical-center" @click="goTop" v-show="toTopShow">
				<view class="body vertical-center">
					<image :src="toTopImg" class="image" />
					<!-- <uIcon name="arrow-up" color="$u-main-color" size="40"></uIcon> -->
					<p>返回顶部</p>
				</view>
			</view>
			<uLoadmore :status="status" :icon-type="flower" />
		</scroll-view>
		

	</view>
</template>

<script>
	import noData from "../no-data/no-data.vue"
	import uLoadmore from "uView-ui/components/u-loadmore/u-loadmore.vue"
	export default {
		components: {
			noData,
			uLoadmore
		},
		created(){
			let res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight
		},
		mounted() {
			if(this.$props.dataNum==0){
				this.$emit("noData")
			}
		},
		props: ['dataList', 'userType', "type", "listType","dataNum"],
		//listType：1是领航员和学困生列表，2是管理员看信息列表，3是申请领航员列表 4是查看管理员
		data() {
			return {
				listData: this.dataList,
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				nodata: false,
				pageDataNum: 10,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				toTopImg:"../../static/stu.png",
				windowHeight:0,
				toTopShow:false
			};
		},
		methods: {
			async getNewData() {
				//console.log(this.$props.dataNum)
				if (this.$props.dataNum < this.pageDataNum) {
					this.status = "nomore"
					this.$emit("noData")
					return
				}
				this.status = "loading"
				
				this.$nextTick(function() {
					this.scrollTop = this.old.scrollTop-50
					this.$emit("bottomData", true)
				});
			},
			scroll: function(e) {
				//console.log(e)
				// this.scrollHeight.last = this.scrollHeight.next 
				// this.scrollHeight.next = e.detail.scrollHeight
				this.old.scrollTop = e.detail.scrollTop
				e.detail.scrollTop>5?this.toTopShow = true:this.toTopShow = false
			},
			goTop() {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
					this.$emit("bottomData",false)
				});
				
			},
			/* stateColor(state) {
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
			stateText(state) {
				switch (state) {
					case 1:
						return "未开始";
					case 2:
						return "正在进行";
					case 3:
						return "已结束"
				}
			}, */
			kownDatail(item) {
				
				//console.log(this.$props.type,typeof this.$props.type)
				switch (parseInt(this.$props.type)) {
					case 1: //课程详情
						uni.redirectTo({
							url: "../../pages/help-data-datail/help-data-datail?data=" + encodeURIComponent(JSON.stringify(item)) +
								"&type=" + this.$props.userType
						});
						break;
					case 2:
						uni.navigateTo({
							url: "../../pages/pilot-class-page/pilot-class-page?data=" + encodeURIComponent(JSON.stringify(item)) +
								"&type=" + this.$props.userType
						});
					case 3: //领航员签到
						uni.redirectTo({
							url: "../../pages/pilot-class-sign-page/pilot-class-sign-page?data=" + encodeURIComponent(JSON.stringify(item))
						});
						break;
					case 4: //管理员查看某个领航员信息
						uni.redirectTo({
							url: "../../pages/mg-help-record/mg-help-record?data=" + encodeURIComponent(JSON.stringify(item))
						});
						break;
					case 5: //领航员申请审核
						uni.redirectTo({
							url: "../../pages/master-apply/master-apply?data=" + encodeURIComponent(JSON.stringify(item))
						});
						break;
					case 6: //管理员信息页面
						uni.redirectTo({
							url: "../../pages/admin-self-page/admin-self-page?data=" + encodeURIComponent(JSON.stringify(item))
						});
						break;
				}
				// if(this.$props.type==1){
				// 	uni.navigateTo({
				// 	    url: "../../pages/help-data-datail/help-data-datail?data="+encodeURIComponent(JSON.stringify(item))+"&type="+this.$props.userType
				// 	});
				// }

			}
		}
	}
</script>

<style lang="scss" scoped>
	.goTop {
		position: fixed;
		bottom: 15vh;
		left: 50rpx;
		width: 110rpx;
		height: 200rpx;
		background-color: rgba($color: #CCCCCC, $alpha: 0.7);
		border-radius: 20rpx;
		z-index: 10;
		flex-direction: column;
		justify-content: space-around;
		box-shadow: 1px 1px 1px 1px #C0C0C0;
		.body{
			background-color: rgba($color: #999999, $alpha: 0.7) !important;
			flex-direction: column;
			height: 80%;
			width: 80%;
			border-radius: 20rpx;
			padding: 0 6rpx;
		}
		.image{
			width: 80rpx;
			height: 80rpx;
		}
		p{
			color: $u-main-color;
			font-size: 0.8rem;
			text-align: center;
		}
	}

	.down-load {
		position: absolute;
		top: 25vh;
		z-index: -10;
		width: 30%;
		margin-left: 32.5%;

	}

	.main {
		background-color: white;
		max-height: 67vh;
		overflow-y: scroll;
		padding-bottom: 100rpx;
		position: relative;
		top: 0rpx;
		.data-list{
			min-height: 64vh;
		}
		.body {
			background-color: white;
		}


	}

	.data-item {
		// height: 15vh;
		border-bottom: 2px dashed #F2F2F2;
		padding: 15rpx 0;
		z-index: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 30rpx 0;

		.state {
			margin-left: 75%;
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

		.text {
			justify-content: flex-start;

			.uImage {
				margin-left: 40rpx;
			}

			.name-college {
				margin-left: 40rpx;
				font-size: 32rpx;

				.college-state {
					display: flex;
					justify-content: space-between;
					margin-top: 0.5rem;

				}

			}
		}

		.link {
			margin-left: 65%;
			color: rgb(255,204,85);
			font-size: 0.9rem;
			margin-top: 15rpx;
		}

		.name-college {
			width: 60vw;
		}
	}
</style>
