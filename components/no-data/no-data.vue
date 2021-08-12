<template>
	<view class="no-data vertical-center">
		<!-- <image src="../../static/typeNo.png"></image> -->
		<uImage :src="noDataImg" width="200rpx" height="200rpx"></uImage>
		<view class="word">
			<p>暂无数据</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                 noDataImg:"../../../../static/typeNo.png",
			};
		}
	}
</script>

<style lang="scss">
	.no-data {
		width: 100%;
		flex-direction: column;
		padding-top: 40rpx;
		.word {
			font-size: 1.4rem;
			color: $u-tips-color;
		}
	}
</style>
