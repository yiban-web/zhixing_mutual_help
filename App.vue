<script>
	import {
		getUserType
	} from "./service/api.js"
	export default {
		onLaunch: async function() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			
			while (true) {
				let data = await this.promiseLogin()
				if (data.getData || data.finalFail) {
					uni.hideLoading();
					break
				}
				console.log(data)
			}

		},
		onShow: function() {
			/* uni.redirectTo({
				url:"pages/first-page/first-page"
			}) */
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		data: function() {
			return {
				requestNum: 0,
				maxNum: 5,
				//url:"http://113.142.67.57:80",
				url:"https://www.xutyb.cn",
			}
		},
		globalData: {
			noDataImg:"../../../../static/typeNo.png",
			errorImg:"../../../../static/error.png",
			headUrl:"",
		},
		methods: {
			login(resolve, reject) {
				let this2 = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						uni.request({
							url: this2.url+"/oauth/authorize?code=" + loginRes.code + "&mini_app_name=cooperation",
							method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
							header: {
								'Content-Type': 'text/plain;charset=UTF-8',
							},
							success(res) {
								console.log(res.data)
								uni.setStorageSync('sessionId', res.data.sessionId);
								this2.getUserType(res)
								resolve({
									getData: true
								})
							},
							fail(err) {
								this2.requestNum++
								if (this2.requestNum >= this2.maxNum) {
									resolve({
										finalFail: true //最终出错
									})
									uni.showToast({
										title: '服务器异常',
										icon: 'none'
									})
								}
								resolve({
									finalFail: false //没有最终出错
								})
							},
						})
					}
				});
			},
			promiseLogin() {
				let this2 = this
				return new Promise((resolve, reject) => {
					this2.login(resolve, reject)
				})
			},
			getUserType(res) {
				uni.request({
					url: `${uni.getStorageSync("API_URL")}/common/getUserType`,
					method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
					header: {
						'Content-Type': 'text/plain;charset=UTF-8;application/json',
						'Cookie': "PHPSESSID=" + uni.getStorageSync("sessionId")
					},
					success(res) {
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.errMsg,
								icon: 'none'
							})
						} else {
							console.log(res.data.userType)
							uni.setStorageSync('userType', res.data.userType);
						}
					},
					fail(err) {
						uni.showToast({
							title: '网络异常',
							icon: 'none'
						})
						// reject(err);
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	.status_bar {
		height: calc(var(--status-bar-height) + 23px);
		width: 100%;
		//padding-top: 23px;
		box-sizing: content-box;
		background-color: $back-ground-color;
	}

	.page-title {
		background-color: $back-ground-color;
		color: white;
		height: 35px;

		.page-title-icon {
			position: absolute;
			left: 10rpx;

		}
	}

	.page-title p {
		font-size: $title-font-size;
	}

	.vertical-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
