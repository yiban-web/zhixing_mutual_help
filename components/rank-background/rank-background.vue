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
			<view class="main">
				<slot></slot>
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
		margin:0 auto;
		overflow: scroll;
	}
	.main{
		width: 94vw;
		height: 84vh;
		background-color:white;
		margin: 0 auto;
		overflow: scroll;
	}
</style>