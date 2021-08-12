<template>
	<view class="">
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" title="领航员排行榜"></pageHead>
			<view class="main">
				<uTabs name="name"
				:list="nav"
				:is-scroll="false"    
				bg-color="white"
				:active-color="textColor"
				item-width="30rpx"
				:current="current-1"
				bar-width="200"
				bar-height="10"
				font-size="32"
				height="100"
				@change="navChange"
				></uTabs>
				<no-data v-if="rankData.data.length==0"></no-data>
				<view class="body" v-else>
					<rankLine v-for="(item,key) in rankData.data" :key="key"
					:helperName="item.helperName"
					:helpCollage="item.helpCollage"
					:Class="item.class"
					:headUrl="item.headUrl"
					:helperGrade="item.helperGrade"
					:ranking="key+1"
					:starPattetn="current==3"
					></rankLine> 
				</view>
			</view>
	</view>
</template>

<script>
	import back from'../../components/rank-background/rank-background.vue';
	import uTabs from 'uview-ui/components/u-tabs/u-tabs.vue';
	import rankLine from'../../components/rank-line/rank-line.vue'
	import { rankingList} from "../../service/pilot.js"
	import noData from "../../components/no-data/no-data.vue"
	export default{
		 components:{
			back,
			uTabs,
			rankLine,
			noData
		 },
		async mounted(){
			/* et index=this.current;
			let data=await rankingList(JSON.stringify({type:index}));
			this.rankData=data; */
			this.getData()
		},
		data(){
			return{
				textColor:this.$root.buttonColor,
				current:1,
				// 1总榜  2出勤榜  3评价榜
				nav:[
					{name:"总榜"},
					{name:"出勤排行榜"},
					{name:"评价榜"}
				],
				userType:0,
				rankData:{
					   code: 1,//0/1
					   data:[]
						 }
		}
		},
		onLoad(option) {
			this.userType = parseInt(option.userType)
		},
		methods:{
			navChange(index){
				if(index+1==this.current)//当前页面展示的就是点击的榜，不需要改变
					return;
				this.current=index+1;
				//申请下一个榜单
				/* (async ()=>{
					let data=await rankingList(JSON.stringify({type:index+1}));
					this.rankData=data;
				})(); */
				this.getData()
			},
			goTo(){
				uni.redirectTo({
				    url: '../first-page/first-page'
				});
			},
			async getData(){
				this.$refs.model.showModel("", "加载中...", false, 2)
				for(let i of Object.keys(this.rankData)){
					this.$delete(this.rankData,i)
				    //Vue.delete(this.rankData,i);
				}
				
				try{
					let data=await rankingList({
						listType:this.current,
						userType:this.userType
					})
					if(data.code==1){
						this.rankData=data
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
	.main{
		background-color: $grey-background;
		height: 100vh;
		.body{
			background-color: white;
			padding-bottom: 40rpx;
			width: 95%;
			margin-left: 2.5%;
			margin: 0 auto;
			box-shadow: 1px 3px 8px 3px #C0C0C0;
			max-height: 83vh;
			overflow-y: scroll;
		}
	}
</style>
