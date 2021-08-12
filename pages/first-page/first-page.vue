<template>
	<view class="" style="">
        <!-- 模态框 -->
		<model ref="model"></model>
        <!-- 状态栏占位 -->
		<view class="status_bar">
		</view>
        <!-- 标题 -->
		<view class="page-title vertical-center">
			<p>{{pageTitle}}</p>
		</view>
		<view class="main">
            <!-- 国际工学院图标 -->
            <view class="college-logo horizontal-center">
                <img :src="collge_logo"/>
                <text>西安理工大学•国际工学院</text>
                <text>INTERNATIONAL ENGINEERING COLLEGE OF XIAN UNIVERSITY OF TECHNOLOGY</text>
            </view>
            <!-- 导航 -->
			<view class="vertical-center navigation">
                <view class="navigation-list horizontal-center" v-for="(item,index) in navigation" :key="index" @click="goTo(item.nextTo,item.userType)">
                	<image :src="item.image" class="navigation-image" />
                    <p>{{item.title}}</p>
                    <p>{{item.en_title}}</p>
                </view>
            </view>
            <!-- 排行榜和申请 -->
			<view class="bottom-tabs">
                <view class="bottom-link" @click="href(1)">
                	<uIcon name="play-right-fill" :color="textColor" size="32" />
                    <text>查看学长领航员排行榜</text>
                </view>
                <view class="bottom-link" @click="href(2)">
                	<uIcon name="play-right-fill" :color="textColor" size="32" />
                    <text>查看朋辈互助员排行榜</text>
                </view>
                <view class="bottom-link" @click="href(3)">
                	<uIcon name="play-right-fill" :color="textColor" size="32" />
                    <text>还不是领航员?快速申请</text>
                </view>
                <!-- 熊猫图 -->
                <view class="panda-image" @click="goTo(manager.nextTo,manager.userType)">
                    <image src="../../static/frist-page.png" mode="scaleToFit">
                </view>
            </view>
            <view class="bottom-word">
                <!-- 联系我们 -->
                <view class="contact-us contact-us-left" @click="aboutUs()">
                    <p>关于我们</p>
                    <p>About Us</p>
                </view>
                <!-- 联系我们 -->
                <view class="contact-us contact-us-right" @click="callUs()">
                    <p>遇到问题？联系我们</p>
                    <p>Have a problem? Contact me</p>
                </view>
            </view>
		</view> 
	</view>
</template>

