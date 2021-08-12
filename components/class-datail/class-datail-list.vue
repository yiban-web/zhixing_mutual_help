<template>
	<view class="class-data">
		<view class="item" v-for="item in helpDatail" :key="item.helpClassId">
			<p>帮扶科目：{{item.helpSubject}}</p>
			<view class="class-time text">
				<p>帮扶时间：</p>
				<view class="help-time help-text text">
					<p v-for="(item2,index) in recoverTime(item.helpTime)" :key="index">{{item2}}</p>
				</view>
			</view>
			<p class="text" >帮扶地点：{{item.helpAddress}}</p>
			<view class="text" v-if="item.helpDetail!=''">
				<p>帮扶具体内容：</p>
				<p>{{item.helpDetail}}</p>
			</view>
			<uButton :custom-style="customStyle2" @click="lookDetail(item.helpClassId,item.helpDetail!='')">查看详情</uButton>
		</view>

	</view>
</template>

<script>
	export default {
		props: ["helpDatail"],
		data: function() {
			return {
				customStyle2: {
					marginTop: "60rpx",
					width: "40vw",
					color: "#7F2F62",
					backgroundColor: "white",
					fontSize: "1rem",
				},
			}
		},
		methods: {
			lookDetail(classId,type){
				this.$emit("lookDetail",classId,type)
			}
		},
	}
</script>

<style lang="scss" scoped>

	.class-data {
		//padding: 40rpx;
		font-size: 1rem;
		color: $u-content-color;
		line-height: 60rpx;
		position: relative;
		top: -100rpx;
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
		.item{
			padding: 20rpx 60rpx;
			border-bottom: 2px dashed #F2F2F2;
		}
	}
</style>
