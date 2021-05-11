<template>
	<view class="productDetails">
		<swiper class="box_1" :circular="true" autoplay="true" :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in sp.imgs">
				<image :src="api_url+'/'+item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="box-2">
			<!-- <view class="xiaoshou">
				<i class="icon iconfont iconhuo"></i>
				已售数量：10
			</view> -->
			<view class="title">{{sp.name}}</view>
			<view class="jiage">{{sp.levelOnePrice}}元</view>
		</view>

		<!-- <jinDian class="jinDian" /> -->

		<!-- 正在热卖 -->
		<!-- <view class="box-3">
			<view class="title">
				正在热卖
			</view>
			<view class="list">
				<view class="item" @click="产品详情(item)" v-for="item in list">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFit"></image>
					<view class="text">{{item.name}}</view>
				</view>
			</view>
		</view> -->

		<view class="box-4">
			<view :class="{active:type==1}" @click="scrollTo(1)">
				商品详情
			</view>
			<!-- <view class="">
				购买记录
			</view> -->
			<!-- <view :class="{active:type==2}" @click="scrollTo(2)">
				热销推荐
			</view> -->
		</view>

		<view class="box-5">
			<rich-text :nodes="sp.description"></rich-text>
		</view>
		<!-- <view class="box-6">
			正在开发中
		</view> -->

		<!-- <jinDian /> -->

		<!-- <view class="box-7">
			<view class="title">— 最新商品 —</view>
			<view class="list">
				<view class="item" @click="产品详情(item)" v-for="(item,index) in list">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFit"></image>
					<view class="xiangqing">
						<view class="name">{{item.name}}</view>
						<view class="jiage">￥{{item.levelOnePrice}}元</view>
					</view>
				</view>
			</view>
		</view> -->

		<view class="foot">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="leftClick"
				@buttonClick="buttonClick" />
		</view>

		<vk-data-goods-sku-popup v-if="sku_key" v-model="sku_key" :custom-action="findGoodsInfo" :useCache="false" :mode="1" border-radius="20"
			@add-cart="addCart" @buy-now="buyNow"></vk-data-goods-sku-popup>
		<!-- 加入购物车 -->
		<!-- <jiaRuGouWuChe ref="jiaRuGouWuChe" :type="type" :sp="sp" /> -->

	</view>
</template>