<script>
export default {
    data() {
        return {
            textColor:this.$root.buttonColor,
            pageTitle: "知行互助工程",
            navigation: [{
                    title: "我爱学习",
                    en_title:"I love studying",
                    image: "/static/stu.png",
                    nextTo: "../xk-pilot-page/xk-pilot-page",
                    userType: [3]
                },
                {
                    title: "我来领航",
                    en_title:"I guide the way",
                    image: "/static/pilot.png",
                    nextTo: "../pilot-page/pilot-page",
                    userType: [4, 5]
                }
            ],
            userType: 0,
            collge_logo:"/static/college_logo.png",//国际工学院图标,
            manager:{
                    nextTo: "../manager-page/manager-page",
                    userType: [6, 7, 8]
                },
                
        }
    },     
    methods: {
        aboutUs(){
            this.$refs.model.showModel("", "", true, 8)
        },
        callUs(){
            this.$refs.model.showModel("", "", true, 9)
        },
        goTo(src, type) {
            uni.redirectTo({ //navigateTo有数量限制
            	url: src
            });
            console.log("身份", uni.getStorageSync("userType"))
            //身份限制 莫删除
            // if (type.indexOf(uni.getStorageSync("userType")) != -1) {
            //     uni.redirectTo({ //navigateTo有数量限制
            //             url: src
            //         });
            // } else {
            //     this.$refs.model.showModel("", "身份验证错误", true, 3, "/static/typeNo.png")
            // }
        },
        href(type) {
            switch (type) {
                case 1:
                    uni.navigateTo({
                        url: "../rank-list/rank-list?userType=4"
                    });
                    break;
                case 2:
                    uni.navigateTo({
                        url: "../rank-list/rank-list?userType=5"
                    });
                    break;
                case 3:
                    uni.navigateTo({
                    	url: "../apply-poilt/apply-poilt"
                    });
                    //身份限制 莫删除
                    // if(uni.getStorageSync("userType")<=2||uni.getStorageSync("userType")==4){
                    //     uni.navigateTo({
                    //         url:"../apply-poilt/apply-poilt"   
                    //     });
                    // }
                    // else{
                    //     this.$refs.model.showModel("", "身份验证错误", true, 3, "/static/typeNo.png")
                    // }
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .horizontal-center{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .main {
    	height: calc(100vh - 35px - var(--status-bar-height));
    }
    .college-logo{
        padding: 3vh 0 1vh 0;
        background-color: #e1e9ec;
    }
    // 国际工学院logo大小
    .college-logo > img{
        width: 18vh;
        height: 18vh;
    }
    .college-logo > text{
        color: #808080;
        padding: 0.2vh 0 0.2vh 0;
    }
    // 国际工学院中文
    .college-logo > text:nth-child(2){
        letter-spacing: 0.4vh;
        font-size: 2.5vh;
        font-weight: 900;
    }
    // 国际工学院英文
    .college-logo > text:nth-child(3){
        font-size: 1.1vh;
        font-weight: 900;
    }
    .navigation{
        justify-content: space-evenly;
        padding: 2vh 0 2vh 0;
    }
    // 导航项
	.navigation-list {
		background-color: $back-ground-color;
		height: 52vw;
		width: 38vw;
		border-radius: 4vw;
        justify-content: space-evenly;
        padding: 2vh 0 2vh 0;
        // 导航中的文字
        p{
            color: white;
        }
        // 导航中的文字中文
		p:nth-child(2) {
			font-size: 5vw;
		}
        // 导航中的文字英文
        p:nth-child(3){
            font-size: 4vw;
        }
	}
    .navigation-image {
    	width: 20vw;
    	height: 20vw;
    }
    
    .bottom-tabs{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100vw;
        padding:0 0 0 4vw;
        height: 17vh;
        background-color: #e1e9ea;
        position: relative;
        overflow: hidden;
    }
    .panda-image{
        position: absolute;
        right: 4vw;
        bottom: -4vw;
        image{
            width: 36vw;
            height: 18vw;
        }
    }
	.bottom-link {
		color: $back-ground-color;
        font-weight: 500;
        text:nth-child(2){
            padding-left: 1vw;
            font-size: 4vw;
            font-weight: 500;
            letter-spacing: 0.5vw;
        }
	}
    
    .bottom-word{
        display: flex;
        justify-content: space-between;
        padding: 0 6vw 0 6vw;
        margin-top: 2vh;
    }
    .contact-us-right{
        text-align: right;
    }
    .contact-us-left{
        text-align: left;
    }
    .contact-us{
        color: #6c6c6c;
        p{
            margin: 0.2vh 0 0.2vh 0;
        }
        p:nth-child(1){
            letter-spacing: 0.2vh;
            font-size: 3.2vw;
        }
        p:nth-child(2){
            word-spacing: 0.2vh;
            font-size: 2.8vw;
        }
    }
    // 平板
    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px){
        // 国际工学院中文
        .college-logo > text:nth-child(2){
            letter-spacing: 0.4vh;
            font-size: 3.2vh;
            font-weight: 900;
        }
        // 国际工学院英文
        .college-logo > text:nth-child(3){
            font-size: 1.7vh;
            font-weight: 900;
        }
        .navigation-list {
            background-color: #34488a;
            height: 34vw;
            width: 43vw;
            border-radius: 4vw;
            justify-content: space-evenly;
            padding: 2vh 0 2vh 0;
            // 导航中的文字
            p{
                color: white;
            }
            // 导航中的文字中文
            p:nth-child(2) {
                font-size: 4vw;
            }
            // 导航中的文字英文
            p:nth-child(3){
                font-size: 3.5vw;
            }
        }
        .navigation-image {
            width: 15vw;
            height: 15vw;
        }
        .bottom-word{
            display: flex;
            justify-content: space-between;
            padding: 0 6vw 0 6vw;
            margin-top: 4vh;
        }
    } 
</style>
