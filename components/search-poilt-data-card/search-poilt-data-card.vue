<template>
	<view class="body">
		<model ref="model" ></model>
		<view class="searchPoiltDataContent" v-for="(item,index) in searchData" :key="index" @click="chooseThis(item)">
			<uRow>
				<uCol span=7>
					<view>
						<text v-for="(item2,index) in item.helperName.split('')" :key="index">
							<text v-if="highlight.indexOf(item2)!=-1" class="textHightlight">{{item2}}</text>
							<text v-else>{{item2}}</text>
						</text>
					</view>
					<!-- <view><text class="textHightlight">{{yesHighlight(item.helperName)}}</text>{{noHightlight(item.helperName)}}</view> -->
				</uCol>
				<uCol span=5><text>{{item.stuNum}}</text></uCol>
			</uRow>
			<view></view>
			<uRow>
				<uCol span=7><text>{{item['class']}}</text></uCol>
				<uCol span=5><text>{{item.helperCollege}}</text></uCol>
			</uRow>
		</view>
	</view>
</template>

<script>
	import uRow from 'uview-ui/components/u-row/u-row.vue';
	import uCol from 'uview-ui/components/u-col/u-col.vue';
	export default{
		components:{
			uRow,
			uCol,
		},
		props:[
			"searchData",
			"highlight"
		],
		mounted (){
		},
		watch:{
			/* highlight(){
				this.res = this.searchData.helperName.split(this.highlight);
			} */
		},
		computed:{
			
		},
		data(){
			return{
				res:[],
				nameDataList:[]
			}
		},
		methods:{
			chooseThis(item){
				this.$emit("chooseThis",item)
			},
			noHightlight(stuname){
				return stuname.split(this.$props.highlight)[1]
				/* if(this.res.length==1)
					return this.res[0];
				else
					return this.res[1]; */
			},
			yesHighlight(stuname){
				//console.log(stuname.split(this.$props.highlight))
				return stuname.split(this.$props.highlight)[0]
				/* if(this.res.length==1)
					return "";
				else
					return this.highlight; */
			}
		}
	}
</script>

<style scoped lang="scss">
	.body{
		   max-height: 75vh;
		   overflow-y: scroll;
		   padding-bottom: 100rpx;
	}
	.searchPoiltDataContent{
		width: 100%;
		height: auto;
		padding: 1vh 4vw 1vh 4vw;
		background-color: #F9F9F9;
		border-bottom: 1px solid #e1e1e1;
	}
	.searchPoiltDataContent>view:nth-child(2){
		height: 1vh;
	}
	.searchPoiltDataContent{
		letter-spacing: 0.5vw;
		font-size: 1.5vh;
		line-height: 1.5vh;
	}
	.textHightlight{
		color: #EE836C;
	}
</style>