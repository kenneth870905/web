<template>
	<view class="personalCenter">
		<view class="box-1">
			<view class="t1">
				<view class="touxiang">
					<!-- <i class="iconfont icon iconrexiao-huangguan"></i> -->
					<image v-if="loginInfo.avatarUrl" :src="loginInfo.avatarUrl" mode="aspectFill"></image>
				</view>
				<view v-show="!loginInfo.id" class="btn-2">
					<button  class="btn-denglu" plain="true" @getuserinfo="queren" open-type="getUserInfo">点击登录账号</button>
				</view>
				<view v-if="loginInfo.id" class="name">
					<text v-if="!xiugaiNickName">{{loginInfo.nickName}}</text>
					<!-- <input v-if="xiugaiNickName" type="text" v-model="NickName_2" /> -->
				</view>
				<!-- <view class="btn-1" @click="go('/pages/address/address')">
					设置收货地址 >
				</view> -->
			</view>
			<!-- <view class="t2">
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
			</view> -->
		</view>
		
		<!-- <view class="box-2">
			<view class="" @click="go('/pages/my/gouWuChe')">
				<icon class="icon iconfont iconqicheqianlian-"></icon>
				<text>购物车</text>
			</view>
			<view class="" @click="go('/pages/myOrder/orderList')">
				<icon class="icon iconfont icondingdan"></icon>
				我的订单
			</view>
		</view> -->
		
		<view class="box-3">
			<view class="" @click="go('/pages/address')">
				<uni-icons type="location-filled"></uni-icons>
				<text>收货地址</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="" @click="go('/pages/orderList')">
				<uni-icons type="list"></uni-icons>
				<text>我的订单</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="" @click="switchTab('/pages/shoppingCart/shoppingCart')">
				<uni-icons type="cart-filled"></uni-icons>
				<text>购物车</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<view class="">
				<uni-icons type="paperclip"></uni-icons>
				<text>我的收藏</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			
			<view class="" @click="go('/pages/fankui/fankui')">
				<uni-icons type="paperclip"></uni-icons>
				<text>意见反馈</text>
				<uni-icons type="forward"></uni-icons>
			</view>
			<!-- <view class="" @click="go('/pages/tuiGuang/guiGuangMa')">
				<i class="icon iconfont iconscan-fill"></i>
				<text>我的扫码</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view> -->
		</view>
		<!-- <view class="box-3">
			<view class="" @click="go('/pages/fankui/fankui')">
				<i class="icon iconfont iconxinxi-copy"></i>
				<text>向CEO提意见</text>
				<i class="icon iconfont iconarrow-right"></i>
			</view>
		</view> -->
		
		
		<view class="banben">
			当前版本 1.0.0
		</view>
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
	}
</script>


<style scoped lang="scss">
	.box-1{
		background-image: linear-gradient(96deg,  #2e5858 0%,  #4ec3b1 100%);
		border-radius: 3rpx;
		margin: 10px auto 0px;
		padding: 15px 0px 15px;
		// 顶部
		.t1{
			display: flex;
			padding: 33rpx 0px 0px 38rpx;
			align-items: center;
		}
		.touxiang{
			flex-shrink: 0;
			width: 109rpx;
			height: 109rpx;
			background-color: #000000;
			border: solid 3rpx #ffffff;
			position: relative;
			border-radius: 100%;
			box-sizing: border-box;
			margin: 0px 30rpx 0px 0px;
			image{
				width: 100%;
				height: 100%;
				border-radius: 100%;
			}
			i{
				position: absolute;
				top: -8px;
				right: -8px;
				font-size: 46rpx;
				color: #ff7326;
				transform:rotate(30deg);
			}
		}
		.btn-2{
			flex: 1;
		}
		.btn-denglu{
			padding: 0px;
			font-size: 16px;
			border: none;
			color: red;
			display: inline-block;
			margin: 0px 0px 0px 10px;
		}
		.name{
			flex: 1;
			display: flex;
			align-items: center;
			color: #fff;
			
			input{
				border-bottom: 1px solid #fff;
			}
			text{
				font-size: 35rpx;
				font-weight: bold;
				margin: 0px 23rpx 0px 0px;
			}
			i{
				margin: 0px 5px 0px 0px;
			}
			.iconxuanzhong,
			.iconshanchu{
				color: #ff7326;
				font-size: 40rpx;
			}
		}
		.btn-1{
			flex-shrink: 0;
			width: 210rpx;
			height: 58rpx;
			margin: 0px 0px 0px 10px;
			text-align: center;
			border-top-left-radius: 19rpx;
			border-bottom-left-radius: 19rpx;
			background: rgba(0,0,0,0.2);
			line-height: 58rpx;
			font-size: 21rpx;
			color: #ffffff;
		}
		// 下面
		.t2{
			height: 143rpx;
			display: flex;
			align-items: center;
			text-align: center;
			>view{
				width: calc(100% / 3);
			}
			text{
				font-size: 33rpx;
				color: #fff;
				margin: 0px 0px 15rpx 0px;
			}
			view{
				font-size: 17rpx;
				color: #adbbbb;
			}
		}
	}
	
	.box-2{
		display: flex;
		margin-top: 15rpx;
		>view{
			flex: 1;
			height: 126rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #ffffff;
			border-radius: 3rpx;
			&:nth-child(1){
				margin-right: 18rpx;
			}
			font-size: 28rpx;
			icon{
				font-size: 56rpx;
				margin: 0px 38rpx 0px 0px;
			}
		}
	}
	
	.box-3{
		background: #fff;
		margin: 20rpx 0px 0px;
		>view{
			height: 90rpx;
			display: flex;
			align-items: center;
			padding: 0px 30rpx;
		}
		>view:not(:last-child){
			border-bottom:1px solid #eee;
		}
		text{
			font-size: 25rpx;
			flex: 1;
			margin: 0px 0px 0px 10px;
		}
	}
	
	.box_1{
		margin: 5px 0px 5px;
		background: #fff;
		height: _opx(70);
		display: flex;
		flex-direction: row;
		align-items: center;
		button{
			width: _opx(125);
			height: _opx(40);
			line-height: _opx(40);
			color: #fff;
			font-size: _opx(14);
		}
		>button:nth-child(1){
			background: linear-gradient(45deg,#ffa05d, #fc6074);
		}
		>button:nth-child(2){
			background: linear-gradient(45deg,#87baf1, #8577fd);
		}
	}
	
	.box_2{
		margin: 5px 0px 0px;
	}
	
	.tuichu{
		margin: 20px 0px;
		border: none;
		border-radius: 0px;
	}
	
	
	.banben{
		text-align: center;
		color: #8c8c8c;
		margin: 20px 0px;
		font-size: 12px;
	}
	
	
</style>
