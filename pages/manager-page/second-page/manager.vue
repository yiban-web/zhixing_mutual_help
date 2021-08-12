<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<view class="body">
			<personalData :selfData="selfData" ></personalData>
		</view>
		
	</view>
</template>

<script>

	import {adMyData} from "../../../service/manager.js"

	export default{

		data() {
			return {
				selfData:{}
			}
		},
		async mounted() {
			this.getData()
		},
		methods:{
			async getData(){
				this.$refs.model.showModel("","加载中...",false,2,"")
				try{
					let data = await adMyData()
					if(data.code==1){
						this.selfData = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			}
		}

	}
</script>

<style scoped lang="scss">
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
