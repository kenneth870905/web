<template>
	<view class="">
		<view class="title2">
			<!-- 点击保存二维码 -->
		</view>
		<view class="erweima">
			<image @click="baoCun()" :src="api_url+'/'+erwiema" mode="widthFix"></image>
		</view>
		<!-- <image mode="widthFix" src="../../static/test/gdkglcdnlv.jpeg"></image> -->
		<view class="celue">
			<view class="title1">
				分享策略
			</view>
			<view class="item">
				1.分享您的二维码<text>邀请好友</text>注册
			</view>
			<view class="item">
				2.注册成功后，好友消费自动<text>赚取积分</text>
			</view>
			<view class="item">
				3.分享越多赚取积分越多
			</view>
		</view>
		<view class="shuoming">
			<view class="title1">
				分享说明:
			</view>
			<view class="text">
				<!-- 请使用小程序自带分享功能分享给好友！ -->
				点击上方专属二维码保存到相册，发送好友，或者使用小程序自带分享功能分享给好友！
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data() {
		return {
			api_url:"",
			erwiema:""
		};
	},
	computed:{
		...mapState({
			loginInfo:state=>state.loginInfo
		})
	},
	methods: {
		getshareqrcode(){
			this.$http(`/api/user/${this.loginInfo.id}/shareqrcode`).then(x=>{
				if(x.code==0){
					this.erwiema = x.data
				}
			})
		},
		baoCun(){
		// 	uni.chooseImage({
		// 		count:1,
		// 		sourceType:['camera'],
		// 		success(res) {
		// 			console.log(res)
		// 		}
		// 	})
			let img_url = this.api_url+'/'+this.erwiema
			uni.downloadFile({
				url:img_url,
				success(res){
					console.log(res)
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function () {
							console.log('save success');
							uni.showToast({
								title:'图片已保存在相册'
							})	
						},
						fail(err2) {
							console.log(err2)
							uni.showModal({
								title:'提示',
								content:'您已拒绝保存相册功能，请点击右上角 ··· ，设置中打开相册功能'
							})
						}
					});
				}
			})
			
		}
	},
	mounted() {
		this.api_url = this.$api_url
		this.getshareqrcode()
	},
	onShow() {
		
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target);
		}
		return {
			title: this.loginInfo.nickName+'邀请您注册（轻随我）小程序',
			// imageUrl:"http://8.210.239.106/images/2020-10-30/20/04/n8BV0XxWN15qiaXW.jpg",
			// imageUrl:this.api_url+'/'+this.erwiema,
			// path: '/pages/index/index?uid='+this.loginInfo.id+'&topath=/home/home'
			path: '/pages/home/home?uid='+this.loginInfo.id
		};
	}
};
</script>

<style scoped lang="scss">
.title2{
	color: #000;
	font-size: 12px;
	text-align: center;
	margin: 20px 0px 5px;
}
.erweima{
	margin: 0px auto 20px;
	text-align: center;
	image{
		width: 200px;
	}
}

.celue{
	padding: 0px 20px;
	.title1{
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}
	text{
		color: red;
	}
}
.shuoming{
	padding: 20px 20px;
}

</style>
