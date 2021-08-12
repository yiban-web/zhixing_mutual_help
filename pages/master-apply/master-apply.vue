<template>
	<view>
		<pageHead @goTo="goTo" title="申请"></pageHead>
		<model ref="model"></model>
		<view class="card">
			<view class="line lineGrey">
				<p>姓名：</p>
				<input type="text" v-model="pilotData.helperName" disabled />
			</view>
			<view class="line">
				<p>学院：</p>
				<input type="text" v-model="pilotData.helperCollege" disabled />
			</view>
			<view class="line lineGrey">
				<p>班级：</p>
				<input type="text" v-model="pilotData.class" disabled />
			</view>
			<view class="line">
				<p>联系方式：</p>
				<input type="text" v-model="pilotData.contact" disabled />
			</view>
			<view class="line lineGrey">
				<p>帮扶科目：</p>
			</view>
		    <!--
			<view class="line lineGrey">
				<text class="checkButton" :class='{beChoosed:pilotData.helpSubject.indexOf("高数")>-1}'>高数</text>
				<text class="checkButton" :class='{beChoosed:pilotData.helpSubject.indexOf("线代")>-1}'>线代</text>
				<text class="checkButton" :class='{beChoosed:pilotData.helpSubject.indexOf("大物")>-1}'>大物</text>
				<text class="checkButton" :class='{beChoosed:pilotData.helpSubject.indexOf("英语")>-1}'>英语</text>
			
				<view class="checkButtonParent">
					<text class="checkButton" style="margin-right: 0;" :class='{beChoosed:other.choose}'>其他</text>
					<input maxlength=7 style="width: auto;max-width: 30vw;border-bottom: 1px solid black;font-size: ;text-align: center;"
					 type="text" v-if="other.choose" v-model="other.value" disabled />
				</view>
			</view> -->
			<view class="line" style="flex-wrap: wrap;padding-bottom: 20rpx;padding-top: 20rpx;">
				<view class="checkButton vertical-center"
				 v-for="(item,index) in subject" :key="index">
					<view class="check check-in vertical-center" v-if="pilotData.helpSubject.indexOf(item)>-1">
						<text class="">{{item}}</text>
					</view>
					<view class="check check-out vertical-center" v-else>
						<text class="">{{item}}</text>
					</view>
				</view>
				<!-- 其他 -->
				<view class="checkButton vertical-center">
					<text class="check vertical-center" style="margin-right: 0;width: 120rpx;margin-top: 20rpx;" @click='otherSubject()' :class="{'check-in':other.choose,'check-out':!other.choose}">其他</text>
					<input maxlength=7 style="width: auto;max-width: 30vw;border-bottom: 1px solid black;font-size: ;text-align: center;margin-top: 13rpx;"
					 type="text" v-if="other.choose" v-model="other.value" disabled />
				</view>
			</view>
			<view class="line lineGrey">
				<p>所获荣誉：</p>
			</view>
			<!-- 根据文字长度自动换行展示荣誉 -->
			<view class="honorText  vertical-center">
				{{pilotData.honor}}
			</view>
			<!-- <view class="line">
				<p>相关资料：</p>
			</view> -->
			<view>
				<!-- <view class="imgInfor">暂时不展示照片
							<uImage width='60px' height='60px' :src='pilotData.image' ></uImage>
						</view> -->
			</view>
			<view class="subButton" v-if='chang&&pilotData.applyState==1'>
				<view @click='changeState(0)' :class='{noView:true}'>
					<text>否决</text>
				</view>
				<view @click='changeState(1)' :class='{yesView:true}'>
					<text>通过</text>
				</view>
			</view>
			<view v-else class="noChange vertical-center" :style="{backgroundColor:applyStateColor(pilotData.applyState)}">
				<text >{{applyStateText(pilotData.applyState)}}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import back from '../../components/rank-background/rank-background.vue';
	import uIcon from 'uview-ui/components/u-icon/u-icon.vue'
	import {
		adAuditApply
	} from "../../service/manager.js"; //管理员决议领航员申请是否通过-将处理结果发送给服务器
	const querystring = require('querystring');
	export default {
		//code 等于零时已被注册，输入框全被禁用 为1时未被注册输入框可用
		onLoad: function(option) {
			// for(let i in option)
			// 	option[i]=decodeURIComponent(option[i]);//解码，如果传过来的helperSubject不是数组了，还需要转化一下
			//console.log(JSON.parse(decodeURIComponent(option.data)))
			this.pilotData = JSON.parse(decodeURIComponent(option.data)); //上个页面传过来的数据
			//console.log(this.pilotData)
			//处理帮扶科目
			for (let i = 0; i < this.pilotData.helpSubject.length; i++) {
				if (this.pilotData.helpSubject[i] != "高数" && this.pilotData.helpSubject[i] != "线代" && this.pilotData.helpSubject[i] !=
					"大物" && this.pilotData.helpSubject[i] != "英语") {
					this.other.value = this.pilotData.helpSubject[i];
					this.other.choose = true;
				}
			}
			if (this.pilotData.applyState == 1)
				this.chang = true;
		},
		computed: {
			yes() {
				if (this.yesNoStyle === 1)
					return true;
				else
					return false;
			},
			no() {
				if (this.yesNoStyle === 2)
					return true;
				else
					return false;
			}
		},
		data() {
			return {
				other: {
					choose: false,
					value: ""
				},
				chang: false,
				pilotData: {},
				lala: false,
				subject: ["高数", "线代", "大物", "英语"],
				yesNoStyle: 0 //1通过样式，2否决样式
			}
		},
		methods: {
			goTo() {
				uni.redirectTo({
					url: '../manager-page/manager-page?chooseFoot=2'
				});
			},
			async changeState(infro) {
				let applyState = infro ? 2 : 3
				this.$refs.model.showModel("", "提交中...", false, 2, "")
				try {
					let data = await adAuditApply({
						userId: this.pilotData.userId,
						applyState: applyState
					})
					if (data.code == 1) {
						this.pilotData.applyState = infro ? 2 : 3
					}
				} catch (e) {
					//TODO handle the exception
				} finally {
					this.$refs.model.hideModel()
				}
			}
		},
		components: {
			back: back,
			uIcon
		}
	}
