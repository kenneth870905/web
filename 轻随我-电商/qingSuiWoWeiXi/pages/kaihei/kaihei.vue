<template>
	<view>
		<view class="box-1">
			今日秒杀
		</view>
		
		<view class="list">
			<view class="sp" v-for="item in list">
				<view class="img">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				</view>
				<view class="title-1">{{item.name}}</view>
				<view class="foot">
					<text class="yuanjia">秒杀价 ￥{{item.seckillPrice}}</text>
					<text @click="xiangqing(item)" class="btn-1">去秒杀</text>
				</view>
				<view class="hengxian"></view>
			</view>
		</view>
		
		<view class="loading">
			{{loadingText[loading]}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				query:{
					page:0,
					size:5,
					isSeckill:true,
					// isRecommend:'',  推荐
					// isHomePage:""	首页
				},
				total:0,
				list:[],
				loading:1,	//加载中 1 加载完成 2 没有更多
				loadingText:['正在加载','加载完成','没有更多了']
			};
		},
		methods:{
			xiangqing(item) {
				uni.navigateTo({
					url: `/pages/shangPin/pingTuan?id=${item.id}`
				});
			},
			getList(){
				if(this.loading==0 || this.loading==2) return
				this.loading = 0
				this.query.page++
				this.$http('/api/product',this.query).then(x=>{
					console.log(x)
					if(x.code===0){
						this.total = x.total
						this.list = [...this.list , ...x.data]
						this.loading = this.total > this.list.length ? 1 : 2
					}else{
						this.loading = 2
					}
				}).catch(err=>{
					this.loading=2
				})
			},
			init(){
				this.query.page = 0 
				this.total = 0
				this.list = []
				this.loading = 1
				this.getList()
			}
		},
		onShow() {
			this.init()
		},
		onReachBottom(){
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.box-1 {
	width: 167rpx;
	height: 54rpx;
	margin: 27rpx auto 0px;
	text-align: center;
	line-height: 54rpx;
	background-color: #000000;
	color: #fff;
	font-size: 25rpx;
}

.list .sp:last-child{
	.hengxian{
		display: none;
	}
}
.sp{
	background: #fff;
	padding: 0px 0px 1px;
	.img {
		height: 435rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.title-1{
		padding: 27rpx 28rpx 0px;
		font-size: 25rpx;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: bold;
	}
	.foot{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 30rpx 30rpx;
	}
	.yuanjia{
		font-size: 21rpx;
		margin-right: 38rpx;
		color: #ff2020;
	}
	// .xianjia {
	// 	font-size: 21rpx;
	// 	color: #ff2020;
	// 	font-weight: bold;
	// 	flex:1;
	// }
	.btn-1{
		width: 125rpx;
		height: 42rpx;
		background-color: #e50000;
		line-height: 42rpx;
		font-size: 21rpx;
		color: #fff;
		text-align: center;
	}
	.hengxian{
		width: 699rpx;
		height: 1px;
		background: #dcdcdc;
		margin: 0px auto 27rpx;
	}
}

.loading{
	text-align: center;
	font-size: 12px;
	line-height: 44px;
	color: #333;
}

</style>
