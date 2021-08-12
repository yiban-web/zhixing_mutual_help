<template>
	<view class="">
		<view class="status_bar">
		</view>
		<view class="page-title vertical-center" @click="goTo()">
			<uIcon name="arrow-left" color="white" size="42" class="page-title-icon" />
			<p>{{title}}</p>
		</view>
	</view>
	
</template>

<script>
	export default {
		props:["title"],
		methods:{
			goTo(){
				this.$emit("goTo")
			}
		}
	}
</script>

<style lang="scss">

</style>
