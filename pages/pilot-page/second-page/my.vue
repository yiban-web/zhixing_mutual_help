<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<view class="body">
			<uTabs name="cate_name" :list="chooselist" :is-scroll="false" :current="current" height="120" font-size="35"
			 bar-height="15" bar-width="200" :active-color="textColor" :input-style="inputStyle" @change="choosePilot"></uTabs>
			<view class="data-list">
				<list :dataList="dataList" :userType="false" :listType="1" v-if="current==0" :type="type"></list>
				<personalData :selfData="selfData" v-else></personalData>
			</view>
		</view>

	</view>
</template>

<script>
	import list from "components/data-list/data-list.vue"
	import {lookMyHelpCourse,pilotData} from "../../../service/pilot.js"
	export default {
		async mounted() {
			this.getData()
		},
		components: {
			list
		},
		data() {
			return {
				textColor:this.$root.buttonColor,
				chooselist: [{
					name: "我的课程"
				}, {
					name: "个人信息"
				}, ],
				current: 0,
				inputStyle: {
					color: "white"
				},
				dataList: [],
				selfData: {},
				type:3
			}
		},
		methods: {
			choosePilot(index) {
				this.current = index
				//console.log(this.current)
			},
			async getData() {
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try{
					let mySelf = await pilotData()
					if(mySelf.code==1){
						this.selfData = mySelf.data
					}
					
					let data = await lookMyHelpCourse()
					if(data.code==1){
						this.dataList = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			},
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
			.data-list{
				height: 80vh;
			}
		}

		.tip {
			height: 10vh;
			font-size: 1.1rem;
			color: #C0C0C0;
		}
	}
</style>
