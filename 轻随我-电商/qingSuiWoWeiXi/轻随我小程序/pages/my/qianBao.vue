<template>
	<view>
		<uni-list>
			<uni-list-item title="列表左侧带略缩图" showArrow thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" thumb-size="sm" rightText="小图" />
		
			<!-- <uni-list-item :show-extra-icon="true" showArrow :extra-icon="extraIcon" title="列表左侧带扩展图标" /> -->
			
			<uni-list-item rightText="">
				<view class="">
					什么鬼？
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
	
	.chat-custom-right {
	    flex: 1;
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: flex-end;
	}
	
	.chat-custom-text {
	    font-size: 12px;
	    color: #999;
	}
</style>
