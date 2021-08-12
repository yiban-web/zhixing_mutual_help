<template>
	<view class="sort-card">
		<view class="paixu vertical-center" @click="cardHide()">
			<p>筛选</p>
		</view>
		<view class="" v-if="type==1">
			<view class="collage " v-show="current==0">
				<view class="card-head vertical-center">
					<p>学院</p>
				</view>
				<view class="collage-choose">
					<p v-for="(item,index) in collage" :key="index" @click="chooseCollage(item,index)" :style="{backgroundColor:choose1.index!==index?'white':'#F4F1BB'}">
						{{item}}
					</p>
				</view>
			</view>
			<view class="subject">
				<view class="card-head vertical-center">
					<p>科目</p>
				</view>
				<view class="subject-choose">
					<p v-for="(item,index) in subject" :key="index" @click="chooseSubject(item,index)" :style="{backgroundColor:choose2.index!==index?'white':'#F4F1BB'}">
						{{item}}
					</p>
				</view>
			</view>
		</view>
		<view class="" v-else-if="type==2">
			<view class="subject">
				<view class="subject-choose">
					<p v-for="(item,index) in applyState" :key="index" @click="chooseApply(index)" :style="{backgroundColor:choose3!==index?'white':'#F4F1BB'}">
						{{item}}
					</p>
				</view>
			</view>
		</view>
		<view class="" v-else-if="type==3">
			<view class="subject">
				<view class="subject-choose">
					<p v-for="(item,index) in adType" :key="index" @click="chooseApply(index)" :style="{backgroundColor:choose3!==index?'white':'#F4F1BB'}">
						{{item}}
					</p>
				</view>
			</view>
		</view>

		<view class="submit" @click="submit">
			<view class="body">
				<p>确&#8194认</p>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props: ["current", "type"],
		//type代表学生或管理员
		data() {
			return {
				collage: ["马克思主义学院",
					"计算机科学与工程学院",
					"艺术与设计学院",
					"自动化与信息工程学院",
					"经管学院专业学位中心",
					"经济与管理学院",
					"电气工程学院",
					"理学院",
					"水利水电学院",
					"材料科学与工程学院",
					"机械与精密仪器工程学院",
					"土木建筑工程学院",
					"国际工学院",
					"印刷包装与数字媒体学院",
					"信息技术与装备工程学院",
					"人文与外国语学院",
					"MBA办公室"
				],
				subject: ["高数", "线代", "英语", "大物", "其他科目"],
				applyState: ["全部", "待审核", '申请通过', "未通过"],
				adType: ["全部", '二级管理员', '一级管理员', '超级管理员'],
				choose1: {
					collage: "",
					index: -1
				},
				choose2: {
					subject: "",
					index: -1
				},
				choose3: -1
			};
		},
		methods: {
			cardHide() {
				this.$emit('cardShow');
			},
			chooseCollage(item, index) {
				this.choose1.collage = item
				this.choose1.index = index
			},
			chooseSubject(item, index) {
				this.choose2.subject = item
				this.choose2.index = index
			},
			chooseApply(index) {
				this.choose3 = index
			},
			submit() {
				let collage = this.choose1.collage
				let subject = this.choose2.subject
				let choose3 = this.choose3
				this.choose1.collage = "";
				this.choose1.index = -1
				this.choose2.subject = "";
				this.choose2.index = -1
				this.choose3 = -1
				this.$emit('returnRes', collage, subject, choose3);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.paixu {
		height: 80rpx;
		background-color: #F4F1BB;
		justify-content: left;

		p {
			margin-left: 20rpx;
		}
	}

	.sort-card {
		position: absolute;
		width: 95vw;
		background-color: white;
		-webkit-box-shadow: 1px 1px 1px 1px #C0C0C0;
		box-shadow: 1px 3px 8px 3px #C0C0C0;
		z-index: 10;
		left: 2.5%;
		max-height: 70vh;
		overflow-y: scroll;
	}

	.card-head {
		height: 80rpx;
		background-color: $grey-background;
		justify-content: left;

		p {
			margin-left: 20rpx;
		}
	}

	.collage-choose {
		display: flex;
		flex-grow: grow;
		flex-wrap: wrap;
		padding: 20rpx 0;
		max-height: 36vh;
		overflow-y: scroll;
		padding: 10rpx;


		p {
			padding: 10rpx 0;
			min-width: 47%;
			font-size: 0.9rem;
			margin-bottom: 0.5rem;
			margin-left: 20rpx;
			text-align: center;
		}
	}

	.subject-choose {
		padding: 20rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;

		p {
			padding: 10rpx;
			font-size: 0.9rem;
			min-width: 20vw;
			margin-bottom: 0.5rem;
			text-align: center;
		}
	}

	.submit {
		font-size: 1.2rem;
		margin-bottom: 40rpx;
		text-align: center;

		.body {
			color: $title-background-color;
			border: 1px solid $title-background-color;
			border-radius: 20px;
			width: 30vw;
			height: 60rpx;
			margin: 0 auto;

		}

		.body:active {
			color: white;
			background-color: $title-background-color;
		}
	}
</style>
