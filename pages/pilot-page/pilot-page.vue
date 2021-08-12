<template>
	<view>
		<pageHead @goTo="goTo" :title="pageTitle()"></pageHead>
		<view class="main">
			<helpData v-if="chooseFoot == 1"></helpData>
			<my v-else-if="chooseFoot == 2"></my>
		</view>
		<foot :foot="footData" @choose="choose" :chooseFoot="chooseFoot"></foot>
		
	</view>
</template>

<script>
	//领航员页面
	import {helpData} from "./second-page/help-data.vue"
	import {my} from "./second-page/my.vue"
	import foot from "../../components/foot-tab/foot-tab.vue"
	export default {
		components:{
			helpData,
			my,
			foot
		},
		data() {
			return {
				chooseFoot:1,
				footData:[
					{text:"帮扶信息",image:["../../static/help-data-0.png","../../static/help-data-1.png"],id:1},
					{text:"我的",image:["../../static/my-0.png","../../static/my-1.png"],id:2},
				]
				
			}
		},
		methods: {
			goTo(){
				uni.redirectTo({
				    url: '../first-page/first-page'
				});
			},
			choose(id){
				this.chooseFoot = id
			},
			pageTitle(){
				switch(this.chooseFoot){
					case 1:return "帮扶信息";
					case 2:return "我的";
					default:
					return "帮扶信息"
				}
			},
			onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
				this.chooseFoot = option.chooseFoot
			},
			
		}
	}
</script>

<style scoped lang="scss">
.main{
	height: 80vh;
}
.foot{
	justify-content: space-around;
	background-color: $back-ground-color;
	color: white;
	font-weight: 500;
	height: 10vh;
	z-index: 10;
	position: relative;
	image{
		height: 50rpx;
		width: 50rpx;
	}
	.foot-item{
		flex-direction: column;
	}
}
</style>
