<template>
	<view class="">
		<view class="status_bar"></view>
		
		<view class="personal">
			<view class="box-1">
				<view class="top">
					<image class="touxiang" src="/static/image/touxiang2.png" mode="aspectFill"></image>
					<view class="right">
						<view class="zhanghao">
							<text>{{userInfo.Username}}</text>
							<view class="xiugai" @click="go('/pages/my/personalInfo')">
								<image src="@/static/image/bi.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="p">
							{{userInfo.Nick ? userInfo.Nick : 'Not set'}}
						</view>
					</view>
				</view>
				<view class="p">
					Mobile：{{userInfo.Username}}
				</view>
				<view class="p">
					 Available Balance： {{userInfo.Amount}}
				</view>
			</view>
			
			<view class="box-2">
				<view class="">
					<text>Orders</text>
				</view>
				<view @click="go('/pages/my/promotion')">
					<text>Promotion</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
				<view @click="openPopup('Wallet')">
					<text>Wallet</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
				<view class="" @click="go('/pages/card/cardList')">
					<text>Bank Card</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
				<view class="">
					<text>Address</text>
				</view>
				<!-- <view class="" @click="go('/pages/my/ResetPassword')">
					<text>Account Security</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view> -->
				
				<view class="">
					<text>APP Download</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
				<view class="" @click="go('/pages/Feedback/Feedback')">
					<text>Complaints & Suggestions</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
				<view class="" @click="openPopup('About')">
					<text>About</text>
					<uni-icons type="arrowright" size="20"></uni-icons>
				</view>
			</view>
			
			<view class="btn-1 shadow" @click="tuichu()">
				Log out
			</view>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="list" v-if="popupType=='Wallet'">
					<view class="" @click="go('/pages/my/Recharge')">Recharge</view>
					<view class="" @click="go('/pages/my/withdrawal')">Withdrawal</view>
					<view class="" @click="go('/pages/my/Transactions')">Transactions</view>
				</view>
				<view class="list" v-if="popupType=='About'">
					<view class="" @click="go('/pages/about/PrivacyPolicy')">Privacy Policy</view>
					<view class="" @click="go('/pages/about/RiskAgreement')">Risk Disclosure Agreement</view>
				</view>
				<view class="btn-1" @click="$refs.popup.close()">
					Cancel
				</view>
			</view>
		</uni-popup>
		
		<newTabber />
	</view>
</template>

<script>
	import newTabber from '@/components/azidingyi/newTabber.vue'
	import { mapState , mapMutations ,mapActions } from 'vuex'
	export default {
		components:{
			newTabber
		},
		data() {
			return {
				popupType:""
			};
		},
		computed:{
			...mapState({
				userInfo:x=>x.userInfo
			})
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			...mapActions({
				getUserInfo:"getUserInfo"
			}),
			tuichu(){
				this.setItem(['userInfo',{}])
				this.setItem(['token',''])
				uni.switchTab({
					url:"/pages/home"
				})
			},
			go(url){
				uni.navigateTo({
					url:url
				})
			},
			
			openPopup(type){
				this.popupType = type
				this.$refs.popup.open()
			},
			获取游戏(){
				this.$http('/Game/Period?id=10001','').then(x=>{
					console.log(x)
				}).catch(err=>{
					console.log(err)
				})
			}
		},
		onLoad() {
			// this.获取游戏()
		},
		onHide() {
			this.$refs.popup.close()
		},
		onShow() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss" scoped>
.personal{
	padding: 10px;
}
.box-1{
	background: #009688;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	border-radius: 1vw;
	color: #fff;
	padding: 12px;
	.top{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8px;
	}
	.touxiang{
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		border-radius: 100%;
		margin: 0px 10px 0px 0px;
	}
	.right{
		flex: 1;
		display: flex;
		flex-direction: column;
		// align-items: center;
		justify-content: space-between;
	}
	.zhanghao{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.xiugai{
			width: 25px;
			height: 25px;
			background: #fff;
			border-radius: 100%;
			box-sizing: border-box;
			padding: 5px;
			image{
				width: 100%;
			}
		}
	}
	.p{
		margin: 7px 0px 0px;
		font-size: 14px;
	}
}

.box-2{
	margin-top: 15px;
	padding: 0px 10px;
	background: #fff;
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	color: #212121;
	font-size: 14px;
	>view{
		display: flex;
		height: 42px;
		justify-content: space-between;
		align-items: center;
	}
	>view:not(:nth-child(1)){
		border-top: 1px solid #eee;
	}
}

.btn-1{
	background: #FFFFFF;
	line-height: 42px;
	font-size: 14px;
	margin: 15px 0px 55px;
	text-align: center;
}

.popup-box {
		text-align: center;

		.list {
			background: #fff;
			margin: 10px 10px 10px;
			line-height: 48px;
			border-radius: 5px;

			view:not(:nth-child(1)) {
				border-top: 1px solid #cecece;
			}
		}

		.btn-1 {
			line-height: 44px;
			margin: 10px;
			border-radius: 5px;
			background: #fff;
			color: #ca9500;
		}
	}


</style>
