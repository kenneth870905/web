<template>
	<view class="content">
		<image src="../../static/images/weixin.png" mode="widthFix"></image>
		<view class="text1">
			微信授权页面
		</view>
		<view class="text2">
			此页面是微信授权页面，点击下方按钮进行授权
		</view>
		<button v-show="!jujue" type="primary" plain="true" @getuserinfo="queren" open-type="getUserInfo">授权并登陆</button>
		<button v-show="jujue" type="warn" plain="true" open-type="openSetting">点击进入权限选择界面</button>
	</view>
</template>

<script>
	import { mapState , mapActions } from 'vuex'
	export default {
		data() {
			return {
				jujue:false,
				topath:"",
				fxuid:""  //分享人id
			}
		},
		computed:{
			...mapState({
				state:state=>state
			})
		},
		methods: {
			...mapActions({
				loginwx:"loginwx",
			}),
			queren(e){
				if(!e.detail.userInfo){
					this.jujue = true
				}else{
					this.loginwx()
				}
			}
		},
		onShow() {
			var this_1 = this
			console.log(this.state.loginInfo.id)
			if(this.state.loginInfo.id){
				if(this.topath){
					uni.switchTab({
						url:'/pages'+this.topath
					})
					console.log('有topath跳转',this.topath)
				}else{
					uni.switchTab({
						url:'/pages/home/home'
					})
					console.log('没有topath跳转')
				}
			}else{
				this.state.topath = this.topath
				this.state.fxuid = this.fxuid
			}
		},
		onLoad(option) {
			const scene = decodeURIComponent(option.scene)
			console.log('scene',scene)
			console.log('index获取页面参数',option)
			let uid2 = scene.superiorId ? scene.superiorId : ''
			// this.topath = '/home/home'
			this.topath = option.topath ? option.topath :""
			this.fxuid = option.uid ? option.uid : uid2
		},
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
image{
	width: 100px;
	margin: 0px 0px 10px;
}
.text1{
	font-size: 20px;
}
.text2{
	color: #777;
}

button{
		height: 40px;
		line-height: 38px;
		margin: 20px auto;
}
</style>


