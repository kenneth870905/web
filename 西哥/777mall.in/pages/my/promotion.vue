<template>
	<view class="padding10">
		
		<view class="box-5 shadow">
			<text @click="go('/pages/my/PromotionRecord')">Promotion Record</text>
			<text @click="go('/pages/my/BonusRecord')">Bonus Record</text>
			<text @click="go('/pages/my/ApplyRecord')">Apply Record</text>
		</view>
		
		<view class="box-1 shadow">
			Bonus：{{agent.agent_amount}}
		</view>

		<view class="box-2 shadow">
			<view class="tabs">
				<view :class="{active:Level==1}" @click="Level=1">Level 1</view>
				<view :class="{active:Level==2}"  @click="Level=2">Level 2</view>
			</view>
			<view class="content">
				<view class="">
					<view class="t1">Total People</view>
					<view class="number">{{Level==1 ? agent.agent_first_total : agent.agent_second_total}}</view>
				</view>
				<view class="">
					<view class="t1">Contribution</view>
					<view class="number">{{Level==1 ? agent.agent_first_fee : agent.agent_second_fee}}</view>
				</view>
			</view>
		</view>

		<view class="box-3 shadow" @click="jianQieBan(agent.invitecode)">
			<text>Promotion Code：</text>
			<text>{{agent.invitecode}}</text>
			<image src="@/static/image/fuzhi.png" mode="aspectFill"></image>
		</view>

		<view class="box-3 shadow" @click="jianQieBan(url+agent.invitecode)">
			<text>Promotion Link：</text>
			<text>{{url+agent.invitecode}}</text>
			<image src="@/static/image/fuzhi.png" mode="aspectFill"></image>
		</view>

		<view class="box-4">
			<uni-link color="#ff4081" showUnderLine="false" class="link shadow" :href="url+agent.invitecode" text="Open Link"></uni-link>
			<view class="shadow" @click="tixian()">Apply to Balance</view>
		</view>
		
		<!-- <uni-list class="box-5">
			<uni-list-item title="Promotion Record" to="/pages/my/PromotionRecord" showArrow></uni-list-item>
			<uni-list-item title="Bonus Record" to="/pages/my/BonusRecord" showArrow></uni-list-item>
			<uni-list-item title="Apply Record" to="/pages/my/ApplyRecord" showArrow></uni-list-item>
		</uni-list> -->

		<!-- <uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="list">
					<view class="" @click="go('/pages/my/PromotionRecord')">Promotion Record</view>
					<view class="" @click="go('/pages/my/BonusRecord')">Bonus Record</view>
					<view class="" @click="go('/pages/my/ApplyRecord')">Apply Record</view>
				</view>
			</view>
		</uni-popup> -->
		
		<!-- 提现弹框 -->
		<uni-popup type="center" ref="Apply" :maskClick="false">
			<view class="Apply-box">
				<view class="title-1">Apply to Balance</view>
				<view class="item">Bonus：{{agent.agent_amount}}</view>
				<view class="item">
					<text>Amount：</text>
					<input type="number" v-model="amount" value=""  @blur="blur"/>
					<text class="btn-1" @click="amount = agent.agent_amount">All</text>
				</view>
				<view class="btn-2">
					<text @click="$refs.Apply.close()">Cancel</text>
					<text @click="Confirm()">Confirm</text>
				</view>
			</view>
			
		</uni-popup>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Level:1,
				agent:{
					// amount:100
				},
				url:"",		//分享给地址
				amount:0,	//提现金额
			};
		},
		methods: {
			//剪切板
			jianQieBan(str) {
				uni.setClipboardData({
					data: str,
					success: function(data) {
						uni.showToast({
							title:'Copy successfully',
							icon:'none'
						})
					},
					fail: function(err) {
						console.log(err)
					},
					complete: function(res) {
						console.log(res)
					}
				})
			},
			tixian(){
				// uni.showModal({
				// 	content:"The bonus is not enough to withdraw cash",
				// 	confirmText:'Confirm',
				// 	showCancel:false
				// })
				this.$refs.Apply.open()
			},
			go(url){
				uni.navigateTo({
					url:url
				})
			},
			查询代理信息(){
				this.$http('/Agent/Info').then(res=>{
					if(res.result){
						this.agent = res.data
					}
				}).catch(err=>{
				})
			},
			Confirm(){
				if(!this.amount){
					uni.showToast({ title:'Please enter the amount', icon:'none' })
				}else{
					this.$http('/Agent/Withdraw',{amount:this.amount}).then(res=>{
						console.log(res)
						if(res.result){
							uni.showModal({
								title:'Prompt',
								content:res.msg,
								showCancel:false,
								confirmText:"Ok"
							})
							// uni.showToast({ title:res.msg })
							this.$refs.Apply.close()
							this.查询代理信息()
							this.amount = 0
						}else{
							uni.showToast({ title:res.msg , icon:'none' })
						}
					}).catch(err=>{
						console.log(err)
						uni.showToast({ title:'Error, try again later', icon:'none' })
					})
				}
			},
			blur(){
				this.amount = Math.abs(parseFloat( Math.round(this.amount*100)/100)) 
			},
		},
		onLoad() {
			this.查询代理信息()
			this.url = location.href.replace(location.hash,'')+'#/pages/registered?invitecode='
			
		},
		onShow() {
		},
		//自定义标题按钮点击事件
		onNavigationBarButtonTap(e) {
			// this.$refs.popup.open()
		},
		
	}
