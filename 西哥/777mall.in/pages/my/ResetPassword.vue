<template>
	<view class="padding10">
		<view class="input-box shadow">
			<uni-icons type="contact-filled" size="24" class="icon" color="#9e9e9e"></uni-icons>
			<text>+91 1234561231</text>
		</view>
		<view class="input-box shadow">
			<uni-icons type="email-filled" size="24" class="icon" color="#9e9e9e"></uni-icons>
			<input type="text" value="" />
			<view class="btn-1">Send</view>
		</view>
		<view class="input-box shadow">
			<uni-icons type="locked-filled" size="24" class="icon" color="#9e9e9e"></uni-icons>
			<input type="text" value="" password="" />
		</view>
		
		<view class="btn-2">
			Continue
		</view>
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
.input-box{
	margin: 20px 0px 0px;
	background: #fff;
	height: 44px;
	display: flex;
	align-items: center;
	padding: 0px 0px 0px 10px;
	border-radius: 3px;
	.icon{
		margin: 0px 10px 0px 0px;
	}
	input{
		flex: 1;
	}
	.btn-1{
		width: 80px;
		color: #fff;
		background: #009688;
		line-height: 44px;
		text-align: center;
	}
}

.btn-2{
	color: #fff;
	background: #009688;
	line-height: 44px;
	text-align: center;
	margin: 30px 0px;
}

</style>
