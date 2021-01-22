<template>
	<view class="padding10">
		<view class="box-1 shadow">
			Balance 000.00
		</view>
		
		<view class="box-2 shadow">
			<icon type="icon iconfont iconqiandai"></icon>
			<input type="text" v-model="num" placeholder="Enter withdrawal amount"/>
		</view>
		<view class="message-1">The amount field is required.</view>
		
		<view class="title-1">Pay Out</view>
		
		<view class="input-box disabled">
			<uni-icons type="checkmarkempty" size="35"></uni-icons>
			<text>ACF Payout</text>
		</view>
		<view class="input-box" @click="$refs.popup.open()">
			<uni-icons type="checkmarkempty" size="35"></uni-icons>
			<text>Select Bank Card</text>
		</view>
		<view class="input-box">
			<uni-icons type="locked" size="25"></uni-icons>
			<input type="text" value="" placeholder="Enter your login password"/>
		</view>
		
		<view class="message-2">
			<view class="t1">Withdraw Mode: T</view>
			<view class="">
				 Note: Please bind the correct UPI account information for withdrawal. Incorrect binding will cause withdrawal failure. If there is any problem, please email 
				 <uni-link href="www.baidu.com" text="777mall.in@gmail.com"></uni-link>
				  to help you deal with it. 
			</view>
		</view>
		<view class="btn-1">
			Withdrawal
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="list">
				<view class="item" v-for="item in 1">
					<view class="">
						<text>accountName</text>
						<text>bankname</text>
					</view>
					<view class="">upi</view>
				</view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:0
			};
		},
		methods:{
				
		},
		onLoad() {
			setTimeout(()=>{
				this.$refs.popup.open()
			},1000)
		},
		onNavigationBarButtonTap(e) {
			console.log(e)
			uni.navigateTo({
				url:'/pages/my/WithdrawalRecord'
			})
		}
	}
</script>

<style lang="scss" scoped>
.box-1{
	text-align: center;
	line-height: 84px;
	font-size: 26px;
	background: #fff;
}
.box-2{
	display: flex;
	background: #fff;
	align-items: center;
	height: 44px;
	padding: 0px 10px;
	margin: 15px 0px 0px;
	icon{
		margin: 0px 15px 0px 0px;
		color: #bdbdbd;
	}
}

.message-1{
	font-size: 12px;
	color: #9e9e9e;
	margin: 5px 0px 0px;
}

.title-1{
	font-size: 12px;
	color: #9e9e9e;
	margin: 35px 0px 5px;
}

.input-box{
	height: 44px;
	display: flex;
	padding: 0px 10px;
	align-items: center;
	justify-content: space-between;
	background: #fff;
	margin: 0px 0px 15px;
	@include shadow;
	&.disabled{
		background: #efefef;
	}
	input{
		flex: 1;
		margin: 0px 0px 0px 10px;
	}
}

.message-2{
	font-size: 13px;
	color: #666;
	text-align: center;
	.t1{
		margin: 0px 0px 5px;
	}
}

.btn-1{
	line-height: 44px;
	text-align: center;
	color: #fff;
	background: #009688;
	margin: 20px 0px;
}

.list{
	background: #fff;
	padding: 10px;
	min-height: 200px;
	max-height: 50vh;
	overflow: auto;
	.item{
		background: #009688;
		padding: 10px;
		margin: 0px 0px 10px;
		color: #fff;
		>view:nth-child(1){
			display: flex;
			justify-content: space-between;
		}
		>view:nth-child(2){
			text-align: right;
		}
	}
}

</style>
