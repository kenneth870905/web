<template>
	<view>
		<view class="header1">
			<view @click="改变类型('')" :class="{active:query.status==''}">
				全部订单
			</view>
			<!-- <view @click="改变类型(2)" :class="{active:query.status==2}">
				已支付
			</view> -->
			<view @click="改变类型(1)" :class="{active:query.status==1}">
				未支付
			</view>
			<view @click="改变类型(2)" :class="{active:query.status==2}">
				待发货
			</view>
			<view @click="改变类型(4)" :class="{active:query.status==4}">
				待收货
			</view>
			<view @click="改变类型(3)" :class="{active:query.status==3}">
				已取消
			</view>
		</view>
		<view class="list">
			
			<view class="item" v-for="item in list">
				<view class="title">
					<text>{{item.createdAt}}</text>
					<text :class="'status-'+item.status">{{status[item.status]}}</text>
				</view>
				<view class="shangping" @click="查看商品(item2)" v-for="item2 in item.items">
					<image :src="api_url+'/'+item2.product.coverImg" mode="aspectFill"></image>
					<view class="xiangqing">
						<view class="title2">{{item2.product.name}}</view>
						<!-- <view class="jiage">￥{{item2.product.levelTwoPrice}}-{{item2.product.levelOnePrice}}</view> -->
						<view class="chima">{{item2.productAttribute.color}}，{{item2.productAttribute.size}}</view>
						<view class="shijijiage">
							单价：<text>￥{{item2.price}}</text>
							<!-- <text v-if="item.payType==2">￥{{item2.price}}</text> 
							<text v-else>{{item2.price}}积分</text> -->
						</view>
					</view>
					<view class="shuliang">
						x{{item2.count}}
					</view>
				</view>
				<view class="footer1">
					<text>实付 {{item.payType==2 ? '￥'+item.totalPrice : item.totalCreditPrice+' 积分'}}</text>
					<text class="btn statusBtn-2" v-if="item.status==2">待发货</text>
					<text class="btn statusBtn-2" v-if="item.status==5">已收货</text>
					
					<text class="btn statusBtn-quxiao" v-if="item.status==4" @click="收货(item)">确认收货</text>
					<text class="btn statusBtn-quxiao" v-if="item.status==1" @click="取消(item)">取消</text>
					<text class="btn statusBtn-zhifu" v-if="item.status==1" @click="支付(item)">支付</text>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="loadingStatus"></uni-load-more>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				loadingStatus:'more',    //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				query:{
					page:0,
					size:10,
					status:''		//未支付，已支付
				},
				list:[],
				total:0,
				api_url:this.$api_url,
				status:{1:'未支付',2:'待发货（已支付）',3:'已取消',4:'待收货',5:'已收货'},
			};
		},
		methods:{
			...mapMutations({
				setItem:"setItem"
			}),
			async 收货(item){
				await new Promise((resolve, reject) => {
					 uni.showModal({
						title:"提示",
						content:'确认收货请点击下方确定按钮！',
						success:(r)=>{
							if(r.confirm) resolve()
						}
					})
				});
				console.log('点击了确认收货')
				this.$http(`/api/order/${item.id}`,{status:5},'PUT').then(x=>{
					if(x.code===0){
						uni.showToast({
							title:'收货成功'
						})
						item.status=5
					}else{
						uni.showToast({title:x.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({
						title:'网络错误，稍后再试',
						icon:'none'
					})
				})
			},
			支付(item){
				console.log(item)
				this.setItem(['二次付款',item])
				uni.navigateTo({
					url:"/pages/zaiCiFuKuan"
				})
			},
		 	async 取消(item){
				await new Promise((resolve, reject) => {
					 uni.showModal({
						title:"提示",
						content:'确定取消订单？',
						success:(r)=>{
							if(r.confirm) resolve()
						}
					})
				});
				this.$http(`/api/order/${item.id}`,'','DELETE').then(x=>{
					if(x.code===0){
						uni.showToast({
							title:'取消成功'
						})
						item.status=3
					}else{
						uni.showToast({title:x.message,icon:'none'})
					}
				}).catch(err=>{
					uni.showToast({
						title:'网络错误，稍后再试',
						icon:'none'
					})
				})
			},
			改变类型(type){
				this.query.status = type
				this.query.page = 0
				this.loadingStatus = 'more',
				this.list = []
				this.getList()
			},
			getList(){
				console.log('getlist')
				if(this.loadingStatus=='loading' || this.loadingStatus=='noMore'){
					return
				}
				this.query.page++
				this.$http('/api/order',this.query).then(x=>{
					if(x.code==0){
						this.list = [...this.list , ...x.data];
						this.total = x.total
						this.loadingStatus = this.list.length>=this.total ? 'noMore' : 'more'
					}else{
						this.loadingStatus='noMore'
					}
				}).catch(err=>{
					this.loadingStatus='noMore'
				})
			},
			go(item){
				uni.navigateTo({
					url:`/pages/shangPin/productDetails?id=${item.productId}`
				})
			},
			评价(){
				uni.showToast({
					title:'暂未开通',
					icon:'none'
				})
			},
			查看商品(item){
				uni.navigateTo({
					url:"/pages/productDetails?id="+item.productId
				})
			},
			//下拉刷新
			refresh(){
				this.loadingStatus = 'more',    //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				this.query.page = 0
				this.query.size = 10
				this.list = []
				this.total = 0
				this.getList()
			}
		},
		onShow() {
			this.refresh()
			// this.getList()
		},
		mounted() {
		},
		onReachBottom(){
			this.getList()
		},
		onPullDownRefresh(){
			console.log('refresh');
			this.refresh()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style lang="scss" scoped>
	.chima{
		background: #f9f9f9;
		width: fit-content;
		font-size: 14px;
		margin: 3px 0px;
		padding: 3px;
		color: rgba($color: #000000, $alpha: 0.6);
	}
.header1{
	height: 34px;
	display: flex;
	text-align: center;
	background: #f5f5f5;
	position: sticky;
	top: 0px;
	font-size: 12px;
	view{
		width: 100px;
		line-height: 34px;
	}
	.active{
		border-bottom: 1px solid red;
	}
}

.list{
	padding: 10px;
}
.item{
	background: #fff;
	margin: 0px 0px 10px;
	padding: 1px 10px;
	border-radius: 10px;
	.title{
		line-height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		font-size: 13px;
		text:nth-child(1){
			color: #969696;
			font-size: 12px;
		}
		.status-1{
			color: #ff6801;
		}
	}
	.shangping{
		display: flex;
		padding: 10px 0px;
		border-bottom: 1px solid #eee;
		image{
			width: 90px;
			height: 90px;
			flex-shrink: 0;
			margin: 0px 15px 0px 0px;
			border-radius: 5px;
		}
		.xiangqing{
			width: 0;
			flex: 1;
			font-size: 14px;
		}
		.title2{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.jiage{
			font-size: 12px;
			color: #b0b0b0;
		}
		.shijijiage{
			margin: 10px 0px 0px;
			color: #b0b0b0;
			
			text{
				color: #ff6801;
				font-weight: bold;
			}
		}
		.shuliang{
			display: flex;
			color: #b0b0b0;
			align-items: center;
		}
	}
	.footer1{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 0px;
		font-size: 13px;
		text:nth-child(1){
			color: #969696;
			font-weight: bold;
			flex: 1;
		}
		.statusBtn-zhifu{
			border: 1px solid #ff6801;
			color: #ff6801;
		}
		.statusBtn-quxiao{
			border: 1px solid #828282;
			color: #828282;
		}
		.btn{
			margin: 0px 0px 0px 5px;
			width: 80px;
			line-height: 26px;
			// border: 1px solid #ff6801;
			// color: #ff6801;
			border-radius: 26px;
			text-align: center;
		}
	}
	
}


</style>
