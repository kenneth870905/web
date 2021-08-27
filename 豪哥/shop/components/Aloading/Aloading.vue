<template>
	<view>
		<view class="loadingText" v-if="loading">
			Loading
		</view>
		<view class="loadingText" v-if="!loading && total>0 && total<=length">
			没有更多了
		</view>
		<view class="nodata" v-if="!loading && total==0">
			<view class="img-1">
				<image class="" src="@/static/image/nodate.png" mode="widthFix"></image>
			</view>
			<view class="text">
				{{text}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			loading:{
				default:false
			},
			total:{
				default:-1
			},
			length:{
				default:0
			},
			text:{
				default:'暂无数据'
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.loadingText{
	line-height: 44px;
	font-size: 14px;
	text-align: center;
	color: rgba($color: #000000, $alpha: 0.6);
}
.nodata{
	margin: 0px 0px 10px;
	.img-1{
		text-align: center;
		image{
			width: 150px;
		}
	}
	.text{
		text-align: center;
		color: #a5a5a5;
		font-size: 14px;
	}
}
</style>
