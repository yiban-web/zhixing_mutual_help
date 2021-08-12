<template>
	<view class="main">
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" title="申请"></pageHead>
		<view class="card">
			<!-- 姓名 -->
			<view class="line lineGrey">
				<p>姓名：</p>
				<input type="text" v-model="result.helperName" disabled />
			</view>
			<!-- 学院 -->
			<view class="line">
				<p>学院：</p>
				<input type="text" v-model="result.helperCollege" disabled />
			</view>
			<!-- 班级 -->
			<view class="line lineGrey">
				<p>班级：</p>
				<input type="text" v-model="result.class" disabled />
			</view>
			<!-- 帮扶科目 -->
			<view class="line">
				<p>帮扶科目：</p>
			</view>
			<!-- 帮扶科目多选按钮 -->
			<view class="help-subject-choose">
				<view class="checkButton vertical-center" v-for="(item,index) in subject" :key="index">
					<view class="check check-in vertical-center" v-if="result.helpSubject.indexOf(item)>-1">
						<text class="" @click='getSubject(item)'>{{item}}</text>
					</view>
					<view class="check check-out vertical-center" v-else>
						<text class="" @click='getSubject(item)'>{{item}}</text>
					</view>
				</view>
				<!-- 其他 -->
				<view class="checkButton vertical-center">
					<text class="check vertical-center" style="margin-right: 0;width: 120rpx;margin-top: 20rpx;" @click='otherSubject()'
					 :class="{'check-in':other.choose,'check-out':!other.choose}">其他</text>
					<input maxlength=7 style="width: auto;max-width: 30vw;border-bottom: 1px solid black;font-size: ;text-align: center;"
					 type="text" v-if="other.choose" v-model="other.value" :disabled='result.haveApply==1' placeholder="科目" />
				</view>
			</view>
			<!-- 联系方式 -->
			<view class="line">
				<p>联系方式：</p>
			</view>
			<view class="line" v-if="result.haveApply==1" >
				<p>{{inputContact}}</p>
			</view>
			<view class="input-contact lineGrey" v-else>
				<uRadioGroup  @change="contactChoose">
					<uRadio  v-for="(item, index) in contact" :key="index" :name="item.name" :disabled="item.disabled">
						{{item.name}}
					</uRadio>
				</uRadioGroup>
				<input v-model="inputContact" :disabled='result.haveApply==1' placeholder="输入联系方式"></input>
			</view>
			<!-- 所获荣誉 -->
			<view class="line">
				<p>所获荣誉：</p>
			</view>
			<!-- 根据文字长度自动换行展示荣誉 -->
			<view class="honorText lineGrey vertical-center" v-if="result.haveApply==1">
				{{result.honor}}
			</view>
			<!-- 输入 -->
			<view v-else-if="result.haveApply==0" class="line lineGrey">
				<!-- 			<input v-model="params.honor" :disabled='result.haveApply==1'></input> -->
				<uField v-model="params.honor" placeholder="输入所获荣誉" type="textarea" :disabled="result.haveApply==1" style="width: 100%;"></uField>
			</view>
			<!-- 图片相关资料 -->
			<!-- <view class="line">
				<p>相关资料：</p>
			</view> -->
			<view>
				<!-- <view class="imgInfor" v-if='result.haveApply==0||result.image.length>0'>
					<uplode :params="params" :maxCount="maxCount" :isCreateRecord="result.haveApply" :action="action" :images="result.image"
					 ref="uplode" @uploaded="uploadRes"></uplode>
				</view> -->
				<!-- 已申请的申请状态 -->
				<view  class="line">
					<view class="okBox" :style="{backgroundColor:applyStateColor(result.applyState)}">{{`${applyStateText(result.applyState)}`}}</view>
				</view>
			</view>
			<!-- 提交按钮 -->
			<view class="btn-submit" v-if="result.haveApply==0">
				<uButton type="default" shape="circle" :custom-style="submitStyle" @click="submit">提交</uButton>
				<view style="height: 8vh;"></view>
			</view>
			<view class="btn-submit" v-else-if='result.applyState==1&&result.haveApply==1'>
				<uButton type="default" shape="circle" :custom-style="submitedStyle" hover-class="none">已提交</uButton>
				<view style="height: 8vh;"></view>
			</view>
		</view>
		<view>
			<uButton :custom-style="customStyle2" @click="reApply()" v-show="result.haveApply==1">重新申请</uButton>
		</view>
	</view>
