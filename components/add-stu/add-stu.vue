<template>
	<view>
		<view v-if="pattern==0">
			<view class="searchPoilt">
				<view>姓名</view>
				<view>
					<input type="text" placeholder="请输入姓名" @input='searchImportPoiltData' v-model="searchName">
				</view>
				<view @click="goback">返回</view>
			</view>
			<view v-for="item in searchResult" @click="addPoilt(item)">
				<poiltSearchCard :searchData='item' :highlight="searchName" />
			</view>
		</view>
		<!-- ---------------------- -->
		<!-- 显示已选择，即将要添加的学生 -->
		<veiw v-if="pattern==1">
			<poiltImportCard v-for="(item,index) in addPoiltData.poiltData" :importData='item' :index="index" @deleteItem="deleteImportData" />
			<view class="addPoiltButton" v-if="addPoiltData.poiltData.length<5">
				<!-- 添加按钮点击后切换为搜索添加模式 -->
				<view @click="addPoiltBtn">
					<view>
						<uIcon name="plus-circle" color="#7F2F62" size="4vh"></uIcon>
						<text>点此添加</text>
					</view>
					<view>
						<text>（注：一次最多添加5次）</text>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import poiltSearchCard from '../search-poilt-data-card/search-poilt-data-card.vue'
	import poiltImportCard from '../import-poilt-data-card/import-poilt-data-card.vue'
	import {
		searchImportPoilt
	} from "../../service/manager.js"
	export default {
		props:["pattern"]
		data() {
			return {
				searchName:""
			};
		},
		components:{
			poiltSearchCard,
			poiltImportCard
		},
		methods:{
			goback(){
				
			},
			async searchImportPoiltData() {
				if (this.searchName) //如果搜索名字不为空就发送请求
				{
					try {
						uni.showLoading({
							title: '加载中......'
						});
						let searchResultData = await searchImportPoilt({
							'name': this.searchName
						});
						uni.hideLoading();
						if (searchResultData.code == 1) //申请数据成功
							this.searchResult = searchResultData.data;
						else
							uni.showToast({
								title: '加载失败',
								icon: 'none',
								duration: 2000
							});
					} catch (e) {
						uni.hideLoading();
						uni.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						});
					}
				}
			},
		}
	}
</script>

<style lang="scss">

</style>
