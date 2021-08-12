<template>
	<view>
		<view class="background">
			<model ref="model"></model>
			<view class="status_bar">
			</view>
			<view class="page-title vertical-center">
				<uIcon name="arrow-left" color="white" size="32" class="page-title-icon" @click="goTo()"/>
				<p >{{pageTitle}}</p>
			</view>
			<view class="main mainlinear">
				<slot></slot>
				<div class="person">
					<image :src="backgroundImage"></image>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			pageTitle:{
				type:String
			}
		},
		data(){
			return{
			backgroundImage:'../../static/person.png'
			}
		},
		methods:{
			goTo(){
				uni.redirectTo({
				    url: '../first-page/first-page'
				});
			}
		}
	}
</script>

<style scoped>
	.background{
		width: 100vw;
		height:100vh;
		background-color: #F2F2F2;
	}
	.main{
		width: 100vw;
		height: 75vh;
		position: relative;
	}
	.mainlinear{
		background-image: linear-gradient(to top,#ece6ea,#f1f1f1);
	}
	.person{
		height: 16vh;
		width: 20vw;
		bottom:-5vh;
		left: 40vw;
		position: absolute;
	}
	.person image{
		height: 100%;
		width: 100%;
	}
</style>