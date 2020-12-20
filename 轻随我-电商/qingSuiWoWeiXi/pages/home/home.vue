<template>
	<view class="container">
		<view class="souSuo">
			<i @click="sousuo()" class="icon iconfont iconsousuo"></i>
			<image src="../../static/images/logo1.png" mode="widthFix"></image>
			<i @click="saoma()" class="icon iconfont iconrichscan_icon"></i>
		</view>

		<swiper class="banner" :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in list_2" @click="dianjiSwiper(item)">
				<view class="swiper-item"><image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image></view>
			</swiper-item>
		</swiper>
		
		<view class="box-1">
			<view class="">
				<image src="http://8.210.239.106/images/2020-12-06/21/22/4SNcyCvXUECxoBE4.png" mode="aspectFill"></image>
				<text>首页</text>
			</view>
			<view class="" @click="$toTabBar('/pages/shangDian/shangDian')">
				<image src="http://8.210.239.106/images/2020-12-06/21/22/hOHeguenhHItS3aJ.png" mode="aspectFill"></image>
				<text>商店</text>
			</view>
			<view class="" @click="$toTabBar('/pages/kaihei/kaihei')">
				<image src="http://8.210.239.106/images/2020-12-06/21/22/p8INTU6n8nVSjj6b.png" mode="aspectFill"></image>
				<text>秒杀</text>
			</view>
			<view class="" @click="$toTabBar('/pages/my/personalCenter')">
				<image src="http://8.210.239.106/images/2020-12-06/21/22/nKYgkciH03YByQ2P.png" mode="aspectFill"></image>
				<text>我的</text>
			</view>
			<!-- <view class="">
				<text>更多</text>
			</view> -->
		</view>
		
		<view class="box-2">
			<view class="item" v-for="item in list_2">
				<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				<view class="xiangqing">
					<view class="title1">
						{{item.title}}
					</view>
					<view class="text1">
						{{item.brief}}
					</view>
					<view class="foot">
						<view class="left">
							<i class="icon iconfont iconchakan"></i>
							99+
							<i class="icon iconfont iconfenxiang"></i>
							0
						</view>
						<view class="btn-1" @click="xiangqing(item)">
							详情
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-3">
			<view class="title1">
				商店精选
				<view class="icon-box">
					<i class="icon iconfont iconxingzhuang-sanjiaoxing"></i>
				</view>
			</view>
			<view class="list1">
				<view class="item" v-for="item in list" @click="xiangqing(item)">
					<image class="fengmian" :src="api_url + '/' + item.coverImg" mode="aspectFill"></image>
					<view class="title">
						<view class="title-2">
							{{ item.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			banner: [
				'https://i.loli.net/2020/12/06/3HXBJC9Lnhi64Ky.png',
				'http://8.210.239.106/images/2020-12-06/20/56/ShgR27nPStXj9BOT.png'
			],
			loadingStatus: 'more', //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
			//查询店铺精选
			query: {
				page: 0,
				size: 10,
				// isHomePage:false,
				isSeckill:false
			},
			list: [], // 商店精选
			list_2:[],	//放置首页的商品
			total: 0,
			api_url: this.$api_url,
			
		};
	},
	computed: {
		...mapState({
			state: state => state
		})
	},
	methods: {
		sousuo(){
			uni.navigateTo({
				url:'/pages/souSuo/souSuo'
			})
		},
		saoma(){
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
			    }
			});
		},
		dianjiSwiper(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/shangPin/productDetails?id=${item.id}`
			});
		},
		go(path) {
			uni.navigateTo({
				url: path
			});
		},
		xiangqing(item) {
			uni.navigateTo({
				url: `/pages/shangPin/productDetails?id=${item.id}`
			});
		},
		getList() {
			// if (this.loadingStatus == 'loading' || this.loadingStatus == 'noMore') {
			// 	return;
			// }
			this.query.page=1;
			this.loadingStatus = 'loading';
			this.$http('/api/product', this.query, 'GET')
				.then(x => {
					if (x.code === 0) {
						this.total = x.total;
						// this.list = [...this.list, ...x.data];
						this.list = x.data
					}
					if (this.list.length >= this.total) {
						this.loadingStatus = 'noMore';
					} else {
						this.loadingStatus = 'more';
					}
				})
				.catch(err => {
					this.loadingStatus = 'noMore';
				});
		},
		refresh() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});

			this.loadingStatus = 'more' //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
			this.query = {
					page: 0,
					size: 10
				};
			this.list = [];
			this.total = 0;
			this.getList();
			this.获取首页商品()
			
			uni.stopPullDownRefresh();
			setTimeout(() => {
				uni.hideLoading();
			}, 1000);
		},
		// 获取url 类型的参数 主要用于获取分享的
		GetRequest(scene){
			let str = decodeURIComponent(scene)
			let theRequest = new Object();
			let strs = str.split('&');
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
			}
			return theRequest;
		},
		获取首页商品(){
			var q = {
				page:1,
				size:100,
				isHomePage:true
			}
			this.$http('/api/product',q).then(x=>{
				if(x.code===0)
				this.list_2 = x.data
			})
		}
	},
	mounted() {
	},
	onReachBottom() {
		// this.getList();
	},
	onLoad(option) {
		console.log('home获取option', option);
		// option.scene = 'superiorId%3D2%26fenxiang%3D3' //测试用的
		var scene = {}
		if(option.scene){
			scene = this.GetRequest(option.scene)
		}
		console.log('scene',scene)
		
		let uid2 = scene.superiorId ? scene.superiorId : '';
		// this.topath = '/home/home'
		this.state.topath = option.topath ? option.topath : '';
		this.state.fxuid = option.uid ? option.uid : uid2;
	},
	onShow() {
		this.getList();
		this.获取首页商品()
	},
	onPullDownRefresh() {
		this.refresh();
	}
};
</script>

<style lang="scss" scoped>
.souSuo {
	z-index: 1;
	position: fixed;
	width: 100%;
	box-sizing: border-box;
	top: 0px;
	height: 110rpx;
	background: rgba(0,0,0,0.2);
	padding: 0px 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	image {
		width: 74rpx;
	}
	i{
		color: #fff;
		font-size: 34rpx;
	}
}

.banner {
	height: 690rpx;
	.swiper-item {
		height: 100%;
	}
	image {
		width: 100%;
		height: 100%;
	}
}

.box-1{
	background: #fff;
	padding: 22px 28rpx;
	display: flex;
	justify-content: space-between;
	view{
		// width: 133rpx;
		// height: 133rpx;
		width: 160rpx;
		height: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background: #000;
		image{
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}
		text{
			position: relative;
			z-index: 1;
			font-size: 25rpx;
			color: #fff;
		}
	}
}

.box-2{
	.item{
		image{
			width: 100%;
			height: 533rpx;
		}
	}
	.xiangqing{
		background: #fff;
		padding: 24rpx 28rpx 30rpx;
	}
	.title1{
		font-size: 33rpx;
		color: #333333;
	}
	.text1{
		font-size: 25rpx;
		color: #333;
		margin: 40rpx 0px 0px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	.foot{
		display: flex;
		align-items: center;
		margin: 20rpx 0px 0px;
		.left{
			flex: 1;
			display: flex;
			align-items: center;
			font-size: 22rpx;
			color: #999999;
			.icon{
				margin-right: 3px;
			}
			.iconfenxiang{
				font-size: 21rpx;
				margin-left: 40rpx;
			}
		}
		.btn-1{
			width: 93rpx;
			height: 45rpx;
			line-height: 43rpx;
			text-align: center;
			border: solid 1rpx #999999;
			font-size: 25rpx;
			color: #999999;
		}
	}
}

.box-3{
	background: #fff;
	margin-top: 16rpx;
	padding: 36rpx 0px 0px 0rpx;
	.title1{
		text-align: center;
		position: relative;
		font-size: 28rpx;
		color: #333333;
		.icon-box{
			position: absolute;
			top: 0px;
			right: 42rpx;
			width: 36rpx;
			height: 36rpx;
			border-radius: 100%;
			background: #000000;
			line-height: 36rpx;
			color: #fbd413;
			transform: rotate(90deg);
			i{
				font-size: 20rpx;
			}
		}
	}
	.list1 {
		padding: 0px 0px 0px 28rpx;
		margin: 42px 0px 10px;
		overflow: auto;
		display: flex;
		.item {
			flex-shrink: 0;
			width: 250rpx;
			margin: 0px 28rpx 0px 0px;
			font-size: 0;
			image {
				border: 1px solid #eee;
				width: 100%;
				height: 210rpx;
			}
		}
		.fengmian{
			height: 210rpx;
		}
		.title{
			background: #000;
			padding: 5px;
			font-size: 22rpx;
			color: #fff;
			height: 80rpx;
			box-sizing: border-box;
		}
		.title-2 {
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}


</style>
