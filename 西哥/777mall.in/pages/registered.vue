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
			<button type="default">Send</button>
		</view>
		<view class="input-box">
			<image src="/static/image/mima.png" mode="widthFix"></image>
			<input type="password" value="" placeholder="Verify Code" />
		</view>
		<label class="checkbox">
			<checkbox value="1" /><text>Voice verification code</text>
		</label>
		<view class="input-box">
			<image src="/static/image/mima.png" mode="widthFix"></image>
			<input type="password" value="" placeholder="Invitation Code" />
		</view>
		<label class="checkbox">
			<checkbox value="1" /><text>I agree </text><text>PRIVACY POLICY</text>
		</label>
		
		
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
				phone:"",
				password:""
			};
		},
		methods:{
			login(){
				uni.navigateBack({
					
				})
				// uni.navigateTo({
				// 	url:"/pages/login"
				// })
			},
			Register(){
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
					// uni.showModal({
					// 	content:"Congratulations, registration is successful",
					// 	showCancel:false,
					// 	confirmText:"Confirm"
					// })
					uni.showToast({
						title:'Congratulations, registration is successful'
					})
					setTimeout(()=>{
						uni.navigateBack({})
					},2000)
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
	padding: 0px 0px 0px 10px;
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
	button{
		background: #009688;
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
		background: #009688;
		color: #fff;
	}
}
</style>
