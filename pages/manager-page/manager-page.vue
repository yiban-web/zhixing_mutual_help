<template>
	<view>
		<model ref="model"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="main">
			<stuData v-if="chooseFoot == 1"></stuData>
			<applyData v-else-if="chooseFoot == 2"></applyData>
		</view>
		<foot :foot="footData" @choose="choose" :chooseFoot="chooseFoot"></foot>
	</view>
</template>

<script>
	import applyData from "./second-page/applyData.vue"
	import manager from "./second-page/manager.vue"
	import stuData from "./second-page/stuData.vue"
	import foot from "../../components/foot-tab/foot-tab.vue"
	export default {
		components:{
			applyData,
			manager,
			stuData,
			foot
		},
		data() {
			return {
				chooseFoot:1,
				title:"管理员",
				footData:[
					{text:"人员信息",image:["../../static/help-data-0.png","../../static/help-data-1.png"],id:1},
					{text:"信息管理",image:["../../static/manager-tab-0.png","../../static/manager-tab-1.png"],id:2},
				],
				userType:7
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.chooseFoot = option.chooseFoot
			
		},
		methods:{
			goTo(){
				uni.redirectTo({
				    url: '../first-page/first-page'
				});
			},
			choose(id){
				//this.chooseFoot = id
				if(id==2){
					if(uni.getStorageSync("userType")>7){
						this.chooseFoot = id
					}
					else{
						this.$refs.model.showModel("close-circle","没有权限",true,1,"","red")
					}
				}
				else{
					this.chooseFoot = id
				}
				
			}
		}
	}
</script> 

<style lang="scss">
	.main{
		height: 80vh;
	}

</style>
