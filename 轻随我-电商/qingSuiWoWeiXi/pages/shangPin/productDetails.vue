<template>
	<view class="productDetails">
		<swiper class="box_1" :circular="true" autoplay="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in sp.imgs"><image :src="api_url+'/'+item" mode="aspectFill"></image></swiper-item>
		</swiper>
		
		<view class="box-2">
			<view class="xiaoshou">
				<i class="icon iconfont iconhuo"></i>
				已售数量：99+
			</view>
			<view class="title">
				{{sp.name}}
			</view>
			<view class="jiage">
				{{sp.levelTwoPrice}}-{{sp.levelOnePrice}}元
			</view>
		</view>
		
		<jinDian />
		
		<!-- 正在热卖 -->
		<view class="box-3">
			<view class="title">
				正在热卖
			</view>
			<view class="list">
				<view class="item" @click="产品详情(item)" v-for="item in list">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFit"></image>
					<view class="text">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-4">
			<view class="active">
				商品详情
			</view>
			<view class="">
				购买记录
			</view>
			<view class="">
				热销推荐
			</view>
		</view>

		<view class="box-5">
			<rich-text :nodes="description"></rich-text>
		</view>
		<!-- <view class="box-6">
			正在开发中
		</view> -->

		<jinDian />

		<view class="box-7">
			<view class="title">— 大家都在买 —</view>
			<view class="list">
				<view class="item" @click="产品详情(item)" v-if="index<4" v-for="(item,index) in list">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFit"></image>
					<view class="xiangqing">
						<view class="name">{{item.name}}</view>
						<view class="jiage">￥{{item.levelOnePrice}}元</view>
						<view class="icon-box">
							<i class="icon iconfont iconGroup-"></i>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="foot">
			<i @click="跳转购物车()" class="icon iconfont iconqicheqianlian-"></i>
			<text class="btn-1" @click="goumai(1)">立即购买</text>
			<text class="btn-2" @click="goumai(0)">加入购物车</text>
		</view>

		
		<!-- 底部 -->
		<!-- <view class="goods-carts"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view> -->
		
		<!-- 加入购物车 -->
		<jiaRuGouWuChe ref="jiaRuGouWuChe" :type="type" :sp="sp"/>

	</view>
</template>

<script>
import { mapState } from 'vuex'
import jiaRuGouWuChe from './components/jiaRuGouWuChe'
import jinDian from './components/jinDian.vue'
export default {
	components:{
		jinDian,
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
			api_url:this.$api_url,
			type:0,	// 0 加入购物车 1 直接购买
			list:[],	//正在热卖
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
		跳转购物车(){
			uni.navigateTo({
				url:"/pages/my/gouWuChe"
			})
		},
		产品详情(item){
			console.log(item)
			uni.navigateTo({
				url:`/pages/shangPin/productDetails?id=${item.id}`
			})
		},
		goumai(index){
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
			this.type = index
			this.$refs.jiaRuGouWuChe.open()
		},
		getSP(){
			this.$http(`/api/product/${this.id}`).then(x=>{
				this.sp = x.data
			}).catch(err=>{})
		},
		getList() {
			var query = {
				page: 1,
				size: 10,
				isSeckill:false
			}
			this.$http('/api/product', query, 'GET').then(x => {
				if (x.code === 0)
					this.list = x.data;
			})
		},
	},
	mounted() {
		// this.$refs.gouMaiQueRen.open()
	},
	onLoad(option) {
		this.id = option.id
		console.log(this.id)
		// this.id = 24
		this.getSP()
		this.getList()
	}
};
</script>

<style scoped lang="scss">
.productDetails {
	padding: 0px 0px 60px;
}

.box_1 {
	height: 690rpx;
	image {
		width: 100%;
		height: 100%;
	}
}

.box-2{
	background: #fff;
	position: relative;
	margin: 0px 0px 5px;
	.xiaoshou{
		position: absolute;
		top:-28rpx;
		right: 0px;
		width: 210rpx;
		height: 56rpx;
		background-color: #000000;
		border-top-left-radius: 56rpx;
		border-bottom-left-radius: 56rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 17rpx;
		color: #fff;
		i{
			color:#e70000;
			margin-right: 5px;
		}
	}
	.title{
		padding:26rpx 28rpx 0px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 25rpx;
		color: #333;
	}
	.jiage{
		padding: 40rpx 28rpx 28rpx;
		color: #ff2020;
		font-size: 25rpx;
		font-weight: bold;
	}
}

.box-3{
	background: #fff;
	margin: 5px 0px 0px;
	padding: 1px 0px 40rpx;
	.title{
		margin: 40rpx 0px;
		font-size: 25rpx;
		color: #333333;
		text-align: center;
	}
	.list{
		overflow: auto;
		white-space: nowrap;
		padding: 0px 0px 0px 28rpx;
	}
	.item{
		width: 240rpx;
		display: inline-block;
		margin: 0px 28rpx 0px 0px;
		image{
			width: 100%;
			height: 240rpx;
			box-sizing: border-box;
			border: 1px solid #dcdcdc;
		}
		.text{
			margin-top: 15rpx;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 25rpx;
			height: 64rpx;
		}
	}
}

.box-4{
	height: 80rpx;
	border-bottom: 1px solid #ccc;
	background: #fff;
	display: flex;
	justify-content: space-around;
	line-height: 80rpx;
	font-size: 25rpx;
	color: #333;
	.active{
		position: relative;
		&::after{
			position: absolute;
			left: 0px;
			right: 0px;
			margin: auto;
			bottom: 0px;
			content: '';
			width: 70rpx;
			height: 4rpx;
			background-color: #000000;
		}
	}
}

.box-5{
	background: #fff;
	padding:28rpx;
	margin: 0px 0px 8px;
}

.box-7{
	padding: 0px 28rpx;
	.title{
		padding: 42rpx 0px;
		text-align: center;
		font-size: 25rpx;
		color: #333;
	}
	.list{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.item{
		width: 335rpx;
		background: #fff;
		margin-bottom: 17rpx;
		image{
			width: 100%;
			height: 335rpx;
			border-bottom: 1px solid #eee;
		}
		.xiangqing{
			padding: 5px;
			position: relative;
		}
		.name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 25rpx;
			color: #333333;
		}
		.jiage{
			font-size: 25rpx;
			color: #ff2020;
			margin-top: 70rpx;
		}
		.icon-box{
			width: 53rpx;
			height: 53rpx;
			background-color: #f5f5f5;
			text-align: center;
			line-height: 53rpx;
			position: absolute;
			bottom: 22rpx;
			right: 13rpx;
			color: #ff2020;
			border-radius: 100%;
			i{
				font-size: 28rpx;
			}
		}
	}
}

.foot{
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	display: flex;
	background: #fff;
	border-top: 1px solid #eee;
	height: 115rpx;
	justify-content: space-between;
	align-items: center;
	padding:0px 28rpx;
	box-sizing: border-box;
	i{
		font-size: 56rpx;
		flex: 1;
		margin: 0px 0px 0px 22rpx;
	}
	.btn-1,
	.btn-2{
		width: 239rpx;
		height: 83rpx;
		border-radius: 7rpx;
		text-align: center;
		line-height: 83rpx;
		font-size: 25rpx;
		color: #fff;
	}
	.btn-1{
		background: #e50000;
		margin: 0px 50rpx 0px 0px;
	}
	.btn-2{
		background: #000000;
	}
}


</style>
