<template>
	<view>
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="">
			<list :dataList="userData" :userType="true" :listType="5" ></list>
		</view>
		<view class="data-list">
		 <dataDatail :helpDatail="classData"  ref="dataDatail" @lookDetail="lookDetail"></dataDatail>
		</view>
		
	</view>
</template>

<script>
	//管理员查看具体帮扶记录
	import list from "components/data-list/data-list.vue"
	import dataDatail from "components/class-datail/class-datail-list.vue"
	import {adLookUserData} from "../../service/manager.js"
	export default {
		data() {
			return {
				userData:[],
				classData:[],
				userId:-1,
				title:"信息",
				userType:-1
			};
		},
		components:{
			list,
			dataDatail
		},
		async mounted() {
			this.getData()
		},
		methods:{
			goTo(){
				uni.redirectTo({
				    url: '../manager-page/manager-page'
				});
			},
			lookDetail(classId,type){
				let userId = this.userData[0].userId
				//console.log(this.userData[0].userId,classId,type)
				uni.redirectTo({
					url:`../ad-look-class-detail/ad-look-class-detail?userId=${userId}&classId=${classId}&type=${type}`
				});
			},
			async getData(){
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try{
					let data = await adLookUserData({
						 userId:this.userId
					})
					if(data.code==1){
						this.$set(this.userData[0],"helpClassNum",data.userselfData.helpClassNum)
						this.$set(this.userData[0],"signClass",data.userselfData.signClass)
						this.$set(this.userData[0],"helpClassAllTime",data.userselfData.helpClassAllTime)
						
						for(let i=0;i<data.classData.length;i++){
							this.$set(this.classData,i,data.classData[i])
						}
						//this.classData = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					//console.log(e)
					return
				}
				this.$refs.model.hideModel()
			}
		},
		onLoad(option){
			let data = JSON.parse(decodeURIComponent(option.data))
			console.log(data)
			this.userId = data.userId
			this.userType=option.userType
			this.$set(this.userData,0,data)
			
		},
	}
</script>

<style lang="scss">
	.data-list{
		height: 78vh;
		overflow-y: scroll;
		position: relative;
		top: -80rpx;
		padding-top: 16rpx;

	}
</style>
