<template>
	<view class="main">
		<view v-if="dataList.length==0">
			<no-data></no-data>
		</view>
		<view class="" v-else>
			<view class="data-item body" v-for="item in dataList" :key="item.helpClassId" v-if="listType==1" @click="kownDatail(item)">
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
			<view class="data-item body" v-for="(item2,index) in dataList" :key="item2.userId" v-if="listType==2">
				<view class="text vertical-center" @click="kownDatail(item2)">
					<uImage :src="item2.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p>{{item2.helperName}}&emsp; &emsp; {{item2.class}}</p>
						<p style="margin-top: 0.5rem;">{{item2.helperCollege}}</p>
					</view>
				</view>
			</view>
			<view class="data-item body" v-for="(item2,index) in dataList" :key="item2.userId" v-if="listType==3">
				<view class="text vertical-center" @click="kownDatail(item2)">
					<uImage :src="item2.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p>{{item2.helperName}}&emsp; &emsp; {{item2.class}}</p>
						<view class="college-state">
							<p>{{item2.helperCollege}}&emsp; &emsp; &emsp; &emsp; </p>
							<view class="apply-state vertical-center" :style="{backgroundColor:applyStateColorBg(item2.applyState)}">
								<p :style="{color:applyStateColor(item2.applyState)}">{{applyStateText(item2.applyState)}}</p>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="data-item body" v-for="(item,index) in dataList" :key="item.adNumber" v-if="listType==4">
				<view class="text vertical-center" @click="kownDatail(item)">
					<uImage :src="item.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<view class="college-state" style="margin-top:0;">
							<p>{{item.adName}} </p>
							<p :style="{color:'#9E487F',marginRight:'20rpx'}">{{adType(item.userType)}}</p>
						</view>
						<p style="margin-top: 0.5rem;">{{item.adCollege}}&emsp; &emsp; &emsp; &emsp; </p>
					</view>
				</view>
			</view>
			<view class="data-item body" v-if="listType==5" v-for="(item2,index) in dataList" :key="item2.userId">
				<view class="text vertical-center" @click="kownDatail(item2)">
					<uImage :src="item2.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p>{{item2.helperName}}&emsp; &emsp; {{item2.class}}</p>
						<p style="margin-top: 0.5rem;">{{item2.helperCollege}}</p>
						<p style="margin-top: 0.5rem;">课程数：{{item2.helpClassNum}}</p>
						<p v-if="item2.signClass!=-1" style="margin-top: 0.5rem;">签到数：{{item2.signClass}}</p>
						<p style="margin-top: 0.5rem;">课程总时长：{{timeChange(item2.helpClassAllTime)}}</p>
					</view>

				</view>
			</view>
			<!-- <uLoadmore :status="status" :icon-type="flower" />
 -->
		</view>
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
		props: ['dataList', 'userType', "type", "listType"],
		//listType：1是领航员和学困生列表，2是管理员看信息列表，3是申请领航员列表 4是查看管理员
		//type:是点击了之后的操作类型
		data() {
			return {
				listData: this.dataList,
				status: 'loading',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			};
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			console.log("滚动距离为：" + e.scrollTop);
		},
		methods: {
			Scroll: function() {
				console.log(this.$refs.box.scrollTop)
			},
			timeChange(value) {
				var theTime = parseInt(value); // 秒
				var middle = 0; // 分
				var hour = 0; // 小时

				if (theTime > 60) {
					middle = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (middle > 60) {
						hour = parseInt(middle / 60);
						middle = parseInt(middle % 60);
					}
				}
				var result = "" + parseInt(theTime) + "秒";
				if (middle > 0) {
					result = "" + parseInt(middle) + "分" + result;
				}
				if (hour > 0) {
					result = "" + parseInt(hour) + "小时" + result;
				}
				return result;
			},

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
							url: "../../pages/pilot-class-sign-page/pilot-class-sign-page?helpClassId=" + item.helpClassId
						});
						break;
					case 4: //管理员查看某个领航员信息
						uni.redirectTo({
							url: "../../pages/mg-help-record/mg-help-record?data=" + encodeURIComponent(JSON.stringify(item))+"&userType="+this.$props.userType
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
	.main {
		background-color: white;
		max-height: 67vh;
		overflow-y: scroll;
		padding-bottom: 100rpx;

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

			p {
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
				width: 70vw;

				.college-state {
					display: flex;
					justify-content: space-between;
					margin-top: 0.5rem;

					.apply-state {
						margin-right: 10rpx;
						font-size: 0.8rem;
						height: 1.3rem;
						border-radius: 20px;
						width: 20vw;
						margin-bottom: 10rpx;

						p {
							opacity: 1 !important;
						}

						//background-color: rgba($color: #000000, $alpha: 1.0);
					}

				}

			}
		}

		.link {
			margin-left: 65%;
			color: rgb(255, 204, 85);
			font-size: 0.9rem;
		}

		.name-college {
			width: 60vw;
		}
	}
</style>
