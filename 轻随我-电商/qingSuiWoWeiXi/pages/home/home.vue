<template>
	<view class="container">
		<!-- <view class="souSuo">
			<view class="">
				<image src="../../static/images/sousuo.png" mode="widthFix"></image>
				<input type="text" value="" placeholder="搜索宝贝"/>
				<text>搜索宝贝或卖家</text>
			</view>
		</view> -->

		<swiper class="banner" :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in banner" @click="dianjiSwiper(item)">
				<view class="swiper-item"><image :src="item" mode="aspectFill"></image></view>
			</swiper-item>
		</swiper>

		<view class="list1">
			<view class="item" v-for="item in list" @click="xiangqing(item)">
				<image class="fengmian" :src="api_url + '/' + item.coverImg" mode="aspectFill"></image>
				<view class="title">{{ item.name }}</view>
				<view class="jiage">
					<text class="fuhao">￥</text>
					<text class="jine">{{ item.levelOnePrice }}</text>
					<!-- <text class="renshu">0人购买</text> -->
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingStatus"></uni-load-more>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			banner: ['http://8.210.239.106/images/2020-11-03/20/42/ghsLndVzmRlLsN8s.jpeg'],
			loadingStatus: 'more', //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
			query: {
				page: 0,
				size: 10
			},
			list: [],
			total: 0,
			api_url: ''
		};
	},
	computed: {
		...mapState({
			state: state => state
		})
	},
	methods: {
		dianjiSwiper(item) {
			console.log(item);
			uni.showToast({
				title: '商品尚未发布敬请期待',
				icon: 'none'
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
			if (this.loadingStatus == 'loading' || this.loadingStatus == 'noMore') {
				return;
			}
			this.query.page++;
			this.loadingStatus = 'loading';
			this.$http('/api/product', this.query, 'GET')
				.then(x => {
					if (x.code === 0) {
						this.total = x.total;
						this.list = [...this.list, ...x.data];
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

			(this.loadingStatus = 'more'), //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				(this.query = {
					page: 0,
					size: 10
				});
			this.list = [];
			this.total = 0;
			this.getList();
			uni.stopPullDownRefresh();
			setTimeout(() => {
				uni.hideLoading();
			}, 1000);
		},
		GetRequest(scene){
			let str = decodeURIComponent(scene)
			let theRequest = new Object();
			let strs = str.split('&');
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
			}
			return theRequest;
		}
	},
	mounted() {
		this.getList();
		this.api_url = this.$api_url;
	},
	onReachBottom() {
		this.getList();
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
	onShow() {},
	onPullDownRefresh() {
		this.refresh();
	}
};
</script>

<style lang="scss" scoped>
.souSuo {
	z-index: 1;
	position: sticky;
	/* #ifdef H5 */
	top: 44px;
	/* #endif */
	/* #ifndef H5 */
	top: 0px;
	/* #endif */
	background: #ff5000;
	padding: 5px;
	color: #eaeaea;
	view {
		display: flex;
		align-items: center;
		height: 38px;
		background: #c21300;
	}
	image {
		width: 20px;
		margin: 0px 10px;
	}
}

.banner {
	width: _opx(350);
	height: _opx(120);
	margin: 15px auto 15px;
	border-radius: 10px;
	overflow: hidden;
	.swiper-item {
		height: 100%;
	}
	image {
		width: 100%;
		height: 100%;
	}
}

.list1 {
	padding: _opx(10);
	margin: 0px auto 0px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.item {
		width: _opx(173);
		background: #fff;
		margin: 0px 0px 10px;
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
		image {
			width: 100%;
			height: _opx(173);
		}
	}
	.title {
		color: rgba(0, 0, 0, 0.87);
		line-height: initial;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		// display: -webkit-box;
		// word-wrap: break-word;
		// -webkit-line-clamp: 2;
		// -webkit-box-orient:vertical;
		padding: 0px 8px;
		font-size: 13px;
	}
	.jiage {
		display: flex;
		padding: 3px 8px;
		color: #ff5000;
		align-items: flex-end;
		.fuhao {
			font-size: 12px;
		}
		.jine {
			flex: 1;
			font-size: 14px;
			font-weight: bold;
		}
		.renshu {
			font-size: 12px;
			color: #b9b9b9;
		}
	}
}
</style>
