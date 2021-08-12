<template>
	<view class="upload-img">
		<uUpload ref="uUpload" :action="url" :auto-upload="false" :form-data="dataParams" name="image" :header="header"
		 @on-change="submitPj" :max-count="maxCount" height="120rpx" width="120rpx" @on-list-change="chooseImg"
		 :show-progress=false :deletable="!seccessPj" v-if="!isCreateRecord"></uUpload>
		<view v-else class="uploaded-img">
			<uImage :src="item" v-for="(item,index) in images" :key="index" width="120rpx" height="120rpx" @click="previewImg(item)"
			 class="uImage"></uImage>
		</view>

	</view>
</template>

<script>
	import uUpload from "uView-ui/components/u-upload/u-upload.vue"
	export default {
		components: {
			uUpload
		},
		props: ["params", "isCreateRecord", "action", "images"],
		data() {
			return {
				header: {
					'Cookie': "PHPSESSID=" + uni.getStorageSync("sessionId"),
					'Content-Type': 'multipart/form-data'
				},
				maxCount: 4, //最大上传数量
				nowCount: 0, //目前选择数量
				haveImg: false, //是否有照片
				//yesPj:this.$props.isCreateRecord,//已评价 
				seccessPj: false, //评价成功
				dataParams:this.params,
				url:this.action,
				reUpload:false,//重新上传
			};
		},
		methods: {
			submitPj(res, index, lists, name) { //上传图片之后
			console.log(res)
				if(res.errMsg!=""){
					let code = JSON.parse(res.data).code
					if (code == 1) {
						this.seccessed()
					}
					else{
						this.$refs.uUpload.clear()
					}
					this.$emit("uploaded", code)
				}
			},
			chooseImg(lists, name) { //每选择图片之后
				lists.length == 0 ? this.haveImg = false : this.haveImg = true,
					this.nowCount = lists.length
			},
			seccessed() {
				this.reUpload = true
				this.maxCount = this.nowCount
				this.seccessPj = true
			},
			isHaveImg() {
				return this.haveImg
			},
			uploadImg(fromData) {
				this.$refs.uUpload.upload(fromData)
			},
			getParams(params){
				this.dataParams = params
			},
			previewImg(url) {
				uni.previewImage({
					current: 0,
					urls: [url]
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload-img {
		padding: 10rpx 40rpx;
		border-top: 2px dashed #F2F2F2;
		min-height: 140rpx;

		.uploaded-img {
			display: flex;
			.uImage {
				margin-right: 30rpx;
			}
		}
	}
</style>
