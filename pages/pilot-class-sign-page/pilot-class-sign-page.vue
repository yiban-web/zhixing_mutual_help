<template>
	<view>
		<model ref="model"></model>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<view class="main">
			<view class="body">
				<datail :helpDatail="helpDatail" :type="2"></datail>
				<view class="caozuo-btn vertical-center">
					<uButton :custom-style="customStyle" @click="btnFunction">{{btnWord}}</uButton>
					<uButton :custom-style="customStyle2" @click="beginCanvas" >生成二维码签到</uButton>
					<!-- <p class="word" @click="beginCanvas">生成二维码签到</p> -->
				</view>
				<view>
					<view class="sign-case vertical-center" >
						<p>报名状况</p>
						<p class="reload" v-show="classState!=3" @click="getData">刷新数据</p>
					</view>
					<stuHead :user="helpDatail.applyPeople" :type="1"></stuHead>
				</view>
				<view>
					<view class="sign-case vertical-center">
						<p>已签到人数</p>
					</view>
					<stuHead :user="helpDatail.signPeople" @leaveClass="leaveClass" :type="2"></stuHead>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	//要生成帮扶记录 18
	import {signQRCode,startCount,endCount,lookMyclassData,leaveClassApi} from "../../service/pilot.js"
	import stuHead from "../../components/stu-head/stu-head.vue"
	import datail from "../../components/class-datail/class-datail.vue"
	import QR from './wxqrcode.js'
	export default {
		components: {
			stuHead,
			datail
		},
		data() {
			return {
				helpDatail: {},
				btnWord:"",
				canvasUrl:"",
				classState:-1,
				title:"我的课程",
				customStyle: {
					marginTop: "60rpx",
					width: "40vw",
					color: "white",
					backgroundColor: this.$root.buttonColor,
					fontSize: "1rem",
				},
				customStyle2: {
					marginTop: "60rpx",
					width: "40vw",
					color: this.$root.buttonColor,
					backgroundColor: "white",
					fontSize: "1rem",
				},
				codeData: [{
					type: 'qr',
					content: '',
					width: 130,
					height: 130,
					x: 0,
					y: 0,
				}, ]
			};
		},
		
		methods: {
			goTo() {
				uni.redirectTo({
				    url: '../pilot-page/pilot-page?chooseFoot=2'
				});
			},
			async leaveClass(userId){
				try {
					let data = await leaveClassApi({
						helpClassId: this.helpDatail.helpClassId,
						userId: userId
					})
					if (data.code == 1) {
						this.$refs.model.showModel("checkmark-circle", "离开成功", true, 1)
						this.getData()
						
					}
				} catch (e) {
					//TODO handle the exception
					this.$refs.model.showModel("close-circle", "操作失败", true, 1)
					return
				}
			},
			stateColor(state) {
				switch (state) {
					case 1:
						return this.$root.buttonColor;
					case 2:
						return "red";
					case 3:
						return "#909399"
				}
				return "black"
			},
			async beginCanvas() {
				if(this.classState==3){
					this.$refs.model.showModel("", "课程已结束\n无法签到", true, 1)
					return
				}
				this.$refs.model.showModel("","加载中",false,2,"")
				try{
					let code = await signQRCode({
						helpClassId:this.helpDatail.helpClassId
					})
					if(code.code==1){
						this.codeData[0].content = code.signCode
						this.drawQR(code.signCode)
					}
				}catch(e){
					this.$refs.model.hideModel()
				}finally{
					
				}
				
			},
			drawQR (code) {//绘制二维码
				let qr = QR.createQrCodeImg(code, {  
					size: parseInt(300)  
				});
				this.$refs.model.showModel("","",true,5,qr)
			},
			btnFunction(){
				if(this.helpDatail.isCreateRecord==1){//已经有帮扶记录
					uni.redirectTo({
						url:`../pilot-creat-record/pilot-creat-record?data=${encodeURIComponent(JSON.stringify(this.helpDatail))}`
					})
				}
				switch(this.classState){
					case 1:this.confirm(1);break//开始计时
					case 2:this.confirm(2);break;//结束计时
					case 3:uni.navigateTo({//生成报告
					    url: '../pilot-creat-record/pilot-creat-record?data='+encodeURIComponent(JSON.stringify(this.helpDatail))
					});break
				}
				
			},
			confirm(state){//计时二次确认
				let text=state==1?"确认开始计时?":"确认结束计时?"
				let this2 = this
				uni.showModal({
				    content: text,
				    success: function (res) {
				        if (res.confirm) {
				            state==1?this2.startCount():this2.endCount()
				        } else if (res.cancel) {
				            //console.log('用户点击取消');
				        }
				    }
				});
			},
			async startCount(){//开始计时
				this.$refs.model.showModel("","开始计时中",false,2,"")
				try{
					let data = await startCount({
						startTime: parseInt(new Date().getTime()/1000),
						helpClassId:this.helpDatail.helpClassId
					})
					if(data.code==1){
						this.classState = 2
					}
				}catch(e){
					//TODO handle the exception
				}finally{
					this.$refs.model.hideModel()
				}
				
				
			},
			async endCount(){
				this.$refs.model.showModel("","结束计时中",false,2,"")
				try{
					let data = await endCount({
						helpClassId:this.helpDatail.helpClassId
					})
					if(data.code==1){
						this.classState = 3
					}
				}catch(e){
					//TODO handle the exception
				}finally{
					this.$refs.model.hideModel()
				}
				
			},
			btnWordChange(state){
				switch(state){
					case 1:this.btnWord="开始计时";break
					case 2:this.btnWord="结束计时";break;
					case 3:this.btnWord="生成互助记录";break
				}
			},
			async getData(){
				try{
					this.$refs.model.showModel("", "加载中...", false, 2, "")
					let data = await lookMyclassData({
						helpClassId:this.helpDatail.helpClassId,
					})
					if(data.code==1){
						this.helpDatail = data.data
					}
				}catch(e){
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.$refs.model.hideModel()
			}
		},
		async mounted() {
			await this.getData()
			this.classState = this.helpDatail.helpState
			this.btnWordChange(this.classState)
		},
		onLoad(option) {
			this.$set(this.helpDatail,"helpClassId",option.helpClassId)
			//this.helpDatail.helpClassId
			
		},
		watch:{
			classState:function(val,oldVal){
				this.btnWordChange(val)
				this.helpDatail.helpState = val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		background-color: $grey-background;
		p {
		margin-bottom: 20rpx;
	}
	}

	.body {
		background-color: white;
		width: 95%;
		margin-left: 2.5%;
		box-shadow: 1px 3px 8px 3px #C0C0C0;
		padding-bottom: 20rpx;
	}

	.text {
		color: $u-content-color;
		font-size: 1rem;
	}

	.class-data {
		padding: 40rpx;

		.subject {
			display: flex;
			justify-content: space-between;
		}

		.class-time {
			display: flex;
		}

		.help-time {
			display: flex;
			flex-wrap: wrap;
			align-content: space-around;
			width: 50vw;

		}
	}

	

	.caozuo-btn {
		justify-content: space-around;
		margin-bottom: 20rpx;
		.word {
			color: $title-background-color;
			text-align: center;
			font-size: 1rem;
			margin-top: 20rpx;
		}
	}
	
	.sign-case{
		height: $title-height;
		background-color: $yellow-background;
		padding-left: 40rpx;
		width: 100%;
		justify-content: flex-start;
		align-items: center;
		p{
			font-size: 1.1rem;
			margin-bottom: 0;
		}
		.reload{
			margin-left: 50vw;
			font-size: 0.9rem;
			border-bottom: 1px solid #82848a;
			color: #82848a;
		}
	}
</style>
