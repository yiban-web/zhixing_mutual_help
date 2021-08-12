<template>
	<view>
		<pageHead @goTo="goTo" :title="title"></pageHead>
		<model ref="model" @reload="importData()"></model>
		<!-- 选择帮扶科目 -->
		<view class="choose-subject" v-if="pageType==0">
			<text>选择帮扶科目</text>
			<view class="item">
				<uCheckBoxGroup>
					<uCheckBox v-for="(value,key) in subjects"  :key="key"
					shape="circle" v-model="subjects[key]" :active-color='textColor' size=40
					 label-color="white" label-size="0.8rem">{{key}}</uCheckBox>
				</uCheckBoxGroup>
			</view>
		</view>
		<view class="body">
			<!-- 搜索添加 -->
			<view v-if="pattern==0">
				<view class="searchPoilt">
					<view>姓名</view>
					<view>
						<input type="text" placeholder="请输入姓名" @input='searchImportPoiltData' v-model="searchName">
					</view>
					<view @click="goback">返回</view>
				</view>
				<poiltSearchCard :searchData='searchResult' :highlight="searchName" @chooseThis="addPoilt" @hideModel="hideModel"/>
				<!-- <view v-for="(item,index) in searchResult" @click="addPoilt(item)" :key="index">
					<poiltSearchCard :searchData='item' :highlight="searchName" />
				</view> -->
			</view>
			<!-- 显示已选择，即将要添加的学生 -->
			<veiw v-if="pattern==1">
				<poiltImportCard v-for="(item,index) in addPoiltData.poiltData" :importData='item' :index="index" @deleteItem="deleteImportData" />
				<view class="addPoiltButton" v-if="addPoiltData.poiltData.length<5">
					<!-- 添加按钮点击后切换为搜索添加模式 -->
					<view @click="addPoiltBtn">
						<view>
							<uIcon name="plus-circle" :color='textColor' size="4vh"></uIcon>
							<text>点此添加</text>
						</view>
						<view>
							<text>（注：一次最多添加5次）</text>
						</view>
					</view> 
				</view>
				<view class="submitBtn" v-if="addPoiltData.poiltData.length>0">
					<view @click="submit" v-show="subBtn">确认</view>
					<view @click="reloadPage" v-show="!subBtn">再次导入</view>
				</view>
			</veiw>
		</view>
	</view>
</template>

