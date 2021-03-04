<template>
	<view class="login">
		<view class="input-box">
			<text class="label">Phone</text>
			<text class="content">{{userInfo.Username}}</text>
		</view>
		<view class="input-box">
			<text class="label">Nickname</text>
			<text class="content" :class="{'color-1':!userInfo.Nick}">{{userInfo.Nick ? userInfo.Nick : 'Not set'}}</text>
			<text class="modify" @click="ModifyNickname()">Modify</text>
		</view>
		<view class="input-box">
			<text class="label">Password</text>
			<text class="content">********</text>
			<text class="modify" @click="修改密码()">Modify</text>
		</view>
		
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="change username" :value="nickname" placeholder="Please enter a nickname" @confirm="dialogInputConfirm"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="nicknameP" type="center" class="nicknameP" :maskClick="false">
			<view class="popup-box">
				<view class="title-1">set password</view>
				<view class="input-1">
					<view class="label">Old Password</view>
					<input :type="showPassword=='p1' ? 'text' : 'password'" value="" v-model="oldpassword" placeholder="" class="uni-input-input"/>
					<uni-icons class="icon-1" type="eye-filled" @click="changep('p1')"></uni-icons>
				</view>
				<view class="input-1">
					<view class="label">New Password</view>
					<input :type="showPassword=='p2' ? 'text' : 'password'"  type="password" value="" v-model="newpassword" placeholder="" class="uni-input-input"/>
					<uni-icons class="icon-1" type="eye-filled" @click="changep('p2')"></uni-icons>
				</view>
				<view class="input-1">
					<view class="label">Password Confirmation</view>
					<input :type="showPassword=='p3' ? 'text' : 'password'"  type="password" value="" v-model="newpassword2" placeholder="" class="uni-input-input"/>
					<uni-icons class="icon-1" type="eye-filled" @click="changep('p3')"></uni-icons>
				</view>
				<view class="button-1">
					<view @click="$refs.nicknameP.close()">Cancel</view>
					<view @click="onOk()">Confirm</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import { mapState , mapMutations , mapActions  } from 'vuex'
 	export default {
		components:{
			uniPopupDialog
		},
		data() {
			return {
				nickname:"",
				oldpassword:"",
				newpassword:"",
				newpassword2:"",
				
				showPassword:""
			};
		},
		computed:{
			...mapState({
				userInfo:'userInfo'
			})
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			...mapActions({
				getUserInfo:"getUserInfo"
			}),
			changep(i){
				if(this.showPassword==i){
					this.showPassword = ''
				}else{
					this.showPassword=i
				}
			},
			onOk(){
				if(!this.oldpassword){
					uni.showToast({ title:'Please enter the password', icon:'none' })
				}else if(!this.newpassword){
					uni.showToast({ title:'Please enter a new password', icon:'none' })
				}else if(this.newpassword!=this.newpassword2){
					uni.showToast({ title:'Two passwords are inconsistent', icon:'none' })
				}else{
					this.$refs.nicknameP.close()
					this.$http('/PasswordModify',{oldpassword:this.oldpassword,newpassword:this.newpassword}).then(res=>{
						if(res.result){
							uni.showToast({ title:'Set successfully', icon:'none' })
						}else{
							uni.showToast({ title:res.msg, icon:'none' })
						}
					}).catch(err=>{
						uni.showToast({ title:'Error, try again later', icon:'none' })
					})
				}
			},
			修改密码(){
				this.oldpassword =""
				this.newpassword = ""
				this.newpassword2 = ""
				this.$refs.nicknameP.open()
			},
			ModifyNickname(){
				this.nickname = this.userInfo.Nick
				this.$refs.dialogInput.open()
			},
			dialogInputConfirm(done,value){
				done() //关闭对话框
				this.$http('/NickModify',{nick:value}).then(res=>{
					console.log(res)
					if(res.result){
						uni.showToast({ title:'Set successfully' })
						this.getUserInfo()
					}else{
						uni.showToast({ title:res.msg, icon:'none' })
					}
				}).catch(err=>{
					uni.showToast({ title:'Error, try again later', icon:'none' })
				})
			},
			// 获取用户(){
			// 	this.$http('/UserInfo','').then(x=>{
			// 		if(x.result && x.data){
			// 			this.setItem(['userInfo',x.data])
			// 		}
			// 	}).catch(err=>{
			// 	})
			// },
		},
		onLoad() {
			this.getUserInfo()
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
	.label{
		margin: 0px 10px 0px 0px;
	}
	.color-1{
		color: rgba($color: #000000, $alpha: 0.5);
	}
	.content{
		flex: 1;
	}
	.modify{
		color: var(--color);
		font-size: 12px;
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


.popup-box{
	background: #fff;
	width: 250px;
	border-radius: 10px;
	margin-top: -200px;
	.title-1{
		line-height: 35px;
		text-align: center;
		border-bottom: 1px solid #eee;
	}
	.label{
		font-size: 12px;
	}
	.input-1{
		margin: 20px 20px ;
		border-bottom: 1px solid #b1b1b1;
		position: relative;
		input{
			margin-top: 3px;
			font-size: 14px;
		}
		.icon-1{
			position: absolute;
			right: 0px;
			bottom: 0px;
		}
	}
	.button-1{
		line-height: 44px;
		text-align: center;
		display: flex;
		border-top: 1px solid #eee;
		view{
			flex: 1;
		}
		view:nth-child(2){
			border-left: 1px solid #eee;
			color: #007aff;
		}
		
	}
}
</style>
