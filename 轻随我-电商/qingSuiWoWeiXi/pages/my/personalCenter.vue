<template>
	<view class="personalCenter">
		<view class="box-1">
			<view class="t1">
				<view class="touxiang">
					<i class="iconfont icon iconrexiao-huangguan"></i>
					<image v-if="loginInfo.avatarUrl" :src="loginInfo.avatarUrl" mode="aspectFill"></image>
				</view>
				<view v-show="!loginInfo.id" class="btn-2">
					<button  class="btn-denglu" plain="true" @getuserinfo="queren" open-type="getUserInfo">点击登录账号</button>
				</view>
				<view v-if="loginInfo.id" class="name">
					<text v-if="!xiugaiNickName">{{loginInfo.nickName}}</text>
					<input v-if="xiugaiNickName" type="text" v-model="NickName_2" />
					<!-- <i v-if="!xiugaiNickName" @click="xiugai_1()" class="icon iconfont iconxiugai"></i>
					<i v-if="xiugaiNickName" @click="tijiao_1()" class="icon iconfont iconxuanzhong"></i>
					<i v-if="xiugaiNickName" @click="xiugaiNickName=false" class="icon iconfont iconshanchu"></i> -->
				</view>
				<view class="btn-1" @click="go('/pages/address/address')">
					设置收货地址 >
				</view>
			</view>
			<view class="t2">
				<view class="">
					<text>0</text>
					<view class="">
						收藏
					</view>
				</view>
				<view class="">
					<text>0</text>
					<view class="">
						点赞
					</view>
				</view>
				<view class="">
					<text>0</text>
					<view class="">
						浏览记录
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-2">
			<view class="" @click="go('/pages/my/gouWuChe')">
				<icon class="icon iconfont iconqicheqianlian-"></icon>
				<text>购物车</text>
			</view>
			<view class="" @click="go('/pages/myOrder/orderList')">
				<icon class="icon iconfont icondingdan"></icon>
				我的订单
			</view>
		</view>
		
		<view class="box-3">
			<view class="" @click="go('/pages/my/huiyuan')">
				<i class="icon iconfont icontubiao-"></i>
				<text>我的团队</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
			<view class="" @click="go('/pages/my/yongJinList')">
				<i class="icon iconfont iconyue"></i>
				<text>余额提现</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
			<view class="" @click="go('/pages/my/jifen')">
				<i class="icon iconfont iconjifen1"></i>
				<text>积分转账</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
			<view class="" @click="go('/pages/tuiGuang/guiGuangMa')">
				<i class="icon iconfont iconscan-fill"></i>
				<text>我的扫码</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
		</view>
		<view class="box-3">
			<view class="" @click="go('/pages/fankui/fankui')">
				<i class="icon iconfont iconxinxi-copy"></i>
				<text>向CEO提意见</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
		</view>
		
		<!-- <view class="huobi">
			<view @click="go('/pages/my/yongJinList')">
				<view class="jinge">
					{{loginInfo.kickback ? loginInfo.kickback : 0}}
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
		</view> -->
		
		<!-- <uni-list class="box_2">
			<uni-list-item title="购物车" @click="go('/pages/my/gouWuChe')"/>
			<uni-list-item title="订单" @click="go('/pages/myOrder/orderList')"/>
			<uni-list-item title="推广" @click="go('/pages/tuiGuang/guiGuangMa')"/>
			<uni-list-item title="会员" @click="go('/pages/my/huiyuan')"/>
			<uni-list-item title="收货地址" @click="go('/pages/address/address')"/>
			<uni-list-item title="关于我们" @click="go('/pages/AboutUs/AboutUs')"/>
		</uni-list> -->
		
		<view class="banben">
			当前版本 1.0.7
		</view>
		<!-- <button class="tuichu" type="warn">安全退出</button> -->
	</view>
</template>

<script>
	import {mapState,mapActions} from "vuex"
 	export default {
		data() {
			return {
				xiugaiNickName:false,
				NickName_2:'',	
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
				console.log(e)
				if(!e.detail.userInfo){
					this.jujue = true
				}else{
					this.loginwx()
				}
			},
			xiugai_1(){
				this.NickName_2=this.loginInfo.nickName
				this.xiugaiNickName=true
			},
			tijiao_1(){
				console.log('提交')
				var user = Object.assign({},this.loginInfo)
					user.nickName = this.NickName_2
				delete user.createdAt
				delete user.deletedAt
				delete user.updatedAt
				uni.showLoading({
					title:'加载中',
				})
				this.xiugaiNickName = false
				this.$http(`/api/user/${this.loginInfo.id}`,user,'PUT').then(x=>{
					if(x.code===0){
						this.getUser()
					}else{
						uni.showToast({
							title:'修改失败，请联系管理员',
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'网络异常，稍后再试',
						icon:'none'
					})
				})
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
			goTabBar(path){
				uni.switchTab({
					url:path
				})
			},
			getUser(){
				this.$http(`/api/user/${this.loginInfo.id}`).then(res=>{
					console.log(res)
					if(res.code===0){
						this.loginInfo.credit = res.data.credit
						this.loginInfo.kickback = res.data.kickback
					}
				})
			}
		},
		mounted() {
		},
		onShow(){
			if(this.loginInfo.id){
				this.getUser()
			}
		},
		// onLoad(option) {
		// 	console.log('获取页面参数',option)
		// },
		// onShareAppMessage(res) {
		// 	if (res.from === 'button') {
		// 		// 来自页面内转发按钮
		// 		return {
		// 			title: '分享标题2',
		// 			path: '/pages/my/personalCenter?id=123'
		// 		};
		// 		console.log('分享详情',res.target);
		// 	}
		// 	return {
		// 		// title: '分享标题',
		// 		path: '/pages/my/personalCenter?id=123'
		// 	};
		// }
		
	}
</script>

<style scoped lang="scss">
@import 'personalCenter.scss';
</style>
