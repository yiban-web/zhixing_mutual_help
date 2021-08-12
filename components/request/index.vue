<template>
	<view class="">
		<p>测试请求</p>
		<p>{{getData}}</p>
		<p>{{postData}}</p>
	</view>
</template>

<script>
	import {getApi,postApi} from 'service/api.js'
	export default{
		created() {
			this.getMothed()
			this.postMothed()()
		},
		data(){
			return{
				getData:"get请求",
				postData:"post请求"
			}
		},
		methods:{
			async getMothed(){
				let data = await getApi({
					data:"abc"
				})
				this.getData = data.data
			},
			async postMothed(){
				let param = {
					data:"abc"
				}
				let data = await postApi(param)
				this.postData = data.data
			},
		}
		
	}
</script>

<style>
</style>
