<template>
	<view class="productDetails">
		<swiper class="box_1" :circular="true" autoplay="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in sp.imgs"><image :src="api_url+'/'+item" mode="aspectFill"></image></swiper-item>
		</swiper>

		<view class="box2">
			<view class="jiage">
				<text>￥</text>
				<text>{{sp.levelTwoPrice}}-{{sp.levelOnePrice}}</text>
			</view>
			<view class="qita">
				<text v-show="sp.creditPrice">可用积分</text>
				<text v-show="sp.maxPurchaseCount">用户限购{{sp.maxPurchaseCount}}份</text>
			</view>
			<view class="name">{{sp.name}}</view>
			<view class="qita2">
				<text>货源地：江苏</text>
				<!-- <text>月销量：--</text> -->
			</view>
			<view class="lianxi">联系方式：{{baseInfo.wxAccount}}</view>
		</view>

		<view class="box3">
			<view class="title">商品详情</view>
			<view class="xiangqing">
				<rich-text :nodes="description"></rich-text>
			</view>
		</view>

		<view class="pingjia">
			<view class="title">评价</view>
			<view class="zanwu">暂无评价</view>
		</view>
		
		<!-- 底部 -->
		<view class="goods-carts"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
		
		<!-- 加入购物车 -->
		<jiaRuGouWuChe ref="jiaRuGouWuChe" :type="type" :sp="sp"/>

	</view>
</template>

<script>
import { mapState } from 'vuex'
import jiaRuGouWuChe from './components/jiaRuGouWuChe'
export default {
	components:{
		jiaRuGouWuChe
	},
	data() {
		return {
			options: [
				// {
				// 	icon: 'headphones',
				// 	text: '客服'
				// }
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#fda900',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ff4e00',
					color: '#fff'
				}
			],
			id:0,
			sp:{
				imgs:[]
			},
			api_url:"",
			type:0,	// 0 加入购物车 1 直接购买
		};
	},
	computed:{
		...mapState({
			loginInfo:state=>state.loginInfo,
			baseInfo:state=>state.baseInfo
		}),
		description(){
			return this.sp.description ? this.sp.description.replace(/<img/g, '<img style="max-width:100%;height:auto" ') : ''
		}
	},
	methods: {
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			if(!this.loginInfo.id){
				uni.showModal({
					title:"提示",
					content:'登录后才能购买商品是否现在去登录？',
					showCancel:true,
					success(e){
						if(e.confirm){
							uni.switchTab({
								url:"/pages/my/personalCenter"
							})
						}
					}
				})
				return
			} 
			
			this.type = e.index
			this.$refs.jiaRuGouWuChe.open()
		},
		getSP(){
			this.$http(`/api/product/${this.id}`).then(x=>{
				this.sp = x.data
			}).catch(err=>{
			})
		}
	},
	mounted() {
		// this.$refs.gouMaiQueRen.open()
	},
	onLoad(option) {
		this.api_url = this.$api_url
		this.id = option.id
		// this.id = 24
		this.getSP()
	}
};
</script>

<style scoped lang="scss">
.productDetails {
	padding: 0px 0px 60px;
}

.box_1 {
	height: 100vw;
	image {
		width: 100%;
		height: 100%;
	}
}

.box2 {
	background: #ffffff;
	margin: 10px;
	border-radius: 10px;
	padding: 10px;
	box-shadow: 0px 0px 5px 0px #d2d2d2;
	.jiage {
		color: #ff5000;
		text:nth-child(1) {
			font-size: 18px;
		}
		text:nth-child(2) {
			font-size: 24px;
		}
	}
	.qita {
		text {
			background: #fbe9e4;
			padding: 2px 4px;
			border-radius: 2px;
			color: #ff5000;
			margin: 0px 10px 0px 0px;
			font-size: 12px;
		}
	}
	.name {
		margin: 10px 0px 10px;
		line-height: initial;
		font-weight: bold;
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.qita2 {
		display: flex;
		justify-content: space-between;
		color: rgba(0, 0, 0, 0.38);
	}
	.lianxi {
		color: #525252;
		font-size: 12px;
	}
}

.box3 {
	.title {
		margin: 20px 0px 20px;
		text-align: center;
		position: relative;
		&::after,
		&::before {
			position: absolute;
			top: 50%;
			width: 35%;
			height: 1px;
			content: '';
			background: #8e8e8e;
		}
		&::after {
			left: 10px;
		}
		&::before {
			right: 10px;
		}
	}
	.xiangqing{
		padding: 0px 5px;
	}
}

.pingjia {
	background: #ffffff;
	margin: 10px;
	border-radius: 10px;
	padding: 10px;
	box-shadow: 0px 0px 5px 0px #d2d2d2;
	.zanwu {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		color: #8e8e8e;
	}
}

.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
