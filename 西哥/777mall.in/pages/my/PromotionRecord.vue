<template>
	<view>
		<view class="tabs">
			<view class="active">Level 1</view>
			<view class="">Level 2</view>
		</view>
	</view>
</template>

<script>
	// 促销记录
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.tabs{
	display: flex;
	line-height: 44px;
	color: #fff;
	text-align: center;
	background: #009688;
	color: rgba($color: #fff, $alpha: 0.8);
	view{
		flex: 1;
		position: relative;
	}
	.active{
		color: #fff;
		&::after{
			position: absolute;
			left: 0px;
			bottom: 0px;
			width: 100%;
			height: 4px;
			background: #2196f3;
			content: '';
		}
	}
	
}
</style>
