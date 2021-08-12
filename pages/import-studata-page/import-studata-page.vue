<template>
	<view>
		<pageHead @goTo="goTo" title="信息导入"></pageHead>
			<model ref="model"></model>
			<view class="card">
				<view v-for='(item,index) in allData.stuData' class="stuItem">
					<view class="delItem">
						<uIcon color="#EE836C" name="minus-circle-fill" size="8vw" @click="delStu" :index="index"></uIcon>
					</view>
					<view class="one">
						<text class="checkButton1">姓名</text>
						<input type="text" maxlength="14" placeholder="请输入姓名(最长14个字符)" v-model="item.name" />
					</view>
					<view class="two">
						<text class="checkButton2">学号</text>
						<input type="text" maxlength="10" placeholder="请输入10位数字学号" v-model="item.stuNum" />
					</view>
					<view class="three"></view>
				</view>
				<view class="four">
					<uIcon name="plus-circle" size="3vh" color="#7F2F62" @click="addOneStu" />
					<text @click="addOneStu" style="margin-left: 1vw;">继 续 添 加</text>
				</view>
				<view class="five">(注: 一次最多添加五次)</view>
				<view class="six">
					<button class="button  text1" @click="submit">确认</button>
				</view>
			</view>
	</view>
</template>

<script>
	import back from '../../components/rank-background/rank-background.vue';

	import {
		addStu
	} from "../../service/manager.js";
	export default {
		async created() {
			//调用申请
			let data = await ElevenResult();
			//如果已申请将科目选择为其他的拎出来并将other 的 value设为那个值
			this.result = data;
		},
		data() {
			return {
				allData: {
					stuData: [{
						name: "",
						stuNum: ""
					}]
				}

			}
		},
		methods: {
			goTo(){
				uni.redirectTo({
				    url: '../manager-page/manager-page'
				});
			},
			delStu(index) {
				this.allData.stuData.splice(index, 1);
			},
			addOneStu() {
				if (this.allData.stuData.length < 5) //如果数据没有超过5个则可以添加下一个
				{
					this.allData.stuData.push({
						name: "",
						stuNum: ""
					});
				} else {
					this.$refs.model.showModel("", "一次至多导入5个哦", true, 1);
					return;
				}
			},
			async submit() {
				if (this.allData.stuData.length === 0) {
					//没有填写一个数据
					this.$refs.model.showModel("", `请添加学生姓名或学号哦！！！`, true, 1);
					return;
				}
				let errorStu = []; //未填写完整的学生信息编号
				for (let i = 0; i < this.allData.stuData.length; i++) {
					if (this.allData.stuData[i].name === "" || (this.allData.stuData[i].stuNum.length < 10 &&
							(/[0-9]{10}/g).test(this.allData.stuData[i].stuNum) === false)) {
						errorStu.push(i + 1);
					}
				}
				if (errorStu.length > 0) {
					//数据未输入完整弹出提示
					this.$refs.model.showModel("", `请核对第${errorStu.join('，')}位学生姓名或学号哦！！！`, true, 1);
					return; //数据为输入完整暂不提交
				}

				//数据填写完整，可以提交
				try {
					this.$refs.model.showModel("", `学困生导入中.....`, false, 1);
					let response = await addStu(this.allData.stuData);
					if (response.code == 1)
						this.$refs.model.showModel("", `提交成功`, true, 1);
				} catch (e) {
					this.$refs.model.showModel("", `提交失败`, true, 1);
					return
				}
				this.$refs.model.hideModel()
			}
		},
		components: {
			back: back
		}
	}
</script>

<style lang="scss">
	/*back 组件100vw  75vh*/
	.card {
		width: 94vw;
		height: 100%;
		background-color: #FFFFFF;
		margin: 0 auto;
		padding-top: 3vh;

		.stuItem {
			position: relative;
		}

		.delItem {
			width: 10vw;
			height: 10vw;
			position: absolute;
			left: 0;
			top: -3vw;
		}

		.one {
			display: flex;
			justify-content: left;
			align-items: center;
			padding-left: 0vw;
			height: 5vh;
			background-color: #F2F2F2;

			input {
				width: 60vw;
				padding-left: 4vh;
			}

			.checkButton1 {
				font-size: 100%;
				display: flex;
				height: 100%;
				width: 25vw;
				color: #FFFFFF;
				background-color: #9E487F;
				margin-left: 2vw;
				font-size: 17px;
				align-items: center;
				justify-content: center;

			}
		}

		.two {
			display: flex;
			align-items: center;
			padding-left: 0vw;
			height: 5vh;
			background-color: #F9F9F9;

			input {
				width: 60vw;
				padding-left: 4vh;
			}

			.checkButton2 {
				font-size: 100%;
				display: flex;
				height: 100%;
				width: 25vw;
				color: #FFFFFF;
				background-color: #C08CAD;
				font-size: 17px;
				margin-left: 2vw;
				align-items: center;
				justify-content: center;

			}
		}

		.three {
			background-color: #FFFFFF;
			padding-left: 10vw;
			height: 3.5vh;
			display: flex;
		}

		.four {
			color: #7F2F62;
			padding-right: 4vh;
			font-size: 15px;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			text {
				width: auto;
			}
		}

		.five {
			text-align: right;
			padding-right: 4vh;
			font-size: 13px;
			font-weight: 100;
		}

		.six {
			margin-top: 2vh;
			display: flex;
			align-items: center;
			justify-content: center;

			.button {
				width: 35vw;
				height: 10vw;
				border-radius: 5vw;
				background-color: #9E487F;
				color: #FFFFFF;
				font-size: 15px;
				text-align: center;
				line-height: 10vw;
			}
			.button:active{
				background-color: rgba($color: #843c6c, $alpha: 0.8)
			}
		}


	}
</style>
