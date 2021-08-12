<template>
	<view>
		<pageHead @goTo="goTo" :title="pageTitle()"></pageHead>
		<view class="main">
			<poilt v-if="chooseFoot == 1"></poilt>
			<myClass v-else-if="chooseFoot == 2"></myClass>
			<my v-else-if="chooseFoot == 3"></my>
		</view>
		<foot :foot="footData" @choose="choose" :chooseFoot="chooseFoot"></foot>

	</view>
</template>

<script>
	import {
		poilt
	} from "./second-page/pilot.vue"
	import {
		myClass
	} from "./second-page/my-class.vue"
	import foot from "../../components/foot-tab/foot-tab.vue"
	import {
		my
	} from "./second-page/my.vue"

	// import {testApi} from "../../service/api.js"
	export default {
		components: {
			poilt,
			myClass,
			my,
			foot,
		},
		// created() {
		// 	this.test()
		// },
		data() {
			return {
				chooseFoot: 1,
				footDefault:1,
				footData: [{
						text: "领航员",
						image: ["../../static/pilot-tab-0.png","../../static/pilot-tab-1.png"],
						id: 1
					},
					{
						text: "我的课程",
						image: ["../../static/my-class-0.png","../../static/my-class-1.png"],
						id: 2
					},
					{
						text: "我的",
						image: ["../../static/my-0.png","../../static/my-1.png"],
						id: 3
					},
				]

			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.chooseFoot = option.chooseFoot
		},
		methods: {
			goTo() {
				uni.redirectTo({
					url: '../first-page/first-page?chooseFoot=1'
				});
			},
			choose(id) {
				this.chooseFoot = id
			},
			pageTitle() {
				switch (this.chooseFoot) {
					case 1:
						return "领航员";
					case 2:
						return "我的课程";
					case 3:
						return "我的"
				}
				return "领航员";
			},
			async test() {
				let data = await testApi()
				console.log(data)
			}

		}
	}
</script>

<style scoped lang="scss">
	.main {
		height: 80vh;
	}

	.foot {
		justify-content: space-around;
		background-color: $back-ground-color;
		color: white;
		font-weight: 500;
		height: 160rpx;
		z-index: 10;
		position: relative;

		image {
			height: 50rpx;
			width: 50rpx;
		}

		.foot-item {
			flex-direction: column;
		}
	}
</style>
