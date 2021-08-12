<template>
	<view>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="main">
			<view class="body">
				<self :userType="adminData.userType" :selfData="adminData"></self>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import self from "../../components/personal-data/personal-data.vue"
	export default {
		components:{
			self
		},
		data() {
			return {
				adminData:{},
				title:"管理员"
			}
		},
		onLoad(option) {
			this.adminData = JSON.parse(decodeURIComponent(option.data))
			//console.log(JSON.parse(decodeURIComponent(option.data)))
		},
		methods: {
			goTo(){
				uni.redirectTo({
					url: '../manager-page/manager-page?chooseFoot=1'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		.body {
			background-color: white;
			max-width: 95%;
			margin-left: 2.5%;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
			padding: 70rpx 0;
		}
	
		.tip {
			height: 10vh;
			font-size: 1.1rem;
			color: #C0C0C0;
		}
	}

</style>
