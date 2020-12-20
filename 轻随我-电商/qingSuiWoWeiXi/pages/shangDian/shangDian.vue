<template>
	<view class="shangDian">
		<view class="header-1">
			<!-- <text @click="type=item.id" v-if="index<=4" v-for="(item,index) in typelist" :class="{active:item.id==type}">{{item.name}}</text> -->
			<text @click="分类(item)" v-if="index<=4" v-for="(item,index) in typelist" :class="{active:item.id==type}">{{item.name}}</text>
		</view>
		
		<view class="box-1">
			<view class="title">
				轻随我新品
			</view>
			<view class="list">
				<view class="item"  @click="xiangqing(item)" v-for="item in splist">
					<view class="img">
						<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
					</view>
					<view class="xiangqing">
						<view class="jiage">
							{{item.levelOnePrice}}元
						</view>
						<view class="title2">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="box-2">
			<image class="img1" src="http://8.210.239.106/images/2020-12-06/13/50/ULVdJLrN2lzuVleF.png" mode="aspectFill"></image>
			<image class="img1" src="http://8.210.239.106/images/2020-12-06/13/50/0Xxo8tm1QuLjcrMR.png" mode="aspectFill"></image>
			<view class="list1">
				<image class="img2" src="http://8.210.239.106/images/2020-12-06/13/50/YkQMe68sJ32CUJ7H.png" mode="aspectFill"></image>
				<image class="img2" src="http://8.210.239.106/images/2020-12-06/13/50/noeIdMqZv9VxRDe5.png" mode="aspectFill"></image>
			</view>
		</view>
		
		<!-- 推荐 -->
		<view class="box-3">
			<view class="left">
				<view class="title">
					<text>好友推荐</text>
					<text>大家都在买</text>
				</view>
				<view class="list">
					<view class="img" @click="xiangqing(item)" v-if="index<4" v-for="(item,index) in splist">
						<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<!-- <view class="fengexian"></view> -->
			<!-- <view class="right">
				<view class="title">
					<text>轻随我</text>
					<text>只在这里</text>
				</view>
				<view class="list">
					<view class="img" v-if="index<4" v-for="(item,index) in splist">
						<image src="http://8.210.239.106/images/2020-12-06/13/56/sI2TW3AzU4FfqC8b.png" mode="aspectFill"></image>
					</view>
				</view>
			</view> -->
		</view>
		
		
		<view class="box-4" v-for="item in typelist2">
			<image class="bg" :src="api_url+'/'+item.img" mode="aspectFill"></image>
			<view class="title">
				<text>{{item.name}}</text>
			</view>
			<view class="list">
				<view class="item" @click="xiangqing(item_2)" v-for="item_2 in item.sp">
					<image :src="api_url+'/'+item_2.coverImg" mode="aspectFill"></image>
					<view class="text">
						{{item_2.name}}
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="box-5">
			<view class="" v-for="item in typelist2">
				<image :src="api_url+'/'+item.img" mode="aspectFill"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="box-6">
			<view @click="xiangqing(item)" class="item" v-for="item in splist">
				<image :src="api_url+'/'+item.coverImg" mode="aspectFit"></image>
				<view class="xiangqqing">
					<view class="title">
						{{item.name}}
					</view>
					<view class="jiage">
						￥{{item.levelOnePrice}}元
					</view>
					<view class="icon-1">
						<i class="icon iconfont iconGroup-"></i>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				type:0,
				typelist:[{name:"推荐",id:0}],
				typelist2:[],
				//推荐商品
				splist:[],
				query:{
					page:1,
					size:100,
					isRecommend:true
				},
			};
		},
		methods:{
			分类(item){
				uni.navigateTo({
					url:'/pages/fenlei/fenlei?id='+item.id
				})
			},
			dianjiSwiper(item) {
				console.log(item);
			},
			xiangqing(item) {
				uni.navigateTo({
					url: `/pages/shangPin/productDetails?id=${item.id}`
				});
			},
			获取商品(){
				this.$http('/api/product', this.query, 'GET').then(x => {
						if (x.code === 0) {
							this.splist = x.data;
						}
				}).catch(err => {
				});
			},
			获取分类(){
				this.$http('/api/category',{page:1,size:1000},'GET').then(x=>{
					this.typelist = [...this.typelist , ...x.data] 
					let data = x.data
					data.forEach(item=>{
						item.sp = []
					})
					this.typelist2 = data 
					for (var i = 0 ;i<this.typelist2.length;i++) {
						((i)=>{
							var q = {
								page:1,
								size:10,
								categoryId:this.typelist2[i].id,
								isSeckill:false
							}
							this.$http('/api/product',q).then(res=>{
								this.typelist2[i].sp = res.data
								this.$set(this.typelist2,i,this.typelist2[i])
							})
						})(i)
					}
				}).catch(err=>{
				})
			},
		},
		onShow() {
			this.获取分类()
			this.获取商品()
		}
	}
</script>

