<template>
	<view>
		<view class="header">
			<view class="">
				{{title}}
			</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in 10" @click="xuanze()">
				永泰苑东（1-10栋）
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"永泰苑123"
			}
		},
		methods: {
			xuanze(item){
				uni.navigateTo({
					url:"/pages/xuanZe3/xuanZe3"
				})
			}
		},
		onLoad(option) {
			console.log(option)
			uni.setNavigationBarTitle({ title: this.title })
		}
	}
</script>

<style lang="scss">
.header {
	height: 300rpx;
	line-height: 300rpx;
	background: url("/static/bg1.png"),linear-gradient(to left, #328944, #247cdc) ;
	padding: 2rpx 0rpx 0rpx;
	view{
		// margin: 100rpx 0rpx 0rpx 100rpx;
		// margin: 100rpx 0rpx 0rpx 0rpx;
		// text-align: center;
		text-align: center;
		font-size: 80rpx;
		font-weight: bold;
		color: #fff;
		font-family: cursive;
	}
}

.list{
	padding: 60rpx 0rpx 60rpx;
	view{
		width: 600rpx;
		margin: 0rpx auto 60rpx;
		text-align: center;
		line-height: 80rpx;
		color: #247cdc;
		border: 2rpx solid #247cdc;
		background: url("/static/bg1.png");
		background: rgba($color: #247cdc, $alpha: 0.1);
	}
}

</style>
