<template>
	<view>
		<view class="header">
			<view class="zhongxin">
				<view>
					<!-- <image src="../../static/tabBar/Android1080_1882.png" mode=""></image> -->
					<cover-view>
						<cover-image class="cover-image" v-show="loginInfo.avatarUrl" :src="loginInfo.avatarUrl"></cover-image>
					</cover-view>
				</view>
			</view>
			<text v-show="loginInfo.id">{{loginInfo.nickName}}</text>
			<button v-show="!loginInfo.id" class="btn_1" type="primary" plain="true" @getuserinfo="queren" open-type="getUserInfo">点击登录账号</button>
		</view>
		<uni-notice-bar v-if="!loginInfo.id" showIcon="true" text="您还没有登录,请点击上方登录按钮进行登录"></uni-notice-bar>
		<view class="huobi">
			<view @click="go('/pages/my/yongJinList')">
				<view class="jinge">
					{{loginInfo.kickback}}
				</view>
				<view class="text">
					现金货币
				</view>
			</view>
			<view  @click="go('/pages/my/jifen')">
				<view class="jinge">
					{{loginInfo.credit ? loginInfo.credit : 0}}
				</view>
				<view class="text">
					积分货币
				</view>
			</view>
		</view>
		<!-- <view class="box_1">
			<button type="default">
				提现
			</button>
			<button type="default">
				充值
			</button>
		</view> -->
		
		<uni-list class="box_2">
			<!-- <uni-list-item title="钱包" @click="go('/pages/my/qianBao')"/> -->
			<!-- <uni-list-item title="商品" @click="go('/pages/my/shangPin')"/> -->
			<uni-list-item title="购物车" @click="go('/pages/my/gouWuChe')"/>
			<uni-list-item title="订单" @click="go('/pages/myOrder/orderList')"/>
			<uni-list-item title="推广" @click="go('/pages/tuiGuang/guiGuangMa')"/>
			<uni-list-item title="会员" @click="go('/pages/my/huiyuan')"/>
			<uni-list-item title="关于我们" @click="go('/pages/AboutUs/AboutUs')"/>
			<!-- <button type="default" open-type="share">分享</button> -->
		</uni-list>
		
		<view class="banben">
			当前版本 1.0.3
		</view>
		
		<!-- <button class="tuichu" type="warn">安全退出</button> -->
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
 	export default {
		data() {
			return {
				jujue:false,	//拒绝授权
			}
		},
		computed:{
			...mapState({
				loginInfo:state=>state.loginInfo
			})
		},
		methods:{
			...mapActions({
				loginwx:"loginwx",
			}),
			queren(e){
				if(!e.detail.userInfo){
					this.jujue = true
				}else{
					this.loginwx()
				}
			},
			go(path){
				if(!this.loginInfo.id){
					uni.showToast({
						icon:'none',
						title:'请先登录'
					})
				}else{
					uni.navigateTo({
						url:path
					})
				}
			},
			getUser(){
				this.$http(`/api/user/${this.loginInfo.id}`).then(res=>{
					console.log(res)
					this.loginInfo.credit = res.data.credit
					this.loginInfo.kickback = res.data.kickback
				})
			}
		},
		mounted() {
			var this_1 = this
			// getSystemInfo
		},
		onShow(){
			if(this.loginInfo.id){
				this.getUser()
			}
		},
		onLoad(option) {
			console.log('获取页面参数',option)
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				return {
					title: '分享标题2',
					path: '/pages/my/personalCenter?id=123'
				};
				console.log('分享详情',res.target);
			}
			return {
				// title: '分享标题',
				path: '/pages/my/personalCenter?id=123'
			};
		}
		
	}
</script>

<style scoped lang="scss">

@import 'personalCenter.scss';
</style>
