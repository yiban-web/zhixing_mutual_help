import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import vueQr from 'vue-qr';
import uImage from "uView-ui/components/u-image/u-image.vue";
import uButton from "uView-ui/components/u-button/u-button.vue";
import model from "components/model/model.vue" //模态框
import uTabs from "uView-ui/components/u-tabs/u-tabs.vue"
import {
	uIcon
} from "uView-ui/components/u-icon/u-icon.vue";
import personalData from "components/personal-data/personal-data.vue" //个人信息
import pageHead from "components/page-head/page-head.vue" //头部

const url = "http://192.168.1.117:8888"
Vue.component('uImage', uImage)
Vue.component('uButton', uButton)
Vue.component('uIcon', uIcon)
Vue.component('model', model)
Vue.component('uTabs', uTabs)
Vue.component('personalData', personalData)
Vue.component('pageHead', pageHead)

Vue.use(uView);
Vue.use(vueQr);


Vue.config.productionTip = false

Vue.prototype.successColor = "#7F2F62" //模态框正确对勾颜色
Vue.prototype.buttonColor = "#35488A" //按钮背景，文字颜色

Vue.prototype.stateText = function(state) { //状态码变换文本
	state = parseInt(state)
	switch (state) {
		case 1:
			return "未开始";
		case 2:
			return "正在进行";
		case 3:
			return "已结束";
	}
	return "1231"
}

Vue.prototype.stateColor = function(state) {
	state = parseInt(state)
	switch (state) {
		case 1:
			return "#35488A";
		case 2:
			return "rgb(244,165,149)";
		case 3:
			return "#909399"
	}
	return "white"
}
Vue.prototype.stateColorRgb = function(state) {
	state = parseInt(state)
	switch (state) {
		case 1:
			return "rgba(53,72,138,0.3)";
		case 2:
			return "rgba(244,165,149,0.3)";
		case 3:
			return "rgba(144,147,153,0.3)";
	}
	return "white"
}
Vue.prototype.applyStateText = function(state) { //状态码变换文本
	state = parseInt(state)
	switch (state) {
		case 1:
			return "待审核";
		case 2:
			return "申请通过";
		case 3:
			return "未通过"
	}
}

Vue.prototype.applyStateColorBg = function(state) {
	state = parseInt(state)
	switch (state) {
		case 1:
			return "rgba(53,72,138,0.3)";
		case 2:
			return "rgba(112,175,179,0.3)";
		case 3:
			return "rgba(244,165,149,0.3)"
	}
	return "black"
}
Vue.prototype.applyStateColor = function(state) {
	state = parseInt(state)
	switch (state) {
		case 1:
			return "rgba(53,72,138)";
		case 2:
			return "rgba(112,175,179)";
		case 3:
			return "rgba(244,165,149)"
	}
	return "black"
}
Vue.prototype.adType = function(state) { //状态码变换文本
	state = parseInt(state)
	switch (state) {
		case 6:
			return "二级管理员";
		case 7:
			return "一级管理员";
		case 8:
			return "超级管理员"
	}
}
Vue.prototype.recoverTime = function(data) { //时间戳变时间
	let date = new Date(data * 1000)
	let res = new Array(3)
	let minutes = date.getMinutes()
	minutes = minutes < 10 ? "0" + minutes : minutes
	res[0] = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
	res[1] = "星期" + (this.numUtf8(date.getDay() + 1))
	res[2] = "时间" + date.getHours() + ":" + minutes
	return res
}
Vue.prototype.numUtf8 = function(num) {
	switch (num) {
		case 1:
			return "一";
		case 2:
			return "二";
		case 3:
			return "三";
		case 4:
			return "四";
		case 5:
			return "五";
		case 6:
			return "六";
		case 7:
			return "日";
	}
}

App.mpType = 'app'



const app = new Vue({
	...App
})
app.$mount()
