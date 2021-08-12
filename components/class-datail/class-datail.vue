<template>
	<view>
		<view class="item" v-if="type==1">
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
				<p>帮扶具体内容</p>
			</view>
			<view class="help-text">
				<p>{{helpDatail.helpDetail}}</p>
			</view>

		</view>
		<view class="class-data" v-if="type == 2">
			<view class="subject text">
				<p>帮扶科目：{{helpDatail.helpSubject}}</p>
				<p :style="{color:stateColor(helpDatail.helpState)}">{{this.stateText(helpDatail.helpState) }}</p>
			</view>
			<view class="class-time text">
				<p>帮扶时间：</p>
				<view class="help-time help-text text">
					<p v-for="(item,index) in recoverTime(helpDatail.helpTime)" :key="index">{{item}}</p>
				</view>
			</view>
			<p class="text">帮扶地点：{{helpDatail.helpAddress}}</p>
			<view class="text">
				<p>帮扶具体内容：</p>
				<p>{{helpDatail.helpDetail}}</p>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ["helpDatail", "type"], //type=1,带紫框，=2精简版 3精简版列表
		data() {
			return {
				classData:[],
				datailType :-3

			};
		},
		created() {
			//console.log(this.$props.helpDatail)
		},
		methods:{
			getClassData(data){
				//console.log(123)
				//this.classData = data
				for(let i=0;i<data.length;i++){
					this.$set(this.classData,i,data[i])
				}
				//console.log(this.classData)
				this.datailType = 3
			},
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
		}
	}
	.item{
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
			justify-content: space-between;
		}
	}
	
	.class-data {
		padding: 40rpx;
		font-size: 1rem;
		color: $u-content-color;
		line-height: 60rpx;
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
</style>