</script>

<style lang="scss">
	/*back 组件100vw  75vh*/
	.checkButtonParent {
		display: flex;
		justify-content: left;
		align-items: center;
		height: 100%;
	}

	.card {
		width: 94vw;
		min-height: 42vh;
		max-height: 75vh;
		background-color: #ffffff;
		margin: 0 auto;
		padding-top: 2vh;

		.honorText {
			width: 100%;
			min-height: 4vh;
			height: auto;
			padding-left: 10vw;
			padding-right: 10vw;
			max-height: 16vh;
			overflow-y: scroll;
			justify-content: flex-start;
		}

		.line {
			display: flex;
			justify-content: left;
			align-items: center;
			padding-left: 10vw;
			min-height: 4vh;

			input {
				width: 60vw;
			}

			/* .checkButton {
				font-size: 100%;
				display: flex;
				align-items: center;
				height: 100%;
				margin-right: 4vw;
			} */
			.checkButton {
				min-width: 120rpx;
				height: 60rpx;
				border-radius: 20px;
				margin-right: 20rpx;
			}
			.check{
				width: 100%;
				height: 90%;
				border-radius: 20px;
			}
			
			.check-out {
				//未选中
				background-color: $grey-background;
				color: black;
				
			}
			
			.check-in {
				background-color: $title-background-color;
				color: white;
			}

			.beChoosed {
				background-color: #F4F1BB;
			}
		}

		.imgInfor {
			margin-top: 1vh;
			padding-left: 10vw;
		}

		.lineGrey {
			background-color: #f9f9f9;
		}

		.subButton {
			margin-top: 20rpx;
			width: 100%;
			height: auto;
			font-size: 20px;
			display: flex;
			justify-content: space-between;

			view {
				width: 49%;
				text-align: center;
				padding: 10px;
				border-radius: 5rpx;
				color: white;
			}
		}
		

		.noView {
			background-color: #EE836C;
		}

		.yesView {
			background-color: #9E487F;
		}
		
		.noChange{
			margin-left: 10vw;
			width: 160rpx;
			padding: 10rpx;
			height: 60rpx;
			border-radius: 20px;
			color: white;
		}
	}
</style>
