<template>
	<view>
		<web-view :src="url2" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: 'https://uniapp.dcloud.io/static/web-view.html',
				url2: 'https://0698aa.com/m1/index.html#/'
			}
		},
		onLoad(options) {
			if (options && options.url) {
				this.url = options.url;
			}
		},
		methods: {
			getMessage(event) {
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
