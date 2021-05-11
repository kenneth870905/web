<template>
	<view class="gouwuche">
		<view class="title">
			<view class="">
				共<text>{{list.length}}</text>件商品
			</view>
			<text class="" @click="type=type==1? 2 : 1">
				{{type==1 ? '编辑' :"完成"}}
			</text>
		</view>
		
		<view class="item" v-for="item in list">
			<view class="icon-box" @click="选中切换(item)">
				<text :class="{iconweixuanzhong:!item.active , iconxuanzhong:item.active}" class="icon iconfont"></text>
				<!-- <text class="icon iconfont iconxuanzhong"></text> -->
			</view>
			<view class="img-1">
				<image :src="api_url +'/' + item.product.coverImg" mode="aspectFill"></image>
			</view>
			<view class="miaoShu">
				<view class="title2">{{item.product.name}}</view>
				<!-- <view class="">使用积分购买</view> -->
				<view class="jinE">
					<text>￥{{item.product.levelOnePrice}}-{{item.product.levelTwoPrice}}</text>
				</view>
				<view class="shiJiJiaGe">
					实际价：￥{{loginInfo.level==2 ? item.product.levelTwoPrice : item.product.levelOnePrice}}
				</view>
				<!-- <jjbtn @input="input($event,item)" class="shuliang" v-model="item.count" min="1"></jjbtn> -->
			</view>
		</view>
		
		<view class="buttom">
			<view class="l" @click="全选()">
				<icon :class="class1" class="icon iconfont"></icon>
				<text>全选（{{xuanZhong.length}}）</text>
			</view>
			<view class="r">
				<view v-if="type==1">
					<text>￥{{zongJinE}}</text>
					<button @click="结算()" type="default">结算</button>
				</view>
				<button @click="删除()" class="shanchu" v-if="type==2">
					删除
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	// import jjbtn from '@/components/zidingyi/jiajianBtn.vue'
	import { mapState  , mapMutations } from 'vuex'
	export default {
		components:{
			// jjbtn
		},
		data() {
			return {
				api_url:this.$api_url,
				type:"1",
				query:{
					page:1,
					size:1000
				},
				list:[],
				loading:false
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo
			}),
			class1(){
				return this.xuanZhong.length==this.list.length ? 'iconxuanzhong' : 'iconweixuanzhong'
			},
			// 选中商品
			xuanZhong(){
				return this.list.filter(x=>x.active)
			},
			// 总金额
			zongJinE(){
				var l = this.list.filter(x=>x.active)
				var 金额 = 0;
				l.forEach(item=>{
					if(this.loginInfo.level==2){
						金额 +=item.count * item.product.levelTwoPrice
					}else{
						金额 +=item.count * item.product.levelOnePrice
					}
				})
				return 金额.toFixed(2);
				// return new Intl.NumberFormat('en-IN', {minimumFractionDigits:2,maximumFractionDigits:2}).format(金额)
				// return  new Intl.NumberFormat('en-IN', { currency:'CNY',style:"currency"}).format(金额)
			}
		},
		methods:{
			...mapMutations({
				setItem:'setItem'
			}),
			选中切换(item){
				item.active = !item.active
			},
			全选(){
				if(this.xuanZhong.length==this.list.length){
					this.list.forEach(x=>x.active=false)
				}else{
					this.list.forEach(x=>x.active = true)
				}
			},
			async 删除(){
				if(this.xuanZhong.length==0) {
					uni.showToast({
						title:"请选择商品",
						icon:'none'
					})
					return
				}
				await new Promise((resolve, reject) => {
					uni.showModal({title:"提示",content:"确定删除?",showCancel:true,success(res){
							if(res.confirm){
								resolve(res)
							}else{
								return
							}
						}
					})
				})
				
				var l = []
				this.xuanZhong.forEach(x=>{
					l.push({id:x.id})
				})
				uni.showLoading({
					title:"加载中"
				})
				this.$http(`/api/user/${this.loginInfo.id}/cart`,l,'DELETE').then(x=>{
					if(x.code===0){
						uni.showToast({
							title:'删除成功'
						})
					}else{
						uni.showToast({
							title:'删除失败，请联系管理员',
							icon:'none'
						})
					}
					this.获取购物车()
				}).catch(err=>{
					uni.showToast({
						title:'网络错误，稍后再试',
						icon:'none'
					})
				})
			},
			获取购物车(){
				this.loading = true
				this.$http(`/api/user/${this.loginInfo.id}/cart`,this.query).then(x=>{
					console.log(x)
					if(x.code===0){
						var data = x.data
						data.forEach(item=>{
							item.active = false
						})
						this.list = data
					}
					this.loading = false
				}).catch(err=>{
					this.loading = false
				})
			},
			input(e,item){
				// console.log(e,item.count,item )
				uni.showLoading({
					title:'加载中'
				})
				var o = {id: item.id,count: item.count}
				this.$http(`/api/user/${this.loginInfo.id}/cart`,o,'put').then(x=>{
					uni.hideLoading()
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			结算(){
				if(this.xuanZhong.length==0){
					uni.showToast({
						title:'请选择商品',
						icon:'none'
					})
					return
				}
				this.setItem(['确认购物商品',this.xuanZhong])
				uni.navigateTo({
					url:"/pages/myOrder/quRenOrder"	
				})
			}
		},
		onShow() {
			this.获取购物车()
		}
	}
</script>

<style lang="scss" scoped>
.gouwuche{
	margin-bottom: 80px;
}
	
.title{
	font-size: 12px;
	display: flex;
	line-height: 40px;
	padding: 0px 10px;
	display: flex;
	justify-content: space-between;
	background: #f5f5f5;
	position: sticky;
	top: 0px;
	z-index: 2;
	text{
		color: #ed7c21;
	}
}

.item{
	background: #fff;
	padding: 10px 10px;
	margin: 0px 0px 15px 0px;
	display: flex;
	position: relative;
	.icon-box{
		width: 50px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		.iconxuanzhong{
			color: #ef7b20;
		}
	}
	.img-1{
		width: 90px;
		height: 90px;
		flex-shrink: 0;
		margin: 0px 15px 0px 0px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.miaoShu{
		width: 0;
		flex: 1;
	}
	.title2{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.jinE{
		color: #888;
		font-size: 13px;
		margin: 3px 0px;
	}
	.shiJiJiaGe{
		font-weight: bolder;
		color: #d95c1d;
	}
	.shuliang{
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
}

.buttom{
	position: fixed;
	bottom: 0px;
	left: 0px;
	width: 100%;
	z-index: 2;
	background: #fff;
	border-top: 1px solid #f5f5f5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px 10px;
	box-sizing: border-box;
	.l{
		icon{
			margin:0px 5px 0px 0px ;
		};
		.iconxuanzhong{
			color: #ef7b20;
		}
	}
	.r{
		button{
			margin: 0px 0px 0px 10px;
			width: 100px;
			height: 32px;
			line-height: 32px;
			border-radius: 32px;
			border: none;
			color: #fff;
			font-size: 14px;
		}
		view{
			display: flex;
			align-items: center;
			text{
				color: #da4c50;
				font-weight: bold;
			}
			button{
				background: #e8ba6a;
			}
		}
		.shanchu{
			background: red;
		}
	}
}

</style>
