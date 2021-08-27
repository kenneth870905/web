<template>
	<view>
		<view class="status_bar"></view>
		<view class="t1">
			<image src="../static/image/jiangbei.png" mode="aspectFit"></image>
			<a>Open with an app</a>
			<image src="../static/image/jiangbei.png" mode="aspectFit"></image>
		</view>
		
		<!-- <button type="default" @click="open()">打开颜色选择器</button>
		<view class="ceshi">
			颜色测试
		</view> -->
		<!-- <t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker> -->
		
		<view class="t2">
			<view class="text-1">
				Welcome Back
			</view>
			<view class="text-2">
				Quality Guarantee
			</view>
		</view>
		
		<swiper :autoplay="true" :circular="true" class="box-3">
			<swiper-item v-for="item in data.lunBo">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="box-4">
			<view class="item" v-for="item in data.product" @click="xiangqing(item)">
				<view class="img">
					<image :src="item.cover" mode="aspectFit"></image>
				</view>
				<view class="title-1">
					{{item.title}}
				</view>
				<view class="price">
					{{item.price}}
				</view>
			</view>
		</view>
		
		<newTabber />
	</view>
</template>

<script>
	// import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	import newTabber from '@/components/azidingyi/newTabber.vue'
	import {mapState , mapMutations , mapActions} from 'vuex'
	export default {
		components:{
			newTabber,
			// tColorPicker
		},
		data() {
			return {
				color: {r: 0,g: 34,b: 255,a: 0.6},
			};
		},
		computed:{
			...mapState({
				data:x=>x.data,
			})
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			...mapActions({
				设置颜色:"设置颜色"
			}),
			open() {
				this.$refs.colorPicker.open();
			},
			// confirm(e) {
				// this.setItem(['color',e.hex])
				// // #ifdef APP-PLUS
				// 	const currentWebview = this.$mp.page.$getAppWebview();
				// 	currentWebview.evalJS(
				// 		`window.document.documentElement.style.setProperty('--color', '${e.hex}')`
				// 	)
				// // #endif
				// // #ifndef APP-PLUS
				// 	document.body.style.setProperty('--color',e.hex);
				// // #endif
			// },
			xiangqing(item){
				uni.navigateTo({
					url:"/pages/products/productDetails?id="+item.id
				})
			}
		},
		onLoad() {
			// uni.hideTabBar()
			console.log('home')
			
			// this.设置颜色()
		}
	}
</script>

</style>

<style lang="scss" scoped>
.ceshi{
	color: var(--color);
}
.t1{
	height: 50px;
	display: flex;
	padding: 0px 5px;
	align-items: center;
	text-align: center;
	background: #f3f3f3;
	box-shadow: 0.33vw 0.33vw 1px rgba(0,0,0,.15);
	a{
		flex: 1;
	}
	image{
		width: 40px;
	}
}

.t2{
	padding: 15px 0px 15px;
	text-align: center;
	.text-1{
		font-size: 38rpx*2;
		color: #2196f3;
		font-weight:bold;
	}
	.text-2{
		color: #9e9e9e;
	}
}

.box-3{
	height: 450rpx*2;
	image{
		width: 100%;
		height: 100%;
	}
}

.box-4{
	width: 94vw;
	margin: 15px auto 0px;
	padding-bottom: 80px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	.item{
		width: calc((100% - 3vw)/2);
		margin-top: 4vw;
		box-shadow: 0.33vw 0.33vw 1vw rgba(0,0,0,.15);
		border-radius: 1vw;
		background: #fff;
	}
	.img{
		height: 44vw;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.title-1{
		margin: 2vw;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-align: center;
		font-size: 3.33vw;
	}
	.price{
		text-align: center;
		color: #f44336;
		margin-bottom: 2vw;
	}
}

</style>
