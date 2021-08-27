<template>
	<view class="Feedback">
		<view class="tabs">
			<text :class="{active:current==0}" @click="current=0">COMPLETED</text>
			<text :class="{active:current==1}" @click="current=1">WAIT</text>
		</view>
		
		<swiper class="swiper-box" :current="current" @change="changeSwiper">
			<swiper-item>
				<scroll-view scroll-y="true" class="swiper-item">
					<view class="huifu" v-for="item in 3">
						<view class="">content：内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</view>
						<view class="">whatsapp：whatapp的账号</view>
						<view class="">Outer ID：111</view>
						<view class="">2021-01-20 20:20</view>
						<view class="">reply：？？？？？？</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<text>2</text>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0
			};
		},
		methods:{
			changeSwiper(e){
				this.current = e.detail.current
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'/pages/Feedback/FeedBackAdd'
			})
		}
	}
</script>

<style lang="scss" scoped>

.Feedback{
	height: 100%;
	display: flex;
	flex-direction: column;
}

.tabs{
	flex-shrink: 0;
	line-height: 44px;
	display: flex;
	color: #fff;
	background: #009688;
	text-align: center;
	text{
		flex: 1;
		position: relative;
	}
	.active::after{
		position: absolute;
		width: 100%;
		height: 2px;
		left: 0px;
		bottom: 0px;
		content: '';
		background: red;
	}
}

.swiper-box{
	flex: 1;
	.swiper-item{
		height: 100%;
	}
	.huifu{
		padding: 10px;
		font-size: 12px;
		color: #666;
		border-bottom: 1px solid #cacaca;
		view{
			margin: 5px 0px;
		}
	}
}

</style>
