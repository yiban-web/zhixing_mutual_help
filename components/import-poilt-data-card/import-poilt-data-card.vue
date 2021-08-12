<template>
		<view class="importPoiltData">
			<view class="line">
				<view>姓名</view>
				<view>{{importData.helperName}}</view>
			</view>
			<view class="line">
				<view>学号</view>
				<view><text>{{importData.stuNum}}</text></view>
			</view>
			<view class="line">
				<view>班级</view>
				<view>{{importData['class']}}</view>
			</view>
			<view class="line">
				<view>学院</view>
				<view>{{importData.helperCollege}}</view>
			</view>
			<view class="delete" @click="deleteItem(index)">
				<uIcon name="minus-circle-fill" :color="textColor" size="10vw"></uIcon>
			</view>
		</view>
</template>

<script>
	export default{
		props:{
			importData:{
				type:Object,
				require:true,
				default:{}
			},
			index:{
				type:Number,
				require:true
			}
		},
        data(){
          return{
              textColor:this.$root.buttonColor
          }  
        },
		methods:{
			deleteItem(index){
				this.$emit('deleteItem',index);
			}
		}
	}
</script>

<style scoped lang="scss">
	/* 
	 componentHeight: 17vh
	 */
	.importPoiltData{
		position: relative;
		width: 100%;
		padding: 0.5vh;
	}
	.line{
		font-size: 2vh;
		line-height: 4vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.line:nth-child(1)>view:nth-child(1),
	.line:nth-child(3)>view:nth-child(1){
		background-color: $back-ground-color;
	}
	.line:nth-child(2)>view:nth-child(1),
	.line:nth-child(4)>view:nth-child(1){
		background-color: #4f6dce;
	}
	.line:nth-child(1)>view:nth-child(2),
	.line:nth-child(3)>view:nth-child(2){
		background-color: #F2F2F2;
	}
	.line:nth-child(2)>view:nth-child(2),
	.line:nth-child(4)>view:nth-child(2){
		background-color: #F9F9F9;
	}
	.line>view:nth-child(1){
		color: white;
		flex-grow: 0;
		padding: 0 10vw 0 10vw;
		letter-spacing: 1vw;
	}
	.line>view:nth-child(2){
		width: auto;
		flex-grow: 1;
		padding: 0 0 0 8vw;
		letter-spacing: 1vw;
	}
	.delete{
		position: absolute;
		right: 0;
		top:0;
	}
	.textHightlight{
		color: #EE836C;
	}
</style>