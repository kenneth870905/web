<template>
	<view>
		<view class="box-1">
			<view class="title">
				提现到微信
			</view>
			<view class="input-box">
				<text>￥</text>
				<input @change="changeAmount()" type="number" value="" v-model="amount"/>
			</view>
			<view class="tishi">
				<view class="tishi-1"  v-if="amount<=loginInfo.kickback">
					当前佣金为：{{loginInfo.kickback}}，<text @click="amount = loginInfo.kickback">全部提现</text>
				</view>
				<view class="tishi-2"  v-if="amount>loginInfo.kickback">
					输入金额超过佣金余额
				</view>
			</view>
			<button type="default" @click="提现()" class="btn-1" :class="{active:amount}" :disabled="!amount">提现</button>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				amount:""
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo
			}),
			
		},
		methods:{
			changeAmount(){
				console.log(123)
				if(!this.amount) return
				if(this.amount<0) this.amount = 0
				this.amount = Math.floor(this.amount*100) / 100
			},
			提现(){
				uni.showLoading({
					mask:true,
					title:'正在加载'
				})
				this.$http(`/api/user/${this.loginInfo.id}/withdraw`,{amount:this.amount},'POST').then(x=>{
					console.log(x)
					if(x.code===0){
						uni.showToast({
							title:'提现成功，请注意查收'
						})
						this.getUser()
					}else{
						uni.showToast({
							title:x.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'网络异常稍后再试',
						icon:'none'
					})
				})
			},
			getUser(){
				this.$http(`/api/user/${this.loginInfo.id}`).then(res=>{
					if(res.code!==0) return
					this.loginInfo.credit = res.data.credit
					this.loginInfo.kickback = res.data.kickback
				})
			}
		},
		mounted() {
				
		}
	}
</script>

<style lang="scss" scoped>
.box-1{
	margin: 40px 10px;
	padding: 20px 25px;
	background: #fff;
}
.input-box{
	display: flex;
	border-bottom: 1px solid #e7e7e7;
	font-weight: bold;
	margin: 15px 0px 0px;
	padding: 5px 0px ;
	input{
		height: auto;
		font-size: 38px;
	}
	text{
		font-size: 32px;
		font-weight: 500;
	}
}
.tishi{
	font-size: 12px;
	margin: 15px 0px;
	.tishi-1{
		color: #404040;
	}
	text{
		color: #126fd8;
	}
	.tishi-2{
		color: red;
	}
}

.btn-1{
	font-size: 14px;
	line-height: 44px;
	&::after{
		display: none;
	}
	&.active{
		background: #07c160;
		color: #fff;
	}
	// border: none;
}

</style>
