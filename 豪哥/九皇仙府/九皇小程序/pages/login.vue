<template>
	<view class="container">
		<view class="form">
			<input type="text" value="" v-model="user.name" placeholder="请输入账号"/>
			<input type="password" value="" v-model="user.password" placeholder="请输入密码"/>
			<button type="default" @click="登录()">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					name:"",
					password:""
				}
			};
		},
		methods:{
			登录(){
				this.$http('/auth/login',this.user).then(x=>{
					console.log(x)
					if(x.code==0){
						uni.setStorageSync('jiuhuangToken', x.data.token);
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}else{
						uni.showToast({title:'账号密码错误，请重新登录',icon:'none'})
					}
				})
				
				console.log(this.user)
				return
				uni.showToast({
					title:'登录成功',
					icon:'none'
				})
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		},
		onLoad() {
			wx.hideHomeButton()
		}
	}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background: url("/static/bg1.png"),linear-gradient(to left, #328944, #247cdc) ;
	display: flex;
	align-items: center;
	justify-content: center;
}
.form{
	width: 600rpx;
}
input{
	background: #fff;
	line-height: 80rpx;
	height: 80rpx;
	margin: 20rpx 0rpx;
	padding: 0rpx 20rpx;
}
button{
	margin: 40rpx 0rpx 0rpx;
}
</style>
