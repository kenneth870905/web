<template>
	<view>
		<view class="diZhi" @click="收货地址()">
			<text>请选择收货地址</text>
			<icon class="icon iconfont iconarrow-right"></icon>
		</view>
		
		<view class="list">
			<view class="item" v-for="item in order.items">
				<image :src="api_url+'/'+item.product.coverImg" mode="aspectFill"></image>
				<view class="xiangqing">
					<view class="title">
						{{item.product.name}}
					</view>
					<view class="jiage">
						￥{{item.product.levelOnePrice}}-{{item.product.levelTwoPrice}}
					</view>
					<view class="jifenjiage">
						<text v-if="item.product.creditPrice">积分价格：{{item.product.creditPrice}}</text>
						<text v-if="!item.product.creditPrice">不可使用积分</text>
					</view>
					<view class="shijijiage">
						实际价格：{{order.payType==2 ? '￥'+item.price : item.price+'积分'}}
					</view>
				</view>
				<view class="shuliang">
					x{{item.count}}
				</view>
			</view>
		</view>
		
		<view class="box2">
			<view class="item2">
				<text>备注</text>
				<text>{{order.comment}}</text>
				<!-- <input type="text" v-model="order.comment" placeholder="建议留言眼先于卖家沟通确认" /> -->
			</view>
			<view class="item2">
				<text>支付方式</text>
				<text>{{order.payType==2 ? '现金支付' : "积分支付"}}</text>
				<!-- <picker mode="selector" :range="arr" range-key="rangeKey" @change="change1">
					<view>
						{{zhifufangshi.rangeKey}}
						<icon class="icon iconfont iconarrow-right"></icon>
					</view>
				</picker> -->
			</view>
			<view class="item2">
				<text>商品金额</text>
				<text class="jine">{{order.payType==2 ? '￥'+order.totalPrice : order.totalCreditPrice+'积分'}}</text>
			</view>
		</view>
		<uni-notice-bar text="提示:订单已生成,不可修改支付方式和备注"></uni-notice-bar>

		
		<view class="bottom">
			<view class="l">
				合计：<text class="jine">{{order.payType==2 ? '￥'+order.totalPrice : order.totalCreditPrice+'积分'}}</text>
			</view>
			<button type="default" @click="支付接口()">付款</button>
		</view>
		
		
	</view>
</template>

<script>
	import md5 from 'md5'
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				api_url:this.$api_url,
				arr:[{payType:2,rangeKey:"现金支付"},{payType:1,rangeKey:"积分支付"}],
				zhifufangshi:{payType:2,rangeKey:"现金支付"},
				comment:"",
				orderid:""
			};
		},
		computed:{
			...mapState({
				order:x=>x.二次付款
			}),
		},
		methods:{
			收货地址(){
				uni.showToast({
					title:"暂未开通,敬请期待",
					icon:'none'
				})
			},
			change1(e){
				this.zhifufangshi = this.arr[e.detail.value]
			},
			支付接口(){
				this.$http(`/api/order/${this.order.id}/pay`,'',"POST").then(x=>{
					console.log(x)
					if(x.code===0){
						var data= x.data
						uni.requestPayment({
							provider:'wxpay',
							orderInfo:data,
							timeStamp:data.timeStamp,
							nonceStr:data.nonce_str,
							package:'prepay_id='+data.prepay_id,
							signType:'MD5',
							paySign:data.paySign,
							service:4,
							getOrderStatus:'',
							success:(res)=>{
								if(res.errMsg=="requestPayment:ok"){
									uni.showToast({ title:'支付成功' })
									setTimeout(()=>{
										uni.navigateBack()
									},2000)
								}else{
									uni.showToast({ title:'支付失败',icon:'none' })
								}
							},
							fail:(err)=>{
								uni.showToast({ title:'支付失败',icon:'none' })
							}
						})
					}else{
						uni.showToast({ title:x.message, icon:"none" })
						setTimeout(()=>{
							uni.navigateBack()
						},2000)
					}
				}).catch(err=>{
					uni.showToast({ title:"网络错误，稍后再试", icon:'none' })
				})
			}
		},
		mounted() {
			console.log(this.order)
		}
	}
</script>

<style lang="scss">
.diZhi{
	line-height: 40px;
	padding: 0px 10px;
	display: flex;
	justify-content: space-between;
	background: #fff;
	border-bottom: 2px solid #ede1ba;
	margin: 0px 0px 15px;
	text{
		color: #a0a0a0;
	}
}

.item{
	background: #fff;
	padding: 10px 10px;
	margin: 0px 0px 10px;
	display: flex;
	image{
		width: 80px;
		height: 90px;
		flex-shrink: 0;
		margin: 0px 15px 0px 0px;
	}
	.xiangqing{
		flex: 1;
		width: 0;
		.title{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 16px;
		}
		.jiage,
		.jifenjiage{
			color: #717171;
			font-size: 12px;
			margin: 3px 0px;
		}
		.shijijiage{
			margin: 5px 0px 0px;
			font-weight: bolder;
			font-size: 14px;
			color: #b94b5f;
		}
	}
	.shuliang{
		display: flex;
		align-items: center;
		color: #cccccc;
	}
}

.box2{
	background: #fff;
	line-height: 42px;
	padding: 0px 10px;
	margin: 0px 0px 10px;
	.item2{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #E9E9E9;
		justify-content: space-between;
	}
	text:nth-child(1){
		white-space: nowrap;
		flex-shrink: 0;
		margin: 0px 15px 0px;
	}
	input{
		flex: 1;
		text-align: right;
	}
}

.bottom{
	background: #fff;
	position: fixed;
	left: 0px;
	bottom: 0px;
	width: 100%;
	box-sizing: border-box;
	padding: 10px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 1;
	border-top: 1px solid #eee;
	button{
		margin: 0px;
		height: 35px;
		width: 100px;
		font-size: 14px;
		color: #fff;
		line-height: 35px;
		border: none;
		border-radius: 35px;
		background: #e8b869;
	}
}

.jine{
	font-weight: bold;
	color: #ad404c;
}


</style>
