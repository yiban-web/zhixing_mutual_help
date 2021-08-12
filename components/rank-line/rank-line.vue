<template>
	<view class="rankLine">
		<uRow>
			<uCol :span="2" :offset="1" style="height: 100vh;">
				<!-- 头像 -->
				<view>
					<uImage :src="headUrl" shape="circle" height="80" width="80" class="uImage"></uImage>
					<!-- <uAvatar src="../../static/manager.png"></uAvatar> -->
				</view>
			</uCol>
			<uCol :span="3">
				<uRow>
					<!-- 姓名 -->
					<uCol :span="12">{{helperName}}</uCol>
				</uRow>
				<uRow>
					<!-- 间隔 -->
					<uCol :span="12"><view style="height: 8px;"> </view></uCol>
				</uRow>
				<uRow>
					<!-- 学院 -->
					<uCol :span="12">{{helpCollage}}</uCol>
				</uRow>
			</uCol>
			<uCol :span="3">
				<!-- 班级 -->
				<view>{{Class}}</view>
			</uCol>
			<uCol :span="3">
				<uRow>
					<!-- 成绩 -->
					<uCol :span="12">
						<view class="grade"v-if="!starPattetn">{{helperGrade}}</view>
						<view class="starGrade" v-if="starPattetn">
							<!-- <img :src='"../../static/rank-star-"+ranking+".png"'
							style="display: block;width: 100%;height: 100%;"/>星星 -->
							<!-- 星星 -->
							<uIcon v-for="index of (helperGrade)" v-if="index<=5" name="star-fill" color="#EE836C" style="height: 100%;"></uIcon>
						</view>
					</uCol>
				</uRow>
				<uRow>
					<!-- 间隔 -->
					<uCol :span="12"><view style="height: 8px;"> </view></uCol>
				</uRow>
				<uRow>
					<!-- 名次 -->
					<uCol :span="12">
						<view style="display: flex;width: 100%;height: 100%;
						justify-content: center;">
							<text v-if="ranking>3" style="color: #EE836C;
								font-size: 12px;font-weight: 500;">{{ranking}}</text>
								<canvas v-if="ranking<=3" canvas-id="mark"
									style="width: 20px;height: 20px;"
								>
								</canvas>
						</view>
					</uCol>
				</uRow>
			</uCol>
		</uRow>
	</view>
</template>

<script>
	import uRow from 'uView-ui/components/u-row/u-row.vue';
	import uCol from 'uview-ui/components/u-col/u-col.vue';
	import uAvatar from 'uview-ui/components/u-avatar/u-avatar.vue';
	export default{
		components:{
			uRow,
			uCol,
			uAvatar
		},
		props:{
						starPattetn:{
							type:Boolean,
							default:"false"
						},
						helperName:{
							type:String,
							default:""
						},
			      helpCollage:{
							type:String,
							default:""
						},
			      Class:{
			      	type:String,
			      	default:""
			      },
			      headUrl:{
							type:String,
							default:""
						},
			      helperGrade:{
							type:Number,
							default:0
						} ,//分数
						ranking:{
							//名次
							type:Number,
							default:0
						}
		},
		mounted(){
			let ctx=uni.createCanvasContext('mark',this)//给前三名的人特殊标志
			//console.log(this.ranking);
			if(this.ranking==1)
				{
					ctx.arc(10, 10, 10, 0, 2 * Math.PI)
					ctx.setFillStyle("#fff766");
					ctx.fill();
					ctx.setFontSize(10)
					ctx.setFillStyle("#000000");
					ctx.fillText('1', 7, 13)
					ctx.draw();
				}
				else if(this.ranking==2)
				{
					ctx.arc(10, 10, 10, 0, 2 * Math.PI)
					ctx.setFillStyle("#e6ebe0");
					ctx.fill();
					ctx.setFontSize(10)
					ctx.setFillStyle("#bbbbba");
					ctx.fillText('2', 7, 13)
					ctx.draw();
				}
				else if(this.ranking==3)
				{
					ctx.arc(10, 10, 10, 0, 2 * Math.PI)
					ctx.setFillStyle("#e8ce67");
					ctx.fill();
					ctx.setFontSize(10)
					ctx.setFillStyle("#ed876b");
					ctx.fillText('3', 7, 13)
					ctx.draw();
				}
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.rankLine{
		margin-top: 1vh;
		margin-bottom: 1vh;
		border-bottom: 2px dashed #F2F2F2;
		border-image-slice: 10px;
		font-weight: 300;
		font-size: 1rem;
		white-space: nowrap;
		width: 94vw;
	}
	.grade{
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		color: #9E487F;
		font-size: 1rem;
		font-weight: 500;
	}
	.starGrade{
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: left;
		color: #9E487F;
		font-size: 1rem;
		font-weight: 500;
		width: 42px;
		height: 10px;
	}
</style>