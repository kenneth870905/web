<template>
	<view class="JinDian">
		<image src="../../../static/images/logo.png" mode="aspectFill"></image>
		<view class="center">
			<view class="title1">
				<text>轻随我商店</text>
				<view class="biaoji">
					<i class="icon iconfont iconxia"></i>
					官方
				</view>
			</view>
			<view class="text">
				正品保证 I 全场包邮
			</view>
		</view>
		<view class="btn-1" @click="jindian()">
			进入店铺
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
		}
	},
	methods:{
		jindian(){
			uni.switchTab({
				url:'/pages/shangDian/shangDian'
			})
		}
		
	}
}
</script>

<style lang="scss" scoped>
.JinDian{
	background: #fff;
	padding: 20rpx 28rpx;
	display: flex;
	align-items: center;
	image{
		width: 104rpx;
		height: 104rpx;
		margin: 0px 20rpx 0px 0px;
		flex-shrink: 0;
	}
	.center{
		flex: 1;
	}
	.title1{
		font-size: 28rpx;
		color: #333;
		display: flex;
		align-items: center;
		.biaoji{
			margin-left: 30rpx;
			position: relative;
			width: 60rpx;
			height: 26rpx;
			background-color: #000000;
			text-align: center;
			line-height: 26rpx;
			color: #fbd413;
			font-size: 17rpx;
			i{
				position: absolute;
				left: -8px;
				top: 0px;
				color:#000;
				font-size: 12px;
				transform: rotate(90deg)
			}
		}
	}
	.text{
		font-size: 17rpx;
		color: #999999;
		margin: 26rpx 0px 0px;
	}
	.btn-1{
		width: 139rpx;
		height: 42rpx;
		border: solid 1px #dcdcdc;
		text-align: center;
		line-height: 42rpx;
		font-size: 21rpx;
	}
}
</style>
