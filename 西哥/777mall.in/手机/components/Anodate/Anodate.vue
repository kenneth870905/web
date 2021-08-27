<template>
	<view>
		<view class="img-1">
			<image class="" src="@/static/image/nodate.png" mode="widthFix"></image>
		</view>
		<view class="text">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
				default:'No Data'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
