<template>
	<view class="main">
			<view v-if="user.length==0" class="no-person">
				<p>暂无人员</p>
			</view>
			<view v-else class="body">
				<view v-for="(item,index) in user" class="user-item " :key="index" 
				:style="{backgroundColor:type==2&&item.logOut==0?'#c8c9cc':'white'}"
				@click="leaveClass(item.userId,index)">
					<view :class="item.sex==1?'sex man vertical-center':'sex women vertical-center'">
						<uIcon :name="item.sex==1?'man':'woman'" color="white" size="20" ></uIcon>
					</view>
					<!-- <view class="leave-class vertical-center" v-if="type==2">
						<text>退出课程</text>
					</view> -->
					<uImage :src=item.headUrl :lazy-load="true" class="head-url" width="90rpx" height="90rpx" shape="circle" ></uImage>
					<view class="name-class">
						<p>{{item.name}}</p>
						<p>{{item.class}}</p>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	//报名和已签到人数的样式
	export default {
		props:["user","type"],//type=1,为报名  =2为已签到
		data() {
			return {
				
			};
		},
		methods:{
			leaveClass(id,index){
				let this2=this
				if(this.$props.type==2){
					uni.showModal({
					    content: "确定终止学生此次课程吗？",
					    success: function (res) {
					        if (res.confirm) {
					            this2.$emit("leaveClass",id)
					        } else if (res.cancel) {
					            //console.log('用户点击取消');
					        }
					    }
					});
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		display: flex;
		flex-wrap: wrap;
		margin: 30rpx 0;
		// padding-left: 12vw;
		max-height: 30vh;
		overflow-y: scroll;
		.body{
			width: 95%;
			display: flex;
			flex-wrap: wrap;
			margin: 0 auto;
		}
		.no-person{
			padding-left: 40rpx;
		}
	}
	
	.user-item{
		display: flex;
		align-items: center;
	    min-width: 35vw;
		max-width: 100%;
		margin-bottom: 30rpx;
		font-size: 1.0rem;
		margin-left: 6rpx;
		padding: 15rpx 0;
		.head-url{
			margin-right: 20rpx;
			position: relative;
			z-index: 0;
		}
		.leave-class{
			font-size: 0.7rem;
			color: white;
			width: auto;
			border-radius: 0;
			top: -27rpx;
			left: 0;

		}
		.sex{
			position: relative;
			top: 30rpx;
			left: 90rpx;
			z-index: 10;
			height: 40rpx;
			width: 40rpx;
			border-radius: 50%;
			padding: 0 11rpx;
		}
		.women{
			background-color: #FF99CC;
		}
		.man{
			background-color: #0066CC;
		}
		.name-class{
			display: flex;
			flex-direction: column;
			p{
				min-width: 180rpx;
			}
		}
	}
	

</style>
