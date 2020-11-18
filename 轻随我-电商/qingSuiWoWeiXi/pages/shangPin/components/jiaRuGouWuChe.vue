<template>
	<uni-popup ref="popup" type="bottom">
		<view class="box_1">
			<view class="title">
				<text @click="guanbi()" class="icon iconfont iconshanchu"></text>
			</view>
			<view class="jichu">
				<image :src="api_url+'/'+sp.coverImg" mode="aspectFill"></image>
				<view class="right1">
					<view class="jiage">
						<text>￥</text>
						<text>{{sp.levelOnePrice}}-{{sp.levelTwoPrice}}</text>
					</view>
					<!-- <view class="shijijige">
						实际价格：{{shiJiJia}}
					</view> -->
					<view class="jifen">
						积分价格：{{sp.creditPrice ? sp.creditPrice : '不可用积分'}}
					</view>
					<view class="jifen">
						{{sp.maxPurchaseCount ? '限购'+sp.maxPurchaseCount+'份' : '不限购'}}
					</view>
				</view>
			</view>
			<view class="goumaishuliang">
				<text>购买数量</text>
				<jiajian v-model="count" :min="1" :max="sp.maxPurchaseCount ? sp.maxPurchaseCount : ''"/>
			</view>
			<view class="btn-1" :class="{goumai:type}">
				<button @click="确定()">{{type==0 ? '加入购物车' : "确认购买"}}</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import jiajian from '@/components/zidingyi/jiajianBtn.vue'
	import { mapState , mapMutations } from 'vuex'
	export default {
		components:{
			jiajian
		},
		props:{
			sp:{
				default:()=>{}
			},
			type:0
		},
		data() {
			return {
				api_url:'',
				count:1
			};
		},
		computed:{
			...mapState({
				loginInfo:state=>state.loginInfo
			}),
			shiJiJia(){
				return this.loginInfo.level==1 ? this.sp.levelOnePrice : this.sp.levelTwoPrice
			}
		},
		methods:{
			...mapMutations({
				setItem:'setItem'
			}),
			open(){
				this.$refs.popup.open()
			},
			guanbi(){
				this.$refs.popup.close()
			},
			changeNumber(n){
				this.count = parseInt(n)
			},
			确定(){
				if(this.type){
					this.确认购买()
				}else{
					this.加入购物车()
				}
			},
			加入购物车(){
				console.log('加入购物车')
				var obj = {"productId": this.sp.id, "count": this.count}
				uni.showLoading({ title:"加载中" , mask:true })
				this.$http(`/api/user/${this.loginInfo.id}/cart`,obj,"POST").then(x=>{
					console.log(x)
					if(x.code==0){
						uni.showToast({
							title:'加入购物车成功'
						})
						this.$refs.popup.close()
					}else{
						uni.showToast({
							title:x.message,
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:'加入失败，请联系客服',
						icon:'none'
					})
				})
			},
			确认购买(){
				var list = [
					{
						count:this.count,
						productId:this.sp.id,
						product:this.sp
					}
				]
				this.setItem(['确认购物商品',list])
				uni.navigateTo({
					url:"/pages/myOrder/quRenOrder"	
				})
			}
		},
		mounted() {
			this.api_url = this.$api_url
			// this.open()
		}
	}
</script>

<style scoped lang="scss">
	
.box_1{
	background: #fff;
	height: 320px;
	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
	position: relative;
}
.title{
		padding: 2.66667vw 2.66667vw 0;
		text-align: right;
		font-size: 23px;
		line-height: initial;
	}
	
.jichu{
	padding: 0px 15px 15px 15px;
	border-bottom: 1px solid #d8d8d8;
	display: flex;
	image{
		width: 100px;
		height: 100px;
		margin-right: 15px;
	}
	.jiage{
		color: #ff5000;
		font-size: 18px;
		text:nth-child(1){
			font-size: 14px;
		}
	}
	.jifen,
	.shijijige{
		font-size: 12px;
		color: #636363;
		margin: 5px 0px 10px;
	}
	.right1{
		position: relative;
	}
	.number_box{
		position: absolute;
		bottom: 0px;
		left: 0px;
	}
}
	
.btn-1{
	position: absolute;
	left: 0px;
	bottom: 0px;
	width: 100%;
	padding: 15px;
	box-sizing: border-box;
	&.goumai{
		button{
			background: #ff4e00;
		}
	}
	button{
		background: #fda900;
		height: 40px;
		border-radius: 40px;
		line-height: 40px;
		color: #fff;
		font-size: 14px;
	}
}
	

.goumaishuliang{
	display: flex;
	padding: 10px 10px;
	align-items: center;
	justify-content: space-between;
	
}
</style>
