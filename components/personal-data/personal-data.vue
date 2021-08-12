<template>
	<view class="self-data vertical-center">
		<uImage :src="selfData.headUrl" shape="circle" height="100" width="100" class="uImage" style="margin-bottom: 20rpx;"></uImage>
		<view v-if="selfData.userType==3" class="self-data-text">
			<p class="odd-p">姓名：{{selfData.name}}</p>
			<p class="even-p">班级：{{selfData.class}}</p>
			<p class="odd-p">学院：{{selfData.college}}</p>
			<p>身份：{{recoverId(selfData.userType)}}</p>
		</view>
		<view v-if="selfData.userType==4" class="self-data-text vertical-center">
			<p class="odd-p">姓名：{{selfData.name}}</p>
			<p>班级：{{selfData.class}}</p>
			<p class="odd-p">学院：{{selfData.college}}</p>
			<p>身份：{{recoverId(selfData.userType)}}</p>
			<!-- <view class="help-subject"> -->
				<p class="odd-p">帮扶科目：{{helpSubject()}}</p>
				<!-- <view class="subject-data">
					<p v-for="(item,index) in selfData.helpSubject" :key="index">{{item}}</p>
				</view> -->
			<!-- </view> -->
		</view>
		<view v-if="selfData.userType>=6" class="self-data-text vertical-center">
			<p class="odd-p">姓名：{{selfData.adName}}</p>
			<p>学院：{{selfData.adCollege}}</p>
			<p class="odd-p">工号：{{selfData.adNumber}}</p>
			<p>身份：{{recoverId(selfData.userType)}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		props:["selfData"],
		data() {
			return {
				
			};
		},
		methods:{
			recoverId(param){
				switch(param){
					case 3:return "学困生"
					case 4:return "学长领航员"
					case 5:return "朋辈互助员"
					case 6:return "二级管理员"
					case 7:return "一级管理员"
					case 8:return "超级管理员"
					
				}
			},
			helpSubject(){
				let subject=""
				for(let i in this.$props.selfData.helpSubject){
					subject += this.$props.selfData.helpSubject[i]+" "
				}
				return subject
			}
		}
	}
</script>

<style lang="scss">
	.self-data{
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		p{
			font-size: 1rem;
			padding: 10rpx 0rpx 10rpx 200rpx;
			width: 95vw;
			background-color: white;
		}
	}
	.odd-p{
		background-color: $grey-background !important;
	}
	.even-p{
		background-color: white;
	}
	.self-data-text{
		flex-direction: column;
		justify-content: flex-start;
	}
	
	.help-subject{
		display: flex;
		.subject-data{
			display: flex;
			margin-right: 20rpx;
			p{
				min-width: 10vw !important;
			}
			//flex-direction: column;
		}
		p{
			
		}
	}

</style>
