<template>
	<view>
		<model ref="model" @reload="getData"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="main">
			<view class="body">
				<view class="item">
					<view class="data-item ">
						<view class="text vertical-center">
							<uImage :src="basics.headUrl" shape="circle" height="100" width="100" class="uImage"></uImage>
							<view class="name-college">
								<p>{{basics.name}}</p>
								<view class="subject vertical-center">
									<label>帮扶科目：</label>
									<uRadioGroup v-model="helpSubject" @change="radioGroupChange" :disabled="submitYes" size="40">
										<uRadio v-for="(item, index) in basics.helpSubject" 
										:key="index" :name="item" :active-color="textColor">
											{{item}}
										</uRadio>
									</uRadioGroup>
								</view>
								<p style="margin-top: 0.5rem;">{{basics.college}}</p>
							</view>

						</view>
					</view>
					<view class="help-title vertical-center">
						<p>帮扶时间</p>
					</view>
					<view class="help-time help-text">
						<view class="choose-time-day">
							<uButton class="help-date" @click="showDate = true" :disabled="submitYes">{{returnDate(1)}}</uButton>
							<uButton class="help-time" @click="showTime = true" :disabled="submitYes">{{returnDate(2)}}</uButton>
						</view>
						<!-- <view class="choose-res">
							<p v-show="helpTimeArray.year != undefined" class="date">{{helpTimeArray.year}}年{{helpTimeArray.month}}月{{helpTimeArray.day}}日</p>
							<p v-show="helpTimeArray.year != undefined">{{helpTimeArray.week}}</p>
							<p v-show="helpTimeArray.hours != undefined">{{helpTimeArray.hours+"时"+(helpTimeArray.minutes<10?"0"+helpTimeArray.minutes:helpTimeArray.minutes)+"分"}}</p>
						</view> -->
						<uSelect v-model="showTime" :list="timeList" mode="mutil-column" :confirm-color="textColor" @confirm="chooseTime"></uSelect>
						<uCalendar v-model="showDate" mode="date" @change="chooseDate" 
						:change-year=false :min-date="minDate" :max-date="maxDate" ></uCalendar>

					</view>
					<view class="help-title vertical-center">
						<p>帮扶地点</p>
					</view>
					<view class="help-text">
						<uField v-model="helpAddress" placeholder="输入帮扶地点" type="textarea" :disabled="submitYes"></uField>
					</view>
					<view class="help-title vertical-center">
						<p>帮扶具体内容</p>
					</view>
					<view class="help-text">
						<uField v-model="helpDetail" placeholder="输入帮扶具体内容" type="textarea" :disabled="submitYes"></uField>
					</view>
					<p class="publish-state" v-if="submitYes">(已发布)</p>

				</view>
			</view>
			<view class="btn">
				<uButton shape="circle"  :custom-style="customStyle1" v-if='!(helpTimeArray.year != undefined && helpTimeArray.hours != undefined && helpSubject != "" && 
					helpAddress != "" && helpDetail != "")||submitYes' :hover-class="buttonStyle">提交</uButton>
				<uButton shape="circle" @click="submit" :custom-style="customStyle0" hover-class="buttonStyle" v-else>提交</uButton>
			</view>
		</view>

	</view>
</template>

