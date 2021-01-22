<template>
	<view class="padding10">
		<view class="list">
			<view class="item" v-for="item in 1">
				<view class="">
					<text>accountName</text>
					<text>bankname</text>
				</view>
				<view class="">upi</view>
			</view>
		</view>
		
		<view class="btn-1" @click="card()">Add Bank Card</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			card(){
				uni.navigateTo({
					url:"/pages/card/card"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.list{
	.item{
		background: #009688;
		padding: 12px;
		margin: 0px 0px 10px;
		border-radius: 5px;
		color: #fff;
		>view:nth-child(1){
			display: flex;
			justify-content: space-between;
		}
		>view:nth-child(2){
			text-align: right;
			margin-top: 10px;
			font-size: 16px;
		}
	}
}

.btn-1{
	background: #2196f3;
	color: #fff;
	line-height: 44px;
	text-align: center;
	margin: 50px 0px 20px;
}

</style>
