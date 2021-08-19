<template>
	<view class="container">
		<view class="header">
			<view class="">
				九皇仙府
			</view>
		</view>
		<view class="list">
			<view class="item1" @click="xuanze(item)" v-for="item in 20">
				<view class="item2">
					名字{{item}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			xuanze(item){
				uni.navigateTo({
					url:"/pages/xuanZe2/xuanZe2?id="+item
				})
			}
		},
		onLoad() {
			wx.hideHomeButton()
		}
	}
</script>

<style lang="scss">
.header {
	height: 300rpx;
	background: url("/static/bg1.png"),linear-gradient(to left, #328944, #247cdc) ;
	padding: 2rpx 0rpx 0rpx;
	view{
		margin: 100rpx 0rpx 0rpx 100rpx;
		// margin: 100rpx 0rpx 0rpx 0rpx;
		// text-align: center;
		font-size: 52rpx;
		font-weight: bold;
		color: #fff;
		font-family: cursive;
	}
}

.list{
	display: flex;
	padding: 30rpx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.item1{
		width: calc(50% - 16rpx);
		border: 2rpx solid #2b838a;
		margin: 0rpx 0rpx 30rpx;
		padding: 10rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.item2{
		font-size: 28rpx;
		// background: #2b838a;
		// background: url("/static/bg1.png"),linear-gradient(to left, #328944, #247cdc) ;
		background: url("/static/bg1.png") ;
		background-color: #2b838a;
		line-height: 80rpx;
		color: #fff;
		font-weight: bold;
		text-align: center;
		border-radius: 10rpx;
		position: relative;
	}
	
}
</style>
