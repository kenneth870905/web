<template>
	<view class="login">
		<view class="input-box">
			<uni-icons class="icon-1" type="phone-filled" size="20" color="#8c8c8c"/>
			<text>+91</text>
			<input type="text" value="" placeholder="Mobile Number" v-model="username"/>
		</view>
		<view class="input-box">
			<uni-icons class="icon-1" type="locked-filled" size="20" color="#8c8c8c"/>
			<input type="password" value="" placeholder="Password" v-model="password"/>
		</view>
		<!-- <label>
			<checkbox value="1" /><text>remember the password</text>
		</label> -->
		<view class="btn-list">
			<view class="">
				<button class="Register" @click="Register()" type="default">Register</button>
			</view>
			<view class="">
				<button class="Login" @click="login()" type="default">Login</button>
			</view>
		</view>
		
		<view class="wangjimima">
			<text @click="wjmm()">Forgot password</text>
		</view>
	</view>
</template>

<script>
	import { mapState , mapMutations  } from 'vuex'
 	export default {
		data() {
			return {
				username:"1234567890",
				password:"123456"
			};
		},
		computed:{
			...mapState({
				state:x=>x
			})
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			wjmm(){
				uni.navigateTo({
					url:"/pages/ForgetPassword"
				})
			},
			Register(){
				uni.navigateTo({
					url:"/pages/registered"
				})
			},
			login(){
				if(!this.username){
					uni.showToast({
						title:'please enter account',
						icon:'none'
					})
				}else if(!this.password){
					uni.showToast({
						title:'Please enter the password',
						icon:'none'
					})
				}else{
					
					let data ={
						username: "+91"+this.username,
						password: this.password
					}
					uni.showLoading({
					    title: 'loading'
					});
					this.$http('/Login',data,'post').then(x=>{
						console.log(x)
						if(x.result){
							this.setItem(['token',x.token])
							this.setItem(['userInfo',{username:this.username}])
							uni.switchTab({
								url:'/pages/my/personal'
							})
							uni.showToast({
								title:'login successful'
							})
						}else{
							uni.showToast({
								title:x.msg,
								icon:'none'
							})
						}
						uni.hideLoading()
					}).catch(err=>{
						uni.showToast({
							title:'Error, try again later',
							icon:'none'
						})
						uni.hideLoading()
					})
					// this.state.userInfo = user
					// this.setItem(['userInfo',user])
					// this.setItem(['登录',true])
					// uni.switchTab({
					// 	url:'/pages/my/personal'
					// })
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		padding: 15px;
	}
.input-box{
	box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
	margin-bottom: 20px;
	background: #fff;
	height: 44px;
	display: flex;
	padding: 0px 10px;
	align-items: center;
	image{
		width: 24px;
		margin: 0px 5px 0px 0px;
	}
	input{
		flex: 1;
		font-size: 14px;
		padding: 0px 5px;
	}
}

.btn-list{
	display: flex;
	margin: 40px 0px 0px;
	view{
		flex: 1;
		&:nth-child(1){
			margin-right: 10px;
		}
	}
	button{
		// height: 40px;
		line-height: 38px;
		font-size: 14px;
	}
	.Register{
		background: #fff;
	}
	.Login{
		background: var(--color);
		color: #fff;
	}
}

.wangjimima{
	text-align: right;
	margin: 40rpx 0px;
	color: rgba($color: #000000, $alpha: 0.6);
}

</style>