<script>
	import { mapState , mapMutations } from 'vuex'
	// import jiaRuGouWuChe from './components/jiaRuGouWuChe'
	// import jinDian from './components/jinDian.vue'
	
	// https://ext.dcloud.net.cn/plugin?id=2848  规格插件
	var that = ''
	export default {
		data() {
			return {
				type: 1, // 1商品详情 2热销推荐
				options: [{
					icon: 'cart',
					text: '购物车',
					info:0
				}],
				buttonGroup: [{
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
				id: 0,
				sp: {
					imgs: []
				},
				api_url: this.$api_url,
				type: 0, // 0 加入购物车 1 直接购买
				list: [], //正在热卖

				sku_key: false,
			};
		},
		computed: {
			...mapState({
				loginInfo: state => state.loginInfo,
				baseInfo: state => state.baseInfo,
				购物车:state=>state.购物车
			}),
		},
		methods: {
			...mapMutations({
				setItem:"setItem",
				添加购物车:"添加购物车"
			}),
			leftClick(e) {
				console.log(e, 'leftClick')
				uni.switchTab({
					url:'/pages/shoppingCart/shoppingCart'
				})
			},
			buttonClick(e) {
				console.log(e, 'buttonClick')
				this.sku_key = true
			},
			findGoodsInfo(){
				let productAttributes =that.sp.productAttributes
				let sku_list =[]
				let spec_list = [{name:"规格",list:[]},{name:"尺寸",list:[]}]
				for (var i=0;i< productAttributes.length;i++) {
					let item = productAttributes[i]
					sku_list.push({
						_id: item.id,
						image:that.$api_url+'/'+item.colorImg,
						price:item.price * 100,
						sku_name_arr:[item.color,item.size],
						stock:item.count
					})
					if(!spec_list[0].list.find(x=>x.name==item.color)){
						spec_list[0].list.push({name:item.color})
					}
					if(!spec_list[1].list.find(x=>x.name==item.size)){
						spec_list[1].list.push({name:item.size})
					}
				}
				let data ={
					goods_thumb: that.$api_url+'/'+that.sp.coverImg,
					sku_list:sku_list,
					spec_list:spec_list
				}
				return data
				// return new Promise((resolve, reject)=>{
				// 	setTimeout(()=>{
				// 		resolve(data)
				// 	},2000)
				// })
			},
			addCart(item) {
				this.sku_key=false
				console.log(item, '添加到购物车')
				let sp = this.sp
					delete sp.description //删除介绍免得数据太多了
				let g = {
					sp:sp,
					number:item.buy_num,
					guige:item.sku_name_arr,
					guigeId:item._id,
					t:Math.random()
				}
				console.log(g)
				this.添加购物车(g)
				uni.showToast({
					title:'添加成功',icon:'none'
				})
				// uni.switchTab({
				// 	url:'/pages/shoppingCart/shoppingCart'
				// })
			},
			buyNow(item) {
				console.log(item, '马上购买')
				let sp = this.sp
					delete sp.description //删除介绍免得数据太多了
				let g = {
					sp:sp,
					number:item.buy_num,
					guige:item.sku_name_arr,
					guigeId:item._id,
					t:Math.random()
				}
				console.log(g)
				// this.添加购物车(g)
				this.setItem(['确认购物商品',[g]])
				this.sku_key=false
				uni.navigateTo({
					url:'/pages/queRenGouMai'
				})
			},
			scrollTo(type) {
				if (type == 1) {
					new Promise(resolve => {
						let query = wx.createSelectorQuery();
						query.select('.box_1').boundingClientRect();
						query.select('.box-2').boundingClientRect();
						// query.select('.jinDian').boundingClientRect();
						query.select('.box-3').boundingClientRect();
						query.select('.box-4').boundingClientRect();
						query.exec(function(res) {
							resolve(res);
						});
					}).then(res => {
						console.log(res)
						var h = 0
						res.forEach(x => {
							h += x.height
						})
						wx.pageScrollTo({
							scrollTop: h
						})
					});
				} else {
					new Promise(resolve => {
						let query = wx.createSelectorQuery();
						query.select('.box_1').boundingClientRect();
						query.select('.box-2').boundingClientRect();
						// query.select('.jinDian').boundingClientRect();
						query.select('.box-3').boundingClientRect();
						query.select('.box-4').boundingClientRect();
						query.select('.box-5').boundingClientRect();
						query.exec(function(res) {
							resolve(res);
						});
					}).then(res => {
						console.log(res)
						var h = 0
						res.forEach(x => {
							h += x.height
						})

						wx.pageScrollTo({
							scrollTop: h
						})
					});
				}
			},
			onPageScroll(e) {
				// console.log(e)
				// uni.createSelectorQuery().select('.box-7').boundingClientRect(dome => {
				// 	this.type = dome.top > 150 ? 1 : 2
				// }).exec()
			},
			产品详情(item) {
				uni.navigateTo({
					url: `/pages/productDetails?id=${item.id}`
					// url: `/pages/productDetails`
				})
			},
			goumai(index) {
				if (!this.loginInfo.id) {
					uni.showModal({
						title: "提示",
						content: '登录后才能购买商品是否现在去登录？',
						showCancel: true,
						success(e) {
							if (e.confirm) {
								uni.switchTab({
									url: "/pages/my/personalCenter"
								})
							}
						}
					})
					return
				}
				this.type = index
				this.$refs.jiaRuGouWuChe.open()
			},
			getSP() {
				this.$http(`/api/product/${this.id}`).then(x => {
					// console.log('获取商品',x)
					let data = x.data
						data.description =  data.description ? data.description.replace(/<img/g, '<img style="max-width:100%;height:auto" ') : ''
					this.sp = data
				}).catch(err => {})
			},
			getList() {
				var query = {
					page: 1,
					size: 4,
					isSeckill: false	//非秒杀
				}
				this.$http('/api/product', query, 'GET').then(x => {
					// console.log('商品列表',x)
					this.list = x.data;
				})
			},
		},
		onShow() {
			
		},
		onLoad(option) {
			that = this
			this.id = option.id
			// this.id = 7
			this.getSP()
			this.getList()
			// console.log(this.购物车)
			this.options[0].info = this.购物车.length
		},
		watch:{
			购物车(){
				this.options[0].info = this.购物车.length
			}
		}
	};
</script>

<style scoped lang="scss">
	.productDetails {
		padding: 0px 0px 60px;
	}

	.box_1 {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.box-2 {
		background: #fff;
		position: relative;
		margin: 0px 0px 5px;

		.xiaoshou {
			position: absolute;
			top: -28rpx;
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

			i {
				color: #e70000;
				margin-right: 5px;
			}
		}

		.title {
			padding: 26rpx 28rpx 0px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 25rpx;
			color: #333;
		}

		.jiage {
			padding: 40rpx 28rpx 28rpx;
			color: #ff2020;
			font-size: 25rpx;
			font-weight: bold;
		}
	}

	.box-3 {
		background: #fff;
		margin: 5px 0px 0px;
		padding: 1px 0px 40rpx;

		.title {
			margin: 40rpx 0px;
			font-size: 25rpx;
			color: #333333;
			text-align: center;
		}

		.list {
			overflow: auto;
			white-space: nowrap;
			padding: 0px 0px 0px 28rpx;
		}

		.item {
			width: 240rpx;
			display: inline-block;
			margin: 0px 28rpx 0px 0px;

			image {
				width: 100%;
				height: 240rpx;
				box-sizing: border-box;
				border: 1px solid #dcdcdc;
			}

			.text {
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

	.box-4 {
		position: sticky;
		top: 0px;
		z-index: 1;
		height: 80rpx;
		border-bottom: 1px solid #ccc;
		background: #fff;
		display: flex;
		justify-content: space-around;
		line-height: 80rpx;
		font-size: 25rpx;
		color: #333;

		.active {
			position: relative;

			&::after {
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

	.box-5 {
		background: #fff;
		padding: 28rpx;
		margin: 0px 0px 8px;
	}

	.box-7 {
		padding: 0px 28rpx;

		.title {
			padding: 42rpx 0px;
			text-align: center;
			font-size: 25rpx;
			color: #333;
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.item {
			width: 335rpx;
			background: #fff;
			margin-bottom: 17rpx;

			image {
				width: 100%;
				height: 335rpx;
				border-bottom: 1px solid #eee;
			}

			.xiangqing {
				padding: 5px;
				position: relative;
			}

			.name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 25rpx;
				color: #333333;
			}

			.jiage {
				font-size: 25rpx;
				color: #ff2020;
				margin-top: 30rpx;
			}

			.icon-box {
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

				i {
					font-size: 28rpx;
				}
			}
		}
	}

	.foot {
		position: fixed;
		z-index: 1;
		width: 100%;
		left: 0px;
		bottom: 0px;
		border-top: 1px solid #eee;
	}
</style>
