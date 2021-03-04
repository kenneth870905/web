<template>
	<view>
		<view class="loadingText" v-if="loading">
			Loading
		</view>
		<view class="loadingText" v-if="!loading && total>0 && total<=length">
			No more
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
				default:'No Data'
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
	text-align: center;
	color: rgba($color: #000000, $alpha: 0.7);
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
		font-size: 20px;
	}
}
</style>