<style lang="scss" scoped>
.shangDian{
	padding:70rpx 0px 0px;
}
.header-1{
	position: fixed;
	z-index: 2;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 70rpx;
	background-color: #000000;
	line-height: 70rpx;
	color: #fff;
	font-size: 21rpx;
	display: flex;
	justify-content: space-between;
	padding: 0px 30rpx;
	box-sizing: border-box;
	.active{
		font-size: 33rpx;
		color: #fb6a13;
	}
}

.box-1{
	margin: 16rpx 0px 0px ;
	background: #fff;
	.title{
		font-size: 25rpx;
		color: #333333;
		padding: 40rpx 28rpx 16rpx;
	}
	.list{
		display: flex;
		overflow: auto;
		padding: 0px 15rpx;
	}
	.item{
		flex-shrink: 0;
		width: 180rpx;
		flex-shrink: 0;
		margin: 0px 15rpx;
	}
	.img{
		height: 180rpx;
		border: 1px solid #dcdcdc;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.xiangqing{
		position: relative;
		padding: 22rpx 0px 35rpx;
		.jiage{
			font-size: 21rpx;
			color: #fb6a13;
			position: absolute;
			top: -16rpx;
			right: -10rpx;
		}
		.title2{
			white-space: pre-wrap;
			font-size: 22rpx;
			
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

.box-2{
	margin: 16rpx 0px 0px;
	background: #fff;
	padding: 30rpx 30rpx 30rpx;
	.img1{
		width: 100%;
		margin: 0px 0px 30rpx;
	}
	.list1{
		display: flex;
		justify-content: space-between;
		image{
			width: 338rpx;
			height: 180rpx;
		}
	}
}

.box-3{
	margin: 16rpx 0px 0px;
	background: #fff;
	padding:28rpx 30rpx 20rpx;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	.left{
		flex: 1;
	}
	//分割线
	.fengexian{
		height: 160rpx;
		width: 1px;
		background: #dcdcdc;
	}
	.title{
		font-size: 25rpx;
		color: #333333;
		margin: 0px 0px 13rpx;
		text{
			display: block;
		}
		text:nth-child(2){
			color: #fb6a13;
			font-size: 21rpx;
		}
	}
	.list{
		display: flex;
		// justify-content: space-between;
		// border-right: solid 1px #dcdcdc;
	}
	.img{
		width: 160rpx;
		height: 160rpx;
		background-color: #ffffff;
		border-left: solid 1px #dcdcdc;
		border-top: solid 1px #dcdcdc;
		border-bottom: solid 1px #dcdcdc;
		border-right: 1px solid #dcdcdc;
		&:not(:nth-child(1)){
			margin-left: calc(25% - 160rpx) ;
		}
		image{
			width: 100%;
			height: 100%;
		}
	}
}

.box-4{
	height: 620rpx;
	position: relative;
	padding: 1px 0px;
	margin: 0px 0px 16rpx;
	.bg{
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		filter: brightness(0.5);
	}
	.title{
		margin: 80rpx 26rpx 0px;
		position: relative;
		z-index: 1;
		text-align: center;
		font-size: 50rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text{
			margin: 0px 48rpx;
		}
		&::after,
		&::before{
			width: 0;
			height: 2px;
			background: #fff;
			content: '';
			flex: 1;
		}
	}
	.list{
		padding: 0px 26rpx;
		margin: 75rpx 0px 0px;
		position: relative;
		z-index: 1;
		display: flex;
		overflow: auto;
		.item{
			flex-shrink: 0;
			width: 250rpx;
			height: 290rpx;
			background-color: #ffffff;
			margin: 0px 28rpx 0px 0px;
		}
		image{
			width: 100%;
			height: 210rpx;
		}
		.text{
			padding: 13rpx;
			font-size: 21rpx;
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

.box-5{
	display: flex;
	flex-wrap: wrap;
	background: #fff;
	padding: 20rpx 30rpx;
	justify-content: space-between;
	view{
		width: 164rpx;
		height: 125rpx;
		margin: 0px 0px 12rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		color: #fff;
		image{
			position: absolute;
			left: 0px;
			top: 0px;
			width: 100%;
			height: 100%;
			filter: brightness(0.5);
		}
		text{
			position: relative;
			z-index: 1;
		}
	}
}

.box-6{
	padding: 160rpx 30rpx 30rpx;
	background: #fff;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.item{
		border: solid 1rpx #dcdcdc;
		width: 335rpx;
		margin: 0px 0px 17rpx;
	}
	image{
		width: 335rpx;
		height: 331rpx;
	}
	.xiangqqing{
		border-top: 1px solid #dcdcdc;
		height: 180rpx;
		position: relative;
		padding: 28rpx 12rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title{
			font-size: 25rpx;
		}
		.jiage{
			font-size: 25rpx;
			color: #ff2020;
		}
		.icon-1{
			position: absolute;
			right: 13rpx;
			bottom: 22rpx;
			width: 53rpx;
			height: 53rpx;
			line-height: 53rpx;
			border-radius: 100%;
			background-color: #f5f5f5;
			font-size: 28rpx;
			color: #ff2020;
			text-align: center;
		}
	}
}

</style>
