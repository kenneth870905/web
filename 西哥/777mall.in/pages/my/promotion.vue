<template>
	<view class="padding10">
		<view class="box-1 shadow">
			Bonus：0.00
		</view>

		<view class="box-2 shadow">
			<view class="tabs">
				<view class="active">Level 1</view>
				<view class="">Level 2</view>
			</view>
			<view class="content">
				<view class="">
					<view class="t1">Total People</view>
					<view class="number">0</view>
				</view>
				<view class="">
					<view class="t1">Contribution</view>
					<view class="number">0.00</view>
				</view>
			</view>
		</view>

		<view class="box-3 shadow" @click="jianQieBan('IA37o9M')">
			<text>Promotion Code：</text>
			<text>IA37o9M</text>
			<image src="@/static/image/fuzhi.png" mode="aspectFill"></image>
		</view>

		<view class="box-3 shadow" @click="jianQieBan('哈哈')">
			<text>Promotion Link：</text>
			<text>https://www.google.com/search?q=uniapp+%E5%A4%8D%E5%88%B6&oq=uniapp+fu&aqs=chrome.1.69i57j0i12j0i10l2.4326j1j7&sourceid=chrome&ie=UTF-8</text>
			<image src="@/static/image/fuzhi.png" mode="aspectFill"></image>
		</view>

		<view class="box-4">
			<uni-link color="#ff4081" showUnderLine="false" class="link shadow" href="http://localhost:8080/#/pages/my/promotion" text="Open Link"></uni-link>
			<view class="shadow" @click="tixian()">Apply to Balance</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popup-box">
				<view class="list">
					<view class="" @click="go('/pages/my/PromotionRecord')">Promotion Record</view>
					<view class="" @click="go('/pages/my/BonusRecord')">Bonus Record</view>
					<view class="" @click="go('/pages/my/ApplyRecord')">Apply Record</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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
				uni.showModal({
					// title:"Prompt",
					content:"The bonus is not enough to withdraw cash",
					confirmText:'Confirm',
					showCancel:false
				})
			},
			go(url){
				uni.navigateTo({
					url:url
				})
			}
		},
		//自定义标题按钮点击事件
		onNavigationBarButtonTap(e) {
			this.$refs.popup.open()
		}
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
</style>
