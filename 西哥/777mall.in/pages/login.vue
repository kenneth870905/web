<template>
	<view class="login">
		<view class="input-box">
			<image src="/static/image/zhanghao.png" mode="widthFix"></image>
			<text>+91</text>
			<input type="text" value="" placeholder="Mobile Number" v-model="phone"/>
		</view>
		<view class="input-box">
			<image src="/static/image/mima.png" mode="widthFix"></image>
			<input type="password" value="" placeholder="Password" v-model="password"/>
		</view>
		<label>
			<checkbox value="1" /><text>remember the password</text>
		</label>
		<view class="btn-list">
			<view class="">
				<button class="Register" @click="Register()" type="default">Register</button>
			</view>
			<view class="">
				<button class="Login" @click="login()" type="default">Login</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState , mapMutations  } from 'vuex'
 	export default {
		data() {
			return {
				phone:"",
				password:""
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
			Register(){
				uni.navigateTo({
					url:"/pages/registered"
				})
			},
			login(){
				if(!this.phone){
					uni.showModal({
						content:"Cell phone number must be 10 digits",
						showCancel:false,
						confirmText:"Confirm"
					})
					return
				}else if(!this.password){
					
						uni.showModal({
							content:"The password length is between 8 and 20",
							showCancel:false,
							confirmText:"Confirm"
						})
						return
				}else{
					var user = {
						name:this.phone,
						password:this.password
					}
					let data ={
						mobile: "+91"+this.phone,
						password: this.password
					}
					uni.showLoading({
					    title: 'loading'
					});
					this.$http('/index/login',data,'post').then(x=>{
						console.log(x)
						if(x.code===0){
							this.setItem(['登录',true])
							this.setItem(['token',x.data])
							uni.switchTab({
								url:'/pages/my/personal'
							})
						}else{
							uni.showModal({
								content:x.msg,
								showCancel:false,
								confirmText:"Confirm"
							})
						}
						uni.hideLoading()
					}).catch(err=>{
						uni.showModal({
							content:'wrong password',
							showCancel:false,
							confirmText:"Confirm"
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
		background: #009688;
		color: #fff;
	}
}
</style>
