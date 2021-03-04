<template>
	<view class="login">
		<view class="input-box">
			<uni-icons class="icon-1" type="phone-filled" size="20" color="#8c8c8c"/>
			<text>+91</text>
			<input type="text" value="" placeholder="Mobile Number" v-model="user.username"/>
		</view>
		<view class="input-box">
			<uni-icons class="icon-1" type="locked-filled" size="20" color="#8c8c8c"/>
			<input type="password" value="" placeholder="Password" v-model="user.password"/>
		</view>
		<view class="input-box">
			<uni-icons class="icon-1" type="locked-filled" size="20" color="#8c8c8c"/>
			<input type="password" value="" placeholder="confirm password" v-model="user.password2"/>
		</view>
		<view class="input-box">
			<uni-icons class="icon-1" type="email-filled" color="#8c8c8c"></uni-icons>
			<input type="text" value="" placeholder="SMS" v-model="user.sms"/>
			<button type="default" @click="获取验证码()">{{time==0 ? 'Send' : time}}</button>
		</view>
		<view class="input-box">
			<uni-icons class="icon-1" type="redo-filled" color="#8c8c8c"></uni-icons>
			<input type="text" value="" :disabled="invitecode ? true : false" placeholder="invitecode" v-model="user.invitecode"/>
		</view>
		<view class="btn-list">
			<view class="">
				<button class="Register" @click="login()" type="default">Login</button>
			</view>
			<view class="">
				<button class="Login" @click="Register()" type="default">Register</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:{
					username:"",
					password:"",
					password2:"",
					sms:"",//短信验证码
					invitecode:"" //邀请码
				},
				time:0,
				invitecode:"",	//页面自带的邀请码
			};
		},
		methods:{
			获取验证码(){
				let test1 = /^[0-9]{10}$/
				if(!test1.test(this.user.username)){
					uni.showToast({
						title:'Please enter 10 digits phone',
						icon:'none'
					})
					return
				}else if(this.time>0){
					return
				}
				this.time=60
				let t = setInterval(()=>{
					this.time--
					if(this.time<=0){
							clearInterval(t)
					}
				},1000)
				this.$http('/SMS',{username:'+91'+this.user.username}).then(x=>{
					console.log(x)
					if(x.result){
						uni.showToast({
							title:'Verification sent'
						})
					}else{
						uni.showToast({
							icon:'none',
							title:x.msg
						})
					}
				}).catch(err=>{
					uni.showToast({ title:'Error, try again later', icon:'none' })
				})
			},
			login(){
				uni.navigateBack({
					
				})
				// uni.navigateTo({
				// 	url:"/pages/login"
				// })
			},
			Register(){
				let test1 = /^[0-9]{10}$/
				if(!test1.test(this.user.username)){
					uni.showToast({
						title:'Please enter 10 digits phone',
						icon:'none'
					})
				}else if(!this.user.password){
					uni.showToast({
						title:'Please enter the password',
						icon:'none'
					})
				}else if(this.user.password!=this.user.password2){
					uni.showToast({
						title:'Two passwords are inconsistent',
						icon:'none'
					})
				}else if(!this.user.sms){
					uni.showToast({
						title:'Please enter the sms',
						icon:'none'
					})
				}else {
					let user = Object.assign({},this.user)
						user.username = '+91'+user.username
					this.$http('/Register',user,'POST').then(x=>{
						if(x.result){
							uni.showToast({
								title:'registration success'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:"/pages/login"
								})
							},1000)
						}else{
							uni.showToast({
								title:x.msg,
								icon:'none'
							})
						}
					}).catch(err=>{
						uni.showToast({
							title:'Error, try again later',
							icon:'none'
						})
					})
				}
			}
		},
		onLoad(q) {
			console.log(q)
			this.invitecode = q.invitecode ? q.invitecode : ''
			this.user.invitecode = q.invitecode ? q.invitecode : ''
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
	padding: 0px 0px 0px 10px;
	align-items: center;
	.icon-1{
		margin: 0px 10px 0px 0px;
		color: rgba($color: #000000, $alpha: 0.6);
	}
	input{
		flex: 1;
		font-size: 14px;
		padding: 0px 5px;
	}
	button{
		background: var(--color);
		line-height: 44px;
		border-radius: 0px;
		color: #fff;
		font-size: 14px;
	}
	
}
.checkbox{
	display: inline-block;
		margin-bottom: 15px;
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
</style>
