<template>
	<view class="main">
		<view class="body">
			<no-data v-if="dataList.length==0"></no-data>
			<view class="data-item vertical-center" v-for="item in dataList" :key="item.helpClassId" @click="goPj(item)"
			v-else>
				<view class="text vertical-center">
					<uImage :src="item.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
					<view class="name-college">
						<p >{{item.helperName}}&emsp; &emsp; 帮扶科目：{{item.helpSubject}}</p>
						<p style="margin-top: 0.5rem;">{{item.helperCollege}}</p>
					</view>
				</view>
				<p class="link"  v-if = "item.evaluate == 0&&item.signIn==1">去评价 ></p>
				<view class="link"  v-else-if="item.signIn==1">
					<!-- <uRate :current="item.evaluateGrade" :disabled="true"  style="margin-left: 60vw;"
					active-color="#EE836C" inactive-icon="star-fill" ></uRate> -->
					查看评价 >
				</view>
				<p class="link" v-else-if="item.signIn==2">未签到无法评价</p>
				
				
			</view>
		</view>
		
	</view>
</template>

<script>
	//学困生-我的评价
	import uRate from "uView-ui/components/u-rate/u-rate.vue"
	import noData from "../no-data/no-data.vue"
	export default {
		components:{
			uRate,
			noData
		},
		props:["dataList"],
		data() {
			return {
				customStyle: {
						marginTop: "60rpx",
						width: "40vw",
						color:"white",
						backgroundColor:"#7F2F62",
						fontSize: "1.2rem",
				
					},
					
			};
		},
		
		methods:{
			goPj(item){
				if(item.signIn==2){
					return
				}
				uni.redirectTo({
				    url: "../../pages/stu-evaluate/stu-evaluate?classId="+item.helpClassId+"&type=3"
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		max-height: 71vh;
		overflow-y: scroll;
		padding-bottom: 100rpx;

		.body {
			background-color: white;
		}
	}
	.data-item{
		height: 13vh;
		border-bottom: 2px dashed #F2F2F2;
		padding: 15rpx 0;
		flex-direction: column;
		.state{
			margin-left: 80%;
			font-size: 0.7rem;
		}
		.text{
			justify-content: flex-start;
			.uImage{
				margin-left: 40rpx;
			}
			.name-college{
				margin-left: 40rpx;
				font-size: 32rpx;

			}
		}
		.star{
			margin-top: 20px;
		}
		.link{
			color: $title-background-color;
			font-size: 0.8rem;
			margin-top: 20rpx;
			margin-left: 65%;


		}
		.name-college{
			width: 60vw;
		}
	}

</style>
