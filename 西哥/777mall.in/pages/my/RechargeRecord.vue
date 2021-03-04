<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in 5">
				<view class="img">
					<text class="icon iconfont icontubiao-"></text>
				</view>
				<view class="center">
					<text class="qian">100.00</text>
					<text class="time">2021-01-13 00:00</text>
				</view>
				<view class="r">
					<uni-tag text="Wait" type="default" size="small"></uni-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.list{
			
}
.item{
	background: #fff;
	padding: 8px 10px;
	display: flex;
	border-bottom: 1px solid #eee;
	.img{
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		background: #c0c4cc;
		border-radius: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFF;
		margin: 0px 10px 0px 0px;
		.icon{
			font-size: 26px;
		}
	}
	.center{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.qian{
			font-weight: bold;
		}
		.time{
			font-size: 12px;
			color: #9e9e9e;
		}
	}
	.r{
		display: flex;
		align-items: center;
	}
}
</style>