<script>
	import uRadioGroup from "uView-ui/components/u-radio-group/u-radio-group.vue"
	import uRadio from "uView-ui/components/u-radio/u-radio.vue"
	import uCalendar from "uView-ui/components/u-calendar/u-calendar.vue"
	import uSelect from "uView-ui/components/u-select/u-select.vue"
	import uField from "uView-ui/components/u-field/u-field.vue"
	import {postMessage,pilotData} from "../../service/pilot.js"
	export default {
		components: {
			uRadioGroup,
			uRadio,
			uCalendar,
			uSelect,
			uField
		},
		data() {
			return {
				textColor:this.$root.buttonColor,
				basics: {},
				title:"帮扶信息",
				helpSubject: "",
				showDate: false,
				showTime: false,
				yearNow: 0,
				dateNow: 0,
				minDate: "",
				maxDate: "",
				helpTime: 0,
				helpTimeArray: {},
				timeList: [],
				helpAddress: "", //帮扶地点
				helpDetail: "", //帮扶具体内容
				customStyle0: {
					marginTop: "20rpx",
					marginBottom: "20rpx",
					width: "30vw",
					color: "white",
					backgroundColor: this.$root.buttonColor,
					fontSize: "1.2rem",
				},
				customStyle1: {
					marginTop: "20rpx",
					marginBottom: "20rpx",
					width: "30vw",
					color: "white",
					backgroundColor: "#696969",
					fontSize: "1.2rem",
				},
				submitYes:false,//成功发布
				buttonStyle:`{
					background-color: this.$root.buttonColor;
				 	border-color:this.$root.buttonColor
					}`
			};
		},
		async mounted() {
			//这里先调用接口获取
			this.makeCal()
			this.getData()
		},
		methods: {
			async getData(){
				this.$refs.model.showModel("","获取信息中",false,2)
				try{
					let data = await pilotData()
					if(data.code==1){
						this.basics = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			},
			goTo() {
				uni.redirectTo({
					url: "../pilot-page/pilot-page?chooseFoot=1"
				});
			},
			radioGroupChange() {
				//console.log(this.helpSubject)
			},
			chooseDate(e) {
				console.log(e)
				let time = new Date(e.year, e.month, e.day)
				let date = new Date
				let day = date.getDate()
				let nowHours = date.getHours()+1
				let hours = []
				let i = e.day>day?6:nowHours
				while(i<23){
					hours.push({
						value: i,
						label: i + "时"
					})
					i++
				}
				this.$set(this.timeList, 0, hours)
				
				this.$set(this.helpTimeArray, "year", e.year)
				this.$set(this.helpTimeArray, "month", e.month)
				this.$set(this.helpTimeArray, "day", e.day)
				this.$set(this.helpTimeArray, "week", e.week)
				//console.log(this.helpTimeArray)
			},
			chooseTime(e) {
				this.$set(this.helpTimeArray, "hours", e[0].value)
				this.$set(this.helpTimeArray, "minutes", e[1].value)
				//console.log(this.helpTimeArray)
			},
			canSubmit() {
				if (this.helpTimeArray.year != undefined && this.helpTimeArray.hours != undefined && this.helpSubject != "" && this
					.helpAddress != "" && this.helpDetail != "") {
					return true
				} else {
					return false
				}
			},
			async submit() {
				this.$refs.model.showModel("","提交中...",false,2,"")
				
				let time = new Date(this.helpTimeArray.year,this.helpTimeArray.month-1,this.helpTimeArray.day,this.helpTimeArray.hours,this.helpTimeArray.minutes)
				let params = {
					helperName:this.basics.name,
					helpSubject:this.helpSubject,
					helperCollege:this.basics.college,
					helpTime: parseInt(time.getTime()/1000),
					helpAddress:this.helpAddress,
					helpDetail:this.helpDetail
				}
				try{
					let data = await postMessage(params)
					if(data.code==1){
						this.submitYes = true
						this.$refs.model.showModel("checkmark-circle","提交成功",true,1,"")
					}
					else{
						this.$refs.model.hideModel()
					}
				}catch(e){
					//TODO handle the exception
				}finally{
					this.$refs.model.hideModel()
				}
			},
			returnDate(type){
				if(type==1&&this.helpTimeArray.year != undefined){//年月日/星期
					return `${this.helpTimeArray.year}/${this.helpTimeArray.month}/${this.helpTimeArray.day} ${this.helpTimeArray.week}`
				}
				else if(type==1){
					return "选择互助日期"
				}
				if(type==2&&this.helpTimeArray.hours != undefined){
					return `${this.helpTimeArray.hours}:${this.helpTimeArray.minutes<10?"0"+this.helpTimeArray.minutes:this.helpTimeArray.minutes}`
				}
				else{
					return "选择互助时间"
				}
			},
			makeCal(){//制作日历
				let date = new Date()
				this.yearNow = date.getFullYear()
				let month = date.getMonth()+1
				let day = date.getDate()
				let nowHours = date.getHours()+1
				if(nowHours>22){
					day++
					nowHours=6
					//nowMinutes = 0
				}
				// if(nowHours<6){
				// 	nowHours=6
				// }
				this.dateNow = date.toLocaleDateString()
				//let minDate = this.dateNow.replace(/\//g, '-')
				let minDate = `${this.yearNow}-${month}-${day}`
				let maxDate = new Date(date.getTime() + 2592000000)
				let maxDateString = maxDate.toLocaleDateString()
				maxDateString = maxDateString.replace(/\//g, '-')
				this.minDate = `${this.yearNow}-${month}-${day}`
				this.maxDate = maxDateString
				//做时间选择
				let hours = []
				hours[1] = new Array(0)
				for (let i = 0; i < 60; i++) {
					let min = i<10?`0${i}`:i
					hours[1].push({
						value: i,
						label: min + "分"
					})
				}
				this.$set(this.timeList, 1, hours[1])
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		height: 90vh;
		overflow-y: scroll;
		padding-bottom: 40rpx;
	}

	.body {
		background-color: white;
		width: 95%;
		margin-left: 2.5%;
		box-shadow: 1px 3px 8px 3px #C0C0C0;
		padding-bottom: 1rpx;
	}
	.buttonStyle{
		background-color: #e249af;
		border-color:#e249af
	}

	.data-item {
		.text {
			justify-content: flex-start;

			.uImage {
				margin-left: 40rpx;
			}

			.name-college {
				margin: 20rpx 0 20rpx 40rpx;
				display: flex;
				flex-direction: column;
				font-size: 32rpx;

				.subject {
					justify-content: flex-start;
					flex-wrap: wrap;
				}

			}
		}
	}

	.help-title {
		color: white;
		font-size: 18px;
		background-color: $title-background-color;
		height: $title-height;
		padding-left: 40rpx;
		justify-content: left;
	}

	.help-text {
		padding: 40rpx;
		font-size: 18px;

		.state {
			font-size: 0.7rem;
			margin-top: 40rpx;
		}
	}

	.help-time {
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;

		p {
			width: 35vw;
		}
	}

	.choose-time-day {
		display: flex;
		width: 85vw;
		justify-content: space-between;
	}

	.choose-res {
		display: flex;
		justify-content: space-between;
		width: 85vw;
		margin-top: 40rpx;

		.date {
			min-width: 40vw;
		}
	}

	.u-field {
		padding: 0 !important;
	}
	
	.btn{
		margin-top: 40rpx;
	}
	
	.publish-state{
		color: $title-background-color;
		margin-left: 44rpx;
		font-size: 1rem;
		margin-bottom: 20rpx;
	}
</style>