</template>

<script>
	import back from '../../components/apply-poilt-background/apply-poilt-background';
	import uIcon from 'uview-ui/components/u-icon/u-icon.vue'
	import uplode from "../../components/upload-image/upload-image.vue"
	import uField from "uview-ui/components/u-field/u-field.vue"
	import uRadioGroup from "uview-ui/components/u-radio-group/u-radio-group.vue"
	import uRadio from "uview-ui/components/u-radio/u-radio.vue"
	import {
		ApplyResult,
		applyFor
	} from "../../service/pilot.js";
	export default {
		async mounted() {
			this.getData()
		},
		data() {
			return {
				action: `${uni.getStorageSync('API_URL')}/helper/applyFor`,
				header: {
					'Cookie': "PHPSESSID=" + uni.getStorageSync("sessionId")
				},
				submitStyle: {
					backgroundColor: this.$root.buttonColor,
					color: "white"
				},
				submitedStyle: {
					backgroundColor: "#b7b7b7",
					color: "white"
				},
				other: {
					choose: false,
					value: ""
				},
				params: {
					helperName: "",
					helperCollege: "",
					class: "",
					helpSubject: [],
					honor: "",
					contact:""
				}, //参数
				maxCount: 4,
				result: {},
				lala: false,
				customStyle2: {
					marginTop: "60rpx",
					width: "40vw",
					color: this.$root.buttonColor,
					backgroundColor: "white",
					fontSize: "1rem"
				},
				subject: ["高数", "英语", "线代", "大物"],
				contact:[{name: 'QQ号',
					disabled: false},{name: '微信号',
					disabled: false},{name: '手机号',
					disabled: false}],
				inputContact:""
			}
		},
		methods: {
			contactChoose(name){
				this.params.contact = name+":"
				this.inputContact = ""
			},
			goTo() {
				uni.redirectTo({
					url: '../first-page/first-page'
				});
			},
			async getData() {
				this.$refs.model.showModel("", "加载中...", false, 2, "")
				try {
					let data = await ApplyResult();
					if (data.code == 1) {
						this.result = data.data;
                        if(this.result.honor == undefined){
                            this.result.honor = ""
                        } 
						this.inputContact = data.data.contact
					} else {
						return
					}
					for (let i = 0; i < this.result.helpSubject.length; i++) {
						if (this.result.helpSubject[i] != "高数" && this.result.helpSubject[i] != "线代" && this.result.helpSubject[i] !=
							"大物" &&
							this.result.helpSubject[i] != "英语") {
							this.other.value = this.result.helpSubject[i];
							this.other.choose = true;
						}
					}
					this.params.helperName = this.result.helperName
					this.params.honor = this.result.honor
					this.params.class = this.result.class
					this.params.helperCollege = this.result.helperCollege
				} catch (e) {
					this.$refs.model.showModel("", "", true, 6, getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			},
			getSubject(subject) {
				if (this.result.haveApply == 1) //已申请到数据不需要新申请
					return;
				//被选择的科目的下标
				let index = this.result.helpSubject.indexOf(subject);
				if (index > -1) //此科目被选择过，将它删除
				{
					this.result.helpSubject.splice(index, 1);
				} else {
					this.result.helpSubject.push(subject);
				}
			},
			// uploadRes() { //上传之后处理
			// 	this.$refs.model.hideModel()
			// 	if (code == 1) {
			// 		this.result.haveApply = 1
			// 		this.$refs.model.showModel("checkmark-circle", "评价成功", true, 1)
			// 	} else {
			// 		this.$refs.model.showModel("close-circle", "评价失败", true, 1)
			// 	}
			// },
			otherSubject() {
				if (this.result.haveApply == 1) //已申请到数据不需要新申请
					return;
				this.other.choose = !this.other.choose;
			},
			async submit() {
				if (this.other.choose) {
					this.$set(this.result.helpSubject, this.result.helpSubject.length, this.other.value)
				}
				this.params.helpSubject = this.result.helpSubject
				//this.$refs.uplode.getParams(this.params)
				this.params.contact += this.inputContact
				if (0&&this.$refs.uplode.isHaveImg()) {
					this.$refs.uplode.uploadImg()
				} else {
					this.$refs.model.showModel("", "提交中...", false, 2)
					try {
						let data = await applyFor(this.params)
						this.uploadRes(data.code)
					} catch (e) {
						this.uploadRes(0)
						//TODO handle the exception
					}

				}
			},
			uploadRes(code) { //请求之后处理
				this.$refs.model.hideModel()
				if (code == 1) {
					this.result.haveApply = 1
					this.result.applyState = 1
					this.$refs.model.showModel("checkmark-circle", "提交成功", true, 1)
					this.successPj = true
				} else {
					this.$refs.model.showModel("close-circle", "提交失败", true, 1)
				}
			},
			reApply() {
				this.other.value = ""
				this.inputContact = ""
				this.$set(this.result, "haveApply", 0)
				for (let i = 0; i < this.result.helpSubject.length;) {
					if (this.result.helpSubject[i] == "高数" || this.result.helpSubject[i] == "线代" || this.result.helpSubject[i] == "大物" ||
						this.result.helpSubject[i] == "英语") {
						//this.$delete(i,this.result.helpSubject)
						i++
					} else {
						//console.log(this.result.helpSubject[i])
						this.$delete(this.result.helpSubject, i)
					}
				}
				//console.log(this.result.helpSubject)
				//this.result.haveApply == 0
			},

			/* subjectChoosed(name){//科目选中样式
				if(this.result.helpSubject!=undefined&&.result.helpSubject.indexOf(item)>-1){
					return "checkButton vertical-center check-in"
				}
				else{
					return "checkButton vertical-center check-out"
				}
			} */
		},
		components: {
			back: back,
			uIcon,
			uplode,
			uField,
			uRadioGroup,
			uRadio,
		}
	}
</script>

<style lang="scss" scoped>
	/*back 组件100vw  75vh*/
	.main {
		background-color: $grey-background;
		height: 100vh;

		.body {
			background-color: white;
			padding-bottom: 40rpx;
		}
	}
	.input-contact{
		flex-direction: column;
		justify-content: space-around;
		height: 10vh;
		padding-left: 10vw;
		display: flex;

	}

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
		padding-bottom: 40rpx;
		box-shadow: 1px 3px 8px 3px #C0C0C0;

		.honorText {
			width: 100%;
			min-height: 4vh;
			padding-left: 10vw;
			padding-right: 10vw;
			max-height: 16vh;
			overflow-y: scroll;
			justify-content: start;

		}

		.line {
			display: flex;
			justify-content: left;
			align-items: center;
			padding-left: 10vw;
			min-height: 4vh;

			input {
				width: 70vw;
			}

			.checkButton {
				font-size: 100%;
				display: flex;
				align-items: center;
				height: 100%;
				margin-right: 4vw;
			}

			.beChoosed {
				background-color: #F4F1BB;
			}
		}

		.imgInfor {
			padding-left: 10vw;
		}

		.lineGrey {
			background-color: #f9f9f9;
		}

		.btn-submit {
			width: 30vw;
			margin: 40rpx auto;

			.uButton {
				margin-bottom: 2vh;
			}
		}

		.okBoxStatus1 {
			background-color: #EE836C;
		}

		.okBoxStatus2 {
			background-color: $title-background-color;
		}

		.okBoxStatus2 {
			background-color: $title-background-color;
		}

		.okBox {
			margin-top: 20rpx;
			height: auto;
			display: flex;
			align-items: center;
			border-radius: 100rpx;
			border-width: 0px;
			padding-left: 20rpx;
			padding-right: 20rpx;
			padding-top: 5rpx;
			padding-bottom: 5rpx;
			color: white;
		}
	}

	.help-subject-choose {
		display: flex;
		flex-wrap: wrap;
		margin-left: 10vw;
		margin-bottom: 20rpx;

		.checkButton {
			min-width: 120rpx;
			height: 60rpx;
			border-radius: 20px;
			margin-right: 20rpx;
		}

		.check {
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
	}
</style>