</script>

<style lang="scss" scoped>
	// 底部弹框
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

	.box-1 {
		line-height: 84*2rpx;
		background: #fff;
		text-align: center;
		font-size: 26px;
	}

	.box-2 {
		margin: 10px 0px 0px;
		background: #fff;

		.tabs {
			display: flex;
			line-height: 44px;
			text-align: center;
			color: #dedede;
			background: #009688;

			view {
				flex: 1;
				position: relative;
			}

			.active {
				color: #fff;

				&::after {
					position: absolute;
					bottom: 0px;
					left: 0px;
					width: 100%;
					height: 2px;
					background: #2196f3;
					content: "";
				}
			}
		}

		.content {
			height: 115px;
			display: flex;
			align-items: center;
			text-align: center;

			>view {
				flex: 1;
			}

			.t1 {
				color: #9e9e9e;
			}

			.number {
				margin-top: 5px;
				font-size: 23px;
			}
		}
	}

	.box-3 {
		height: 48px;
		display: flex;
		align-items: center;
		padding: 0px 10px;
		background: #FFFFFF;
		margin: 10px 0px 0px;
		font-size: 12px;
		white-space: nowrap;

		text:nth-child(1) {
			flex-shrink: 0;
			color: #9e9e9e;
		}

		text:nth-child(2) {
			flex: 1;
			width: 0;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		image {
			width: 18px;
			height: 18px;
			flex-shrink: 0;
		}
	}

	.box-4 {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
		text-align: center;
		line-height: 44px;

		.link {
			width: 150rpx*2;
			// text-decoration: none;
			height: 44px;
			background: #fff;
		}

		view {
			margin: 0px 0px 0px 15px;
			flex: 1;
			background: #2196f3;
			color: #fff;
		}
	}
	
	.Apply-box{
		background: #fff;
		width: 60vw;
		border-radius: 5px;
		.title-1{
			line-height: 36px;
			text-align: center;
			border-bottom: 1px solid #eee;
			margin-bottom: 15px;
		}
		.item{
			padding: 10px 15px;
			display: flex;
			input{
				flex: 1;
				border-bottom: 1px solid red;
				color: red;
			}
			.btn-1{
				font-size: 12px;
				color: red;
			}
		}
		.btn-2{
			margin-top: 15px;
			border-top: 1px solid #eee;
			line-height: 36px;
			display: flex;
			color: rgba($color: #000000, $alpha: 0.6);
			text{
				flex: 1;
				text-align: center;
			}
			text:nth-child(2){
				color: #2196f3;
				border-left: 1px solid #eee;
			}
		}
	}
	
	.box-5{
		// margin: 20px 0px 20px;
		// color: #2196f3;
		
		margin: 0px 0px 10px;
		background: #fff;
		line-height: 40px;
		display: flex;
		text-align: center;
		white-space: nowrap;
		font-size: 12px;
		color: #2196f3;
		text{
			flex: 1;
		}
		text:nth-child(2){
			border-left: 1px solid #eee;
			border-right: 1px solid #eee;
		}
	}
	
</style>
