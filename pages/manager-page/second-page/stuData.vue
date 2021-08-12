<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<sortCard v-show="sortCard" @cardShow="cardShow" @returnRes="returnRes" :current="current" type="3"></sortCard>
		<view class="page-top vertical-center">
			<view @click="titleFunction" class="" style="width: 40%;">
				<p class="sort-text">{{addTitle}}</p>
			</view>
			<view class="search-input" v-show="current!=2">
				<uSearch shape="round" :show-action="true" input-align="center" v-model="searchData" placeholder="输入姓名"
				 :action-style="inputStyle" @search="search" @custom="search"></uSearch>
			</view>
		</view>
		<view class="pilot-data">
			<uTabs name="cate_name" :list="chooselist" :is-scroll="false" :current="current" height="120" font-size="35"
			 bar-height="15" bar-width="200" :active-color="textColor" :input-style="inputStyle" @change="choosePilot"></uTabs>
			<view class="radio-group vertical-center" v-show="current==0">
				<uRadioGroup v-model="value" size="40">
					<uRadio @change="radioChange(index)" v-for="(item, index) in pilotType" :key="index" :name="item.name" :disabled="item.disabled"
					 :active-color="textColor">
						{{item.name}}
					</uRadio>
				</uRadioGroup>
			</view>
			<view class="pilot-list" v-show="requsting">
				<scroll-data-list :dataList="dataList" :userType="returnUserType()" :listType="listType" :type="type" 
				@bottomData="getData()" :dataNum="dataNum" ref="dataList"  @noData="cleanData()" v-if="current<2"></scroll-data-list>
				<list listType="4" type="6" v-else :dataList="dataList"></list>
			</view>
		</view>
	</view>
</template>

<script>
	import uSearch from "uView-ui/components/u-search/u-search.vue"
	import scrollDataList from "../../../components/scroll-data-list/scroll-data-list.vue"
	import list from "../../../components/data-list/data-list.vue"
	import sortCard from "../../../components/sortCard/sortCard.vue"
	import uRadioGroup from "uView-ui/components/u-radio-group/u-radio-group.vue"
	import uRadio from "uView-ui/components/u-radio/u-radio.vue"
	import {
		adLookUserList,
		lookManager
	} from "../../../service/manager.js"
	export default {
		components: {
			uSearch,
			scrollDataList,
			sortCard,
			uRadioGroup,
			uRadio,
			list
		},
		data() {
			return {
				textColor:this.$root.buttonColor,
				searchData: "", //搜索框输入内容
				chooselist: [{
					name: "领航员"
				}, {
					name: "学困生"
				}, {
					name: "管理员"
				}],
				current: 0,
				inputStyle: {
					color: "white",
					fontSize: "1.1rem"
				},
				dataList: [],
				sortCard: false,
				type: 4,
				listType: 2,
				requsting: false,
				addTitle: "添加朋辈互助员",
				helperType: -1, //
				value: "学长领航员",
				pilotType: [{
						name: '学长领航员',
						disabled: false
					},
					{
						name: '朋辈互助员',
						disabled: false
					},
				],
				dataNum: 0,
				userType:4,
				page: 0,
			}
		},
		async mounted() {
			this.getData()
		},
		methods: {
			returnUserType() {
				let type = -1
				if (this.current == 0) {
					this.helperType == 0 ? type = 4 : type = 5
				} else if (this.current == 1) {
					type = 3
				}
				return type

			},
			titleFunction() {
				if (this.current < 2) {
					uni.redirectTo({
						//url: '../../pages/import-studata-page/import-studata-page'
						url: '../../pages/import-friend-data/import-friend-data?type=' + this.current
					});
				} else {
					this.cardShow()
				}

			},
			choosePilot(index) {
				this.requsting = false
				this.current = index
				switch (index) {
					case 0:
						this.addTitle = "添加朋辈互助员";
						this.userType = 4
						this.getData()
						this.type = 4
						this.listType = 2
						break;
					case 1:
						this.addTitle = "添加学困生";
						this.userType = 3
						this.getData()
						this.type = 4
						this.listType = 2
						break;
					case 2:
						this.addTitle = "筛选";
						this.userType = 0
						this.getData()
						this.type = 6
						this.listType = 4
						break;
				}
				//this.getData(4-this.current)
			},
			cardShow() {
				this.sortCard = !this.sortCard
			},
			returnRes(collage, subject, type) { //获取选项卡内容
				console.log(arguments[2])
				if (arguments[2] == 0) {
					this.userType = 0
					this.getData()
				} else {
					this.userType = arguments[2] + 5
					this.getData()
				}
				// this.$refs.model.showModel("","努力寻找中",false,3,"/static/finding.png")
			},
			async search(value) {
				//this.$refs.model.showModel("","努力寻找中...",false,3,"/static/finding.png")
				if (this.current == 1) {
					this.userType = 3
					this.getData()
				} else if (this.current == 0) {
					if (this.helperType == 0) {
						this.userType = 4
						this.getData()
					} else {
						this.userType = 5
						this.getData()
					}
				}
			},
			async getData(load) {
				load ? this.page++ : this.page = 0
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try {
					let data = []
					if (this.current == 2) {
						data = await lookManager({
							adType: this.userType,
						})
					} else {
						data = await adLookUserList({
							userType: this.userType,
							name: this.searchData,
							page:this.page
						})
					}
					if (data.code == 1) {
						this.dataNum = data.data.length
						if(this.dataNum==0){
							this.cleanData()
						}
						load ? this.dataList.push.apply(this.dataList, data.data) : this.dataList = data.data
					}
				} catch (e) {
					if(typeof userType == "boolean"){
						this.page--
					}
					this.$refs.model.showModel("", "", true, 6, getApp().globalData.errorImg)
					return
				} finally {
					this.requsting = true
				}
				this.$refs.model.hideModel()
			},
			radioChange(index) {
				this.helperType = index
				this.userType = index + 4
				this.getData()
			},
			toTop(){
				this.$refs.dataList.goTop()
			},
			cleanData(){ //清除搜索条件数据
				this.searchData = ""
			},
		}
	}
</script>

<style scoped lang="scss">
	.page-top {
		background-color: $back-ground-color;
		justify-content: space-between;
		// height: 80rpx;
		padding: 14rpx 40rpx;

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
			//margin-left: 40rpx;
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

	.radio-group {
		width: 100%;
		margin: 20rpx 0;
		justify-content: space-around;
	}
</style>
