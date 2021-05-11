<template>
	<view class="">
		<canvas class="can" ref="myCanvas" type="2d" id="myCanvas" ></canvas>
		
		<view class="footer">
			<button type="default" open-type="share">
				<view class="icon-1">
					<i class="icon iconfont iconweixin"></i>
				</view>
				微信好友
			</button>
			<view class="" @click="保存图片()">
				<view class="icon-1">
					<i class="icon iconfont icontupian"></i>
				</view>
				保存图片
			</view>
		</view>
		<!-- <button type="default" @click="保存图片()">保存canvas</button> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				api_url: this.$api_url,
				erwiema: "",
				jietu:""
			};
		},
		computed: {
			...mapState({
				loginInfo: state => state.loginInfo
			})
		},
		methods: {
			getshareqrcode() {
				this.$http(`/api/user/${this.loginInfo.id}/shareqrcode`).then(x => {
					if (x.code == 0) {
						this.erwiema = x.data
					}
					this.开始绘制()
				})
			},
			开始绘制() {
				const query = wx.createSelectorQuery()
				query.select('#myCanvas').fields({ node: true, size: true }).exec((res) => {
					const canvas = res[0].node
					const ctx = canvas.getContext('2d')
					var dpr = 2
					var width = res[0].width*dpr
					var height = res[0].height*dpr 
					ctx.scale(dpr, dpr)
					canvas.width = width
					canvas.height = height
					
					//白色背景
					ctx.save()
					ctx.fillStyle = '#fff'
					ctx.fillRect(0, 0, width, height)
					ctx.restore()
					// 外边框
					ctx.strokeStyle = '#d4b47f'
					ctx.lineWidth = 20*dpr
					ctx.strokeRect(0, 0, width, height)
					//内边框
					ctx.strokeStyle = '#d4b47f'
					ctx.lineWidth = 1*dpr
					ctx.strokeRect(20*dpr, 20*dpr, width - 40*dpr, height - 40*dpr)
					//头像
					var 头像 = canvas.createImage()
					头像.src = this.loginInfo.avatarUrl
					头像.onload = () => {
						ctx.save()
						ctx.arc(width/2, (50+25)*dpr , 25*dpr, 0, 2 * Math.PI)
						ctx.clip()	//裁剪
						ctx.drawImage(头像, width/2-25*dpr, 50*dpr , 50*dpr , 50*dpr )
						ctx.restore()
					}
					//插入名字
					ctx.font = 14*dpr+'px sans-serif' 
					ctx.textAlign = 'center'
					ctx.fillText(this.loginInfo.nickName, width/2, 130*dpr)
					//添加描述
					ctx.font = "bold "+16*dpr+"px sans-serif"
					ctx.textAlign = 'center'
					ctx.fillStyle = '#d4b47f'
					ctx.fillText('只有你爬到山顶了',width/2,190*dpr)
					ctx.fillText('这座上才会支撑着你',width/2,215*dpr)
					//二维码
					var 二维码 = canvas.createImage()
					二维码.src = this.api_url+'/'+this.erwiema
					二维码.onload = () => {
						ctx.drawImage(二维码,width/2-50*dpr, 250*dpr , 100*dpr , 100*dpr )
					}
					//长按识别图中二维码
					ctx.font = "bold "+12*dpr+"px sans-serif"
					ctx.textAlign = 'center'
					ctx.fillStyle = '#9e9e9e'
					ctx.fillText('长按识别图中二维码',width/2,380*dpr)
					//插入文字
					ctx.font = "bold "+(10*dpr)+"px sans-serif"
					ctx.fillStyle = '#d4b47f'
					ctx.textAlign = 'left'
					ctx.fillText('轻随我-欢迎您的加入',30*dpr,40*dpr)

				})
			},
			保存图片() {
				var query = wx.createSelectorQuery()
				query.select('#myCanvas').fields({ node: true, size: true }).exec((res) => {
					 wx.canvasToTempFilePath({
						canvas:res[0].node,
					 	success(res) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '图片已保存在相册'
									})
								},
								fail(err2) {
									uni.showModal({
										title: '提示',
										content: '您已拒绝保存相册功能，请点击右上角 ··· ，设置中打开相册功能'
									})
								}
							});
					 	}
					 })
				})
				
			}
		},
		mounted() {},
		onLoad() {
			this.getshareqrcode()
			// this.开始绘制()
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内转发按钮
				console.log(res.target);
			}
			return {
				title: this.loginInfo.nickName + '邀请您注册（轻随我）小程序',
				// imageUrl:"http://8.210.239.106/images/2020-10-30/20/04/n8BV0XxWN15qiaXW.jpg",
				// imageUrl:this.api_url+'/'+this.erwiema,
				// path: '/pages/index/index?uid='+this.loginInfo.id+'&topath=/home/home'
				path: '/pages/home/home?uid=' + this.loginInfo.id
			};
		}
	};
</script>

<style scoped lang="scss">
	.can {
		width: 80%;
		margin: 20px auto 10px;
		height: 430px;
	}

.footer{
	width: 80%;
	display: flex;
	margin: 30px auto 20px;
	justify-content: space-around;
	text-align: center;
	font-size: 12px;
	button{
		margin: 0px;
		font-size: 12px;
		padding: 0px;
		line-height: inherit;
		&::after{
			display: none;
		}
	}
	.icon-1{
		width: 40px;
		height: 40px;
		line-height: 40px;
		border-radius: 100%;
		background: #d2d2d2;
		margin: 0px auto 4px;
		font-size: 20px;
	}
	.iconweixin{
		color: #04d817;
	}
	.icontupian{
		color: #efc339;
	}
}
</style>
