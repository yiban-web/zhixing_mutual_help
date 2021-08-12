<template>
	<view >
			<uMask :show="show" @click="show = false" :mask-click-able="clikAble" >
				<view class="vertical-center" style="height: 90%;">
					<view class="model vertical-center" v-if="type==1">
						<uIcon :name="icon" :color="iconColor" size="120"></uIcon>
						<p class="text">{{text}}</p>
					</view>
					<view class="model vertical-center" v-else-if="type==2">
						<uLoad mode="flower" size="100"></uLoad>
						<p class="text">{{text}}</p>
					</view>
					<view class="model vertical-center" v-else-if="type==3">
						<uImage :src="url" width="180rpx" height="200rpx" mode="aspectFit"></uImage>
						<p class="text">{{text}}</p>
					</view>
					<view class="vertical-center" v-else-if="type==4">
						<uImage :src="url" mode="aspectFit" width="100vw" height="100vh"></uImage>
					</view>
					<view class="vertical-center er-code model" v-else-if="type==5">
						<p>签到二维码</p>
						<uImage :src="url" mode="aspectFit" width="400rpx" height="400rpx"></uImage>
					</view>
					<view class="vertical-center error model" v-else-if="type==6">
						<uImage :src="url" width="300rpx" height="300rpx" mode="aspectFit"></uImage>
						<p>加载失败</p>
						<uButton @click="reload">重新加载</uButton>
					</view>
					<view class="vertical-center jian-jie model" v-else-if="type==8">
						<p>APP简介</p>
						<p>
							为提高国际工学院学生对课程的掌握程度，学院在全校范围内招募学长领航员，为在学习中有疑惑的同学提供线上或线下答疑，特开发此APP平台。
						</p>
					</view>
					<view class="vertical-center error model" v-else-if="type==7">
						<!-- <uImage :src="url" width="300rpx" height="300rpx" mode="aspectFit"></uImage> -->
						<p>获取用户权限</p>
						 <button open-type="getUserInfo" plain="true" >按钮</button>
					</view>
					<view class="vertical-center error model" v-else-if="type==9">
						<p>
							联系方式: 029 - 68826701
						</p>
					</view>
				</view>
			</uMask>
	</view>
</template>

<script>
	import uMask from "uview-ui/components/u-mask/u-mask.vue"
	import {uLoad} from "uview-ui/components/u-loading/u-loading";
	export default {
		components:{
			uMask,
			uLoad
		},
		data() {
			return {
				show: false,
				text:"",
				icon:"",
				clikAble:true,
				url:"",
				iconColor:"#7F2F62",
				type:-1, //1为展示图标和字  2是加载 3是带图片 4预览图片 5签到二维码 6加载失败
			};
		},
		methods:{
			showModel(icon,text,clikAble,type,url,color){//图标名，提示文字，点击是否可关闭，model类型，图片地址
				this.show = true
				this.text = text
				this.icon = icon
				this.clikAble = clikAble
				this.type = type
				this.url = url
				this.iconColor = color
			},
			hideModel(){
				this.show = false
			},
			reload(){
				this.hideModel()
				this.$emit("reload")
			},
			getUserData(){
				this.hideModel()
				this.$emit("reload")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model{
		min-height: 50vw;
		min-width: 50vw;
		background-color: white;
		// margin-top: 30vh;
		// margin-left: 25vw;
		border-radius: 20px;
		font-size: 1.2rem;
		color:$back-ground-color;
		flex-direction: column;
		padding: 40rpx;
	}
	.text{
		width: 35vw;
		text-align: center;
		margin-top: 20rpx;
	}
	.er-code{
		width: 80vw;
		height: 40vh;
		p{
			margin-bottom: 40rpx;
		}
	}
	.error{
		p{
			margin: 40rpx 0;
		}
	}
	.jian-jie{
		width: 80vw;
		p:nth-child(2){
			color: #82848a;
			margin: 40rpx 0;
		}
		
	}

</style>
