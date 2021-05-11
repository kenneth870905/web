<template>
	<view class="gouwuche">
		<view class="title">
			<view class="">
				共<text>{{gouwuche.length}}</text>件商品
			</view>
			<text class="" @click="type = type==1? 2 : 1">
				{{type==1 ? '编辑' :"完成"}}
			</text>
		</view>
		<view class="item" v-for="item in gouwuche">
			<view class="icon-box">
				<!-- <checkbox v-model="item.active"/> -->
				<evan-checkbox v-model="item.active" @change="change1()"></evan-checkbox>
			</view>
			<view class="img-1">
				<image :src="api_url+'/'+item.sp.coverImg" mode="aspectFit"></image>
			</view>
			<view class="miaoShu">
				<view class="title2">{{item.sp.name}}</view>
				<view class="chima">{{item.guige[0]}}，{{item.guige[1]}}</view>
				<view class="foot">
					<view class="shiJiJiaGe">
						￥{{item.danjia}}
					</view>
					<uni-number-box min="1" v-model="item.number" class="number-box"></uni-number-box>
				</view>
			</view>
		</view>
		
		<view class="kong" v-if="gouwuche.length==0">
			<view class="img">
				<image src="../../static/image/TB1U0RydwoQMeJjy1XaXXcSsFXa-220-220.png_190x190q90_.webp" mode="widthFix"></image>
			</view>
			<view class="t1">购物车竟然是空的</view>
			<view class="t2">再忙，也要记得买点什么犒赏自己~</view>
		</view>
		
		<view class="buttom">
			<view class="l">
				<evan-checkbox v-model="quanxuan" @change="changeQx()"></evan-checkbox>
				<text>全选（{{xuanZhong.length}}件）</text>
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
	// 是用组件 https://ext.dcloud.net.cn/plugin?id=1236
	// evan-checkbox
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
				loading:false,
				quanxuan:true,
				// gouwuche:[]
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo,
				gouwuche:x=>x.购物车
			}),
			// 选中商品
			xuanZhong(){
				return this.gouwuche.filter(x=>x.active)
			},
			// 总金额
			zongJinE(){
				var l = this.gouwuche.filter(x=>x.active)
				var 金额 = 0;
				l.forEach(item=>{
					金额 +=item.danjia * item.number
				})
				return 金额.toFixed(2);
				// return new Intl.NumberFormat('en-IN', {minimumFractionDigits:2,maximumFractionDigits:2}).format(金额)
			}
		},
		methods:{
			...mapMutations({
				setItem:'setItem',
				删除购物车:"删除购物车"
			}),
			changeQx(){
				this.gouwuche.forEach(item=>{
					item.active = this.quanxuan
				})
			},
			// 点击单个
			change1(){
				this.quanxuan = this.gouwuche.filter(x=>!x.active).length==0 ? true :false
			},
			删除(){
				let l = []
				for(var i=0;i<this.gouwuche.length;i++){
					if(this.gouwuche[i].active){
						l.push(this.gouwuche[i].t)
					}
				}
				this.删除购物车(l)
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
					url:"/pages/queRenGouMai"	
				})
			}
		},
		onShow() {
			
			for (var i= 0;i<this.gouwuche.length;i++) {
				let danjia = this.gouwuche[i].sp.productAttributes.find(x=>x.id==this.gouwuche[i].guigeId).price
					this.$set(this.gouwuche[i],'danjia',danjia)
				this.$set(this.gouwuche[i],'active',true)
			}
			
			// this.获取购物车()
		}
	}
</script>

<style lang="scss" scoped>
.gouwuche{
	margin-bottom: 80px;
}

.kong{
	text-align: center;
	.img{
		width: 90px;
		height: 90px;
		margin: 20px auto;
		image{
			width: 100%;
		}
	}
	.t2{
		color: rgb(153, 153, 153);
		font-size: 13px;
		margin: 10px 0px 0px;
	}
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
	.foot{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.number-box{
		zoom: 0.7;
		box-shadow: 0px 0px 0px 1px #c5c5c5;
	}
	.icon-box{
		width: 50px;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
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
		font-size: 14px;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.shiJiJiaGe{
		font-size: 12px;
		color: #d95c1d;
	}
	.chima{
		background: #f9f9f9;
		width: fit-content;
		font-size: 14px;
		margin: 3px 0px;
		padding: 3px;
		color: rgba($color: #000000, $alpha: 0.6);
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
		display: flex;
		text{
			margin: 0px 0px 0px 3px;
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
