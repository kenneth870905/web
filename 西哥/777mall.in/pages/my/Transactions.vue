<template>
	<view>
		<view class="list">
			
			<view class="item">
				<view class="img">
					<text class="icon iconfont icontubiao-"></text>
				</view>
				<view class="center">
					<text class="tag">Join Peroid</text>
					<text class="time">2021-01-13 00:00</text>
				</view>
				<view class="r">
					-10.00
				</view>
			</view>
			<view class="item">
				<view class="img red">
					<text class="icon iconfont icontubiao-"></text>
				</view>
				<view class="center">
					<text class="tag lv">Peroid Win</text>
					<text class="time">2021-01-13 00:00</text>
				</view>
				<view class="r red">
					+8.00
				</view>
			</view>
		</view>
		
			<view class="">没有对接接口</view>
			<view class="">没有对接接口</view>
			<view class="">没有对接接口</view>
			<view class="">没有对接接口</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
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
		&.red{
			background: red;
		}
		.icon{
			font-size: 26px;
		}
	}
	.center{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.tag{
			background: rgb(192, 196, 204);
			color: #fff;
			width: fit-content;
			padding: 1px 5px;
			font-size: 12px;
			&.lv{
				background: #4caf50;
			}
		}
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
		&.red{
			color: red;
			font-weight: bold;
		}
	}
}
</style>
