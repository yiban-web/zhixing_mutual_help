<template>
	<view class="main">
		<model ref="model" @reload="toTop"></model>
		<sortCard v-show="sortCard" @cardShow="cardShow" @returnRes="returnRes" :current="current" :type="1"></sortCard>
		<view class="page-top vertical-center">
			<view class="sort-text vertical-center" @click="cardShow()">
				<p class="" >筛选</p>
			</view>
			<view class="search-input">
				<uSearch shape="round" :show-action="true" input-align="center" v-model="searchData" placeholder="输入领航员姓名"
				 :action-style="inputStyle" @search="search" @custom="search" ></uSearch>
			</view>
		</view>
		<view class="pilot-data">
			<uTabs name="cate_name" :list="chooselist" :is-scroll="false" :current="current" height="120" font-size="35"
			 bar-height="15" bar-width="200" :active-color="textColor" :input-style="inputStyle" @change="choosePilot"></uTabs>
			<view class="pilot-list">
				<!-- <list :dataList="dataList" userType="true" :type="listType" :listType="1"></list> -->
				<scroll-data-list :dataList="dataList" userType="true"  @bottomData="getData()"
				 :dataNum="dataNum" ref="dataList" type="1" @noData="cleanData()" 
				 listType="1"></scroll-data-list>
			</view>
		</view>
	</view>
</template>

<script>
	import uSearch from "uView-ui/components/u-search/u-search.vue"

	import list from "components/data-list/data-list.vue"
	import scrollDataList from "../../../components/scroll-data-list/scroll-data-list.vue"
	import sortCard from "../../../components/sortCard/sortCard.vue"
	import {
		showUserData
	} from "../../../service/api.js"
	export default {
		async mounted() {
			this.$refs.model.showModel("", "加载中...", false, 2, "")
			try {
				let data = await showUserData({
					userType: this.userType,
					page: 1
				})

				if (data.code == 1) {
					this.dataList = data.data
					this.dataNum = data.data.length
				}
			} catch (e) {
				this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
				return
			}
			this.$refs.model.hideModel()
			return false
		},
		components: {
			uSearch,
			list,
			sortCard,
			scrollDataList
		},
		data() {
			return {
				textColor:this.$root.buttonColor,
				searchData: "", //搜索框输入内容
				chooselist: [{
					name: "学长领航员"
				}, {
					name: "朋辈互助员"
				}, ],
				current: 0,
				inputStyle: {
					color: "white",
					fontSize:"1.1rem"
				},
				dataList: [],
				sortCard: false,
				userType: 4,
				page: 1,
				dataNum: 0,
				college: "",
				subject: "",
				modelType: 2, //1是努力尋找，2是加載中
			}
		},
		methods: {
			choosePilot(index) {
				this.current = index
				this.searchData = ""
				this.modelType = 2
				index == 0 ? this.userType = 4 : this.userType = 5
				this.toTop()
				//this.getData(false)
			},
			cardShow() {
				this.sortCard = !this.sortCard
			},
			toTop(){
				this.$refs.dataList.goTop()
			},
			async returnRes(college, subject) { //获取选项卡内容
				this.$refs.model.showModel("", "努力寻找中...", false, 3, "/static/finding.png")
				this.college = college
				this.subject = subject
				console.log(this.college,this.subject)
				this.modelType = 1
				this.cardShow()
				this.page = 1
				this.toTop()
				//this.getData(false)
				return false
			},
			async search(value) {
				this.modelType = 1
				this.toTop()
				//this.getData(false)
				return false
			},
			cleanData(){ //清除搜索条件数据
				this.college = ""
				this.subject = ""
				this.searchData = ""
			},
			async getData(load) { //load为true则为加载更多数据
				this.modelType == 2 ? this.$refs.model.showModel("", "加载中...", false, 2, "") : this.$refs.model.showModel("",
					"努力寻找中...", false, 3, "/static/finding.png")
				load ? this.page++ : this.page = 1				
				try {
					let data = await showUserData({
						userType: this.userType,
						page: this.page,
						college: this.college != "" ? [this.college] : [],
						subject: this.subject != "" ? [this.subject] : [],
						name: this.searchData != "" ? this.searchData : ""
					})
					if (data.code == 1) {
						this.dataNum = data.data.length
						if(this.dataNum==0){
							//console.log(this.college,this.subject)
							this.cleanData()
							
						}
						load ? this.dataList.push.apply(this.dataList, data.data) : this.dataList = data.data
						
					}
				} catch (e) {
					this.page--
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				} 
				this.$refs.model.hideModel()
				return false
			},

		}
	}
</script>

<style scoped lang="scss">
	.page-top {
		background-color: $back-ground-color;
		justify-content: space-between;
		height: 80rpx;

		image {
			height: 40rpx;
			width: 80rpx;
			margin-left: 40rpx;
		}

		.search-input {
			width: 50vw;
			margin-right: 22rpx;
		}

		.sort-text {
			color: white;
			margin-left: 40rpx;
			font-size: 1.1rem;
			height: 100%;
			width: 30vw;
			justify-content:flex-start;
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
