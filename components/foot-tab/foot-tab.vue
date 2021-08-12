<template>
	<view>
		<view class="foot vertical-center">
			<view class="foot-item vertical-center " v-for="(item,index) in foot" :key="item.id"
			@click="choose(item.id)">
				<image :src="chooseFoot==item.id?item.image[1]:item.image[0]" 
				style="width: 60rpx;height: 60rpx;"></image>
				<!-- :style="{fontWeight:chooseFoot==item.id?600:500}" -->
				<p class="foot-word" :style="{color:chooseFoot==item.id?'white':'#c8c9cc'}">{{item.text}}</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["foot","chooseFoot"],
		data() {
			return {
				///chooseFoot:this.default
				
			};
		},
		methods:{
			choose(id){
				//this.chooseFoot = id
				this.$emit("choose",id)
			}
		}
	}
</script>

<style lang="scss" scoped>
.foot{
	justify-content: space-around;
	background-color: $back-ground-color;
	//color: white;
	font-weight: 500;
	height: 180rpx;
	z-index: 10;
	position: absolute;
	width: 100vw;
	bottom: 0;
	padding-bottom: 30rpx;
	image{
		height: 50rpx;
		width: 50rpx;
	}
	.foot-item{
		flex-direction: column;
	}
	.foot-word{
		margin-top: 5rpx;
		font-size: 0.8rem
	}
}
</style>
