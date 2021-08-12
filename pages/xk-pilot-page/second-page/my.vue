<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<view class="body">
			<uTabs name="cate_name" :list="chooselist" :is-scroll="false" :current="current" height="120" font-size="35"
			 bar-height="15" bar-width="200" :active-color="textColor" :input-style="inputStyle" @change="choosePilot"></uTabs>
			<view class="">
				<myPj v-if="current==0" v-bind:dataList="dataList"></myPj>
				<personalData v-bind:selfData = "selfData" v-else></personalData>
			</view>
			<view class="tip vertical-center" v-if="current==0">
				<p>提示：超过48小时未评价则默认5星</p>
			</view>
		</view>

	</view>
</template>

<script>
	import myPj from "../../../components/myPj-dataList/myPj-dataList.vue"//评价列表组件
	import {myInfo,myEvaluate} from "../../../service/xk-stu.js"
	export default {
		async mounted() {
			this.getData()
		},
		components: {
			myPj
		},
		data() {
			return {
				chooselist: [{
					name: "我的评价"
				}, {
					name: "个人信息"
				}, ],
				textColor:this.$root.buttonColor,
				current: 0,
				inputStyle: {
					color: "white"
				},
				dataList: [],
				selfData:{}
			}
		},
		methods: {
			choosePilot(index) {
				this.current = index
				//console.log(this.current)
			},
			async getData(){
				this.$refs.model.showModel("","加载中",false,2)
				try{
					let data = await myEvaluate()
					let my = await myInfo()
					if (data.code == 1) {
						this.dataList = data.data
						//this.selfData = my.data
					}
					this.selfData = my
					//console.log(data)
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		height: 90vh;
		.body {
			background-color: white;
			max-width: 95%;
			margin-left: 2.5%;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
		}
		.tip {
			height: 10vh;
			font-size: 1.1rem;
			color: #C0C0C0;
		}
	}
</style>
