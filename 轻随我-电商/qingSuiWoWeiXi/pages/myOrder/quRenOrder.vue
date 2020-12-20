<template>
	<view>
		<view class="diZhi" @click="收货地址()">
			<text :class="{active:!shdz.id}">{{shdz.id ? shdz.address : '请选择收货地址'}}</text>
			<icon class="icon iconfont iconarrow-right"></icon>
		</view>
		
		<view class="list">
			<view class="item" v-for="item in spList">
				<image :src="api_url+'/'+item.product.coverImg" mode="aspectFill"></image>
				<view class="xiangqing">
					<view class="title">
						{{item.product.name}}
					</view>
					<view class="jiage">
						<text v-if="!isMiaosha">￥{{item.product.levelOnePrice}}-{{item.product.levelTwoPrice}}</text>
						<text v-if="isMiaosha">￥{{item.product.seckillPrice}}</text>
					</view>
					<view class="jifenjiage" v-if="!isMiaosha">
						<text v-if="item.product.creditPrice">积分价格：{{item.product.creditPrice}}</text>
						<text v-if="!item.product.creditPrice">不可使用积分</text>
					</view>
					<view class="shijijiage" v-if="!isMiaosha">
						实际价格：￥{{loginInfo.level==2 ? item.product.levelTwoPrice : item.product.levelOnePrice}}
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
				<input type="text" v-model="comment" placeholder="建议留言眼先于卖家沟通确认" />
			</view>
			<view class="item2" v-if="!isMiaosha">
				<text>支付方式</text>
				<picker mode="selector" :range="arr" range-key="rangeKey" @change="change1">
					<view>
						{{zhifufangshi.rangeKey}}
						<icon class="icon iconfont iconarrow-right"></icon>
					</view>
				</picker>
			</view>
			<view class="item2">
				<text>商品金额</text>
				<text class="jine">{{zongjine}}</text>
			</view>
		</view>
		
		<view class="bottom">
			<view class="l">
				共计{{spList.length}}件，合计：<text class="jine">{{zongjine}}</text>
			</view>
			<button type="default" @click="提交订单()">确认购买</button>
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
				comment:"",		//备注
				orderid:"",
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo,
				spList:x=>x.确认购物商品,
				shdz:x=>x.选择收货地址
			}),
			isMiaosha(){
				return this.spList[0].product.isSeckill
			},
			zongjine(){
				// 秒杀商品
				if(this.spList[0].product.isSeckill){
					var 金额 = 0;
					this.spList.forEach(item=>{
						金额 +=item.count * item.product.seckillPrice
					})
					return '￥'+ 金额.toFixed(2);
				}else if(this.zhifufangshi.payType==2){
					var 金额 = 0;
					this.spList.forEach(item=>{
						if(this.loginInfo.level==2){
							金额 +=item.count * item.product.levelTwoPrice
						}else{
							金额 +=item.count * item.product.levelOnePrice
						}
					})
					return '￥'+ 金额.toFixed(2);
					// var num = new Intl.NumberFormat('en-IN', {minimumFractionDigits:2,maximumFractionDigits:2}).format(金额)
					// return '￥'+num 
				}else{
					var 积分 = 0;
					this.spList.forEach(item=>{
						积分 +=item.count * item.product.creditPrice
					})
					return 积分+' 积分'
				}
			}
		},
		methods:{
			收货地址(){
				uni.navigateTo({
					url:'/pages/address/address'
				})
			},
			change1(e){
				this.zhifufangshi = this.arr[e.detail.value]
			},
			提交订单(){
				if(!this.shdz.id){
					uni.showToast({
						title:'请选择收货地址',
						icon:'none'
					})
					return
				}
				if(this.zhifufangshi.payType==1 && this.spList.find(x=>x.product.creditPrice==0)){
					uni.showModal({
						title:'提示',
						showCancel:false,
						content:'您所购买的商品中包含有（不可使用积分的商品），无法使用积分支付，请选择现金支付，或者重新选择商品！'
					})
					return
				}
				var obj ={
						"payType": this.zhifufangshi.payType, 		//支付方式,积分支付1，现金支付2
						"items": [],			//商品列表
						"comment":this.comment,
						addressId: this.shdz.id , //收货地址Id
					}
				this.spList.forEach(item=>{
					obj.items.push({productId:item.productId,count:item.count})
				})
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				this.$http('/api/order',obj,'POST').then(x=>{
					if(x.code===0){
						
						//积分支付直接删除
						this.删除购物车()
						this.orderid = x.data.id
						if(this.zhifufangshi.payType==2){
							uni.showToast({ title:'订单提交成功' })
							this.支付接口()
						}else{
							uni.showToast({ title:'购买成功' })
							setTimeout(()=>{
								uni.navigateBack()
							},2000)
						}
					}else {
						uni.showToast({
							title:x.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title: '网络错误,稍后再试',
						icon:'none'
					});
				})
			},
			删除购物车(){
				var list = []
				this.spList.forEach(item=>{
					if(item.id){
						list.push({id:item.id})
					}
				})
				if(list.length>0){
					this.$http(`/api/user/${this.loginInfo.id}/cart`,list,'DELETE')
				}
			},
			支付接口(){
				this.$http(`/api/order/${this.orderid}/pay`,'',"POST").then(x=>{
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
								}else{
									uni.showToast({ title:'支付失败',icon:'none' })
								}
								setTimeout(()=>{
									uni.navigateBack()
								},2000)
							},
							fail:(err)=>{
								uni.showToast({ title:'支付失败',icon:'none' })
								setTimeout(()=>{
									uni.navigateBack()
								},2000)
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
					setTimeout(()=>{
						uni.navigateBack()
					},2000)
				})
			}
		},
		mounted() {
			console.log(this.spList)
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
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.active{
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
	margin: 0px 0px 80px;
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
