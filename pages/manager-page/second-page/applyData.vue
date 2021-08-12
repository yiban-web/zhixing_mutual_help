<template>
	<view class="main">
		<model ref="model" @reload="getData(current)"></model>
		<sortCard v-show="sortCard" @cardShow="cardShow" @returnRes="returnRes" :current="current" :type="sortType"></sortCard>
		<view class="page-top vertical-center">
			<p class="sort-text" @click="cardShow()">筛选</p>
		</view>
		<view class="pilot-data">
			<!-- <uTabs name="cate_name" :list="chooselist" :is-scroll="false" :current="current" height="120" font-size="35"
			 bar-height="15" bar-width="200" active-color="#7F2F62" :input-style="inputStyle" @change="choosePilot"></uTabs> -->
			<view class="pilot-list">
				<list :dataList="dataList" :userType="true" :listType="listType" :type="type" ></list>
			</view>
		</view>
	</view>
</template>

<script>
	import uSearch from "uView-ui/components/u-search/u-search.vue"
	import list from "components/data-list/data-list.vue"
	import sortCard from "../../../components/sortCard/sortCard.vue"
	import {adLookApply,lookManager} from "../../../service/manager.js"

	export default{
		components: {
			uSearch,
			list,
			sortCard
		},
		data() {
			return {
				listType:3,//list类型
				sortType:2,//选择卡类型
				searchData: "", //搜索框输入内容
				chooselist: [{
					name: "申请消息"
				}, {
					name: "管理员"
				}, ],
				current: 0,
				inputStyle: {
					color: "white"
				},
				dataList: [],
				sortCard: false,
				type:5,
				applyState:0,//申请状态
				adType:0//管理员类型
			}
		},
		async mounted() {
			this.getData(0)
		},
		methods:{
			choosePilot(index) {
				this.current = index
				this.getData(index)
			},
			cardShow() {
				this.sortCard = !this.sortCard
			},
			returnRes(collage, subject,state) { //获取选项卡内容
				//console.log(state)
				this.cardShow()
				this.current==0?this.applyState=state:this.adType=state+6
				this.getData(this.current)
				// this.$refs.model.showModel("","努力寻找中",false,3,"/static/finding.png")
			},
			
			async getData(type){
				this.$refs.model.showModel("","加载中...",false,2,"")
				let data = []
				try{
					if(type==0){
						this.listType = 3
						this.sortType = 2
						this.type = 5
						data=await adLookApply({
							applyState:this.applyState
						})
					}
					else{
						this.listType = 4
						this.sortType = 3
						this.type = 6
						data = await lookManager({
							adType:this.adType
						})
					}
					if(data.code==1){
						this.dataList = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				//console.log(this.dataList)
				this.$refs.model.hideModel()
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.page-top {
		background-color: $back-ground-color;
		justify-content: space-between;
		// height: 80rpx;
		padding: 14rpx 0;
		height: 80rpx;
		image {
			height: 40rpx;
			width: 80rpx;
			margin-left: 40rpx;
		}
		.search-input {
			width: 50vw;
		}
		.sort-text{
			color: white;
			margin-left: 40rpx;
			font-size: 1.1rem;
		}
	}

	.main {
		background-color: $grey-background;
		
	}

	.pilot-data {
		background-color: white;
		width: 95%;
		//height: 74vh;
		margin-left: 2.5%;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
		//overflow-y: scroll;
	}

	.wrap {
		height: 200vh;
	}
</style>
