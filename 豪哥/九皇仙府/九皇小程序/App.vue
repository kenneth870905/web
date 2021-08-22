<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			let token = uni.getStorageSync('jiuhuangToken')
			console.log(token)
			if(!token){
				uni.reLaunch({
					url:"/pages/login"
				})
			}
			// uni.reLaunch({
			// 	url:"/pages/index/index"
			// })
			// wx87d4d4f2a15e7969
			// wxf8ab6b9c5b6e3490
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