<script>
	import back from '../../components/rank-background/rank-background.vue';
	import uCheckBoxGroup from 'uview-ui/components/u-checkbox-group/u-checkbox-group.vue';
	import uCheckBox from 'uview-ui/components/u-checkbox/u-checkbox.vue';
	import poiltSearchCard from '../../components/search-poilt-data-card/search-poilt-data-card.vue'
	import poiltImportCard from '../../components/import-poilt-data-card/import-poilt-data-card.vue'
	import {
		importPoilt,addStu,searchImportPoilt
	} from "../../service/manager.js"

	export default {
		components: {
			back,
			uCheckBoxGroup,
			uCheckBox,
			poiltSearchCard,
			poiltImportCard
		},
		onLoad(option) {
			this.pageType = option.type
			this.pageType==0?this.title = "导入朋辈互助员":this.title="导入学困生"
			console.log(this.pageType)
		},
		methods: {
			hideModel(){
				console.log(2)
				this.$refs.model.hideModel()
			},
			goTo() {
				uni.redirectTo({
					url: "../manager-page/manager-page?chooseFoot=1"
				})
			},
			async searchImportPoiltData() {
				if (this.searchName) //如果搜索名字不为空就发送请求
				{
					try {
						/* uni.showLoading({
							title: '加载中......'
						}); */
						this.$refs.model.showModel("", "搜索中...", false, 2, "")
						let searchResultData = await searchImportPoilt({
							'name': this.searchName
						});
						if (searchResultData.code == 1) //申请数据成功
						{
							this.searchResult = new Array(0)
							for(let i=0;i<searchResultData.data.length;i++){
								this.$set(this.searchResult,i,searchResultData.data[i])
							}
						    //console.log(this.searchResult)
						}
							//this.searchResult = searchResultData.data;
						else
						this.$refs.model.hideModel()
							/* uni.showToast({
								title: '加载失败',
								icon: 'none',
								duration: 2000
							}); */
					} catch (e) {
						this.$refs.model.hideModel()
						return
						uni.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						});
					}
					//this.hideModel()
					let this2 = this
					setTimeout(()=>{
						this2.hideModel()
					},1000)
				}
				else{
					this.searchResult = new Array(0)
				}
			},
			addPoilt(chooseItem) {
				//查看选择的学生是否被选择过
				for (let i of this.addPoiltData.poiltData) {
					if (chooseItem.stuNum == i.stuNum) //该同学已经被添加到将要提交的导入数据数组中
					{
						this.$refs.model.showModel("", "该同学已选择了哦", true, 1);
						return;
					}
				}
				//该同学未选中，将其添加，并返回添加模式
				this.addPoiltData.poiltData.push(chooseItem);
				this.pattern = 1;
				this.searchResult = [];
				this.searchName = "";
			},
			addPoiltBtn() {
				if(this.pageType==1){
					this.pattern = 0
					return
				}
				if (this.subjects['英语'] == false && this.subjects['高数'] == false &&
					this.subjects['大物'] == false && this.subjects['工图'] == false &&
					this.subjects['其他'] == false) //查看是否选择了科目
					this.$refs.model.showModel("", "请选择科目", true, 1);
				else
					this.pattern = 0;
			},
			deleteImportData(index) {
				//删除选中的某个学生
				this.addPoiltData.poiltData.splice(index, 1);
			},
			async importData() {
				try {
					this.$refs.model.showModel("", `导入中.....`, false, 1);
					let result = {}
					if(this.pageType==0){
						for (let i = 0; i < this.addPoiltData.poiltData.length; i++) {
							this.addPoiltData.poiltData[i]['helpSubject'] = [];
							for (let j in this.subjects) {
								if (this.subjects[j] == true) //被选择的科目
									this.addPoiltData.poiltData[i]['helpSubject'].push(j)
							}
						}
						result = await importPoilt(this.addPoiltData)
					}
					else{
						let param = []
						for(let i=0;i<this.addPoiltData.poiltData.length;i++){
							param[i] = new Object()
							param[i].name=this.addPoiltData.poiltData[i].helperName
							param[i].stuNum = this.addPoiltData.poiltData[i].stuNum
						}
						result = await addStu({
							stuData:param
						})
					}
					//let result = await importPoilt(this.addPoiltData)
					if (result.code == 1){
						this.$refs.model.showModel("", `导入成功`, true, 1);
						this.subBtn = false
						return
					}
				} catch (e) {
					this.$refs.model.showModel("","",true,6,getApp().globalData.errorImg)
					return
				}
				this.hideModel()
				
				
			},
			reloadPage(){
				uni.redirectTo({
					url: "../import-friend-data/import-friend-data?type="+this.pageType
				})
			},
			goback() {
				this.pattern = 1;
				this.searchResult = [];
				this.searchName = "";
			},
			submit() {
				if (this.subjects['英语'] == false && this.subjects['高数'] == false &&
					this.subjects['大物'] == false && this.subjects['工图'] == false &&
					this.subjects['其他'] == false) //查看是否选择了科目
					this.$refs.model.showModel("", "请选择科目", true, 1);
				//将选则的科目添加到选中的领航员的帮扶科目中
				uni.showModal({
					title: "确定导入吗",
					success: (res) => {
						if (res.confirm) {
							this.importData()
						}
					}
				})
			}
		},
		data() {
			return {
                textColor:this.$root.buttonColor,
				'searchName': "",
				'pattern': 1, //0搜索添加模式，1显示已选择学生模式
				'subjects': {
					'英语': false,
					'高数': false,
					'大物': false,
					'工图': false,
					'其他': false
				},
				'searchResult': [],
				'addPoiltData': {
					poiltData: []
				},
				title:"",
				subBtn:true,
				pageType:-1// 0为领航员 1为学困生
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 
	poiltSubject: 5vh
	*/
   
	.poiltSubject {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 3vw;
		color: white;
		background-color: #9E487F;
		padding: 1vh 0 1vh 0;
	}

	.poiltSubject>view:nth-child(2) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3vh;
		border-radius: 3vh;
		background-color: rgba(255, 255, 255, 0.9);
		padding-left: 2vw;
	}

	.addPoiltButton {
		display: flex;
		justify-content: flex-end;
		margin-top: 2vh;
	}

	.addPoiltButton>view {
		width: auto;
	}

	.addPoiltButton>view>view:nth-child(1) {
		display: flex;
		justify-content: center;
		align-items: center;
		color: $back-ground-color;
		font-size: 2vh;
	}

	.addPoiltButton>view>view:nth-child(2) {
		color: #ababab;
		font-size: 1.5vh;
	}

	.searchPoilt {
		position: relative;
		display: flex;
		justify-content: left;
		align-items: center;
		padding: 1vh 1vw 0vh 1vw;
	}

	.searchPoilt>view:nth-child(1) {
		height: 100%;
		background-color: $back-ground-color;
		color: white;
		padding: 1vh 10vw 1vh 10vw;
	}

	.searchPoilt>view:nth-child(2) {
		background-color: #F2F2F2;
		padding: 1vh 1vw 1vh 4vw;
		height: 100%;
		flex-grow: 1;
	}

	.searchPoilt>view:nth-child(3) {
		background-color: #4f6dce;
		color: white;
		padding: 1vh 4vw 1vh 4vw;
	}

	.submitBtn {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		margin: 4vh 0 8vh 0;
	}

	.submitBtn>view {
		background-color: $back-ground-color;
		font-size: 2vh;
		border-radius: 4vh;
		padding: 1vh 10vw 1vh 10vw;
	}

	.choose-subject {
		padding: 40rpx 20rpx;
		background-color: $grey-background;
		width: 100vw;

		p {
			font-size: 1rem;
		}

		.item {
			margin-top: 20rpx;
		}
	}
</style>
