<template>
	<!-- <view class="container"> -->
	<view>
		<swiper :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000" class="swiper-1">
			<swiper-item v-for="item in banner" @click="clickBanner(item)">
				<view class="swiper-item">
					<!-- <image src="../../static/image/Snipaste_2021-04-27_01-48-31.png" mode="aspectFill"></image> -->
					<image :src="api_url+'/'+item.img" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="box-1">
			<view class="" @click="switchTab('/pages/productList/productList')">
				<image src="../../static/image/bg4.png" mode="aspectFill"></image>
				<view>在线商城</view>
			</view>
			<view class="" v-for="(item,index) in wztype" v-if="index<3" @click="go('/pages/ArticleList?categoryId='+item.id)">
				<image :src="api_url+'/'+item.img" mode="aspectFill"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="box-2">
			<image src="../../static/image/Snipaste_2021-04-27_02-06-55.png" mode="widthFix"></image>
		</view>
		
		<view class="title-1">
			<text>商品展示</text>
			<text @click="switchTab('/pages/productList/productList')">查看更多</text>
		</view>
		<view class="box-3">
			<view class="item" v-for="item in spList" @click="go('/pages/productDetails?id='+item.id)">
				<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				<view class="title">{{item.name}}</view>
			</view>
		</view>
		
		<view class="title-1">
			<text>推荐文章</text>
			<text @click="go('/pages/ArticleList')">查看更多</text>
		</view>
		<view class="box-4">
			<view class="item" v-for="item in wzList" @click="go('/pages/article?id='+item.id)">
				<view class="left">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="">
						<view class="t1">
							{{item.title}}
						</view>
						<view class="t2">
							{{item.brief}}
						</view>
					</view>
					<view class="t3">
						<text></text>
						<text>99+人看过</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- <view class="title-1">
			<text>学校信息</text>
		</view>
		<view class="box-5">
			<image src="../../static/image/Snipaste_2021-04-27_02-37-33.png" mode="aspectFill"></image>
		</view> -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				wztype:[],	//文章类型
				spList:[],	//商品
				wzList:[],	//文章列表
				banner:[]
			}
		},
		methods: {
			go(path){
				console.log(path)
				uni.navigateTo({
					url:path
				})
			},
			switchTab(path){
				uni.switchTab({
					url:path
				})
			},
			获取文章类型(){
				this.$http('/api/articleCategory',{page:1,pageSize:1000}).then(x=>{
					console.log('文章分类',x)
					this.wztype = x.data
				}).catch(err=>{
				})
			},
			获取商品(){
				this.$http('/api/product',{page:1,size:5}).then(x=>{
					console.log('商品',x)
					this.spList = x.data
				}).catch(err=>{
				})
			},
			获取文章(){
				this.$http('/api/article',{page:1,size:4}).then(x=>{
					console.log('文章',x)
					this.wzList = x.data
				}).catch(err=>{
				})
			},
			获取轮播(){
				this.$http('/api/banner','').then(x=>{
					console.log('轮播图',x)
					this.banner = x.data
				})
			},
			clickBanner(item){
				if(item.relatedId){
					//关联类型, 文章article, 产品product
					if(item.relatedType=='article'){
						uni.navigateTo({
							url:'/pages/article?id='+item.relatedId
						})
					}else{
						uni.navigateTo({
							url:'/pages/productDetails?id='+item.relatedId
						})
					}
				}
			}
		},
		mounted() {
		},
		onShow() {
			this.获取文章类型()
			this.获取商品()
			this.获取文章()
			this.获取轮播()
		}
	}
</script>


<style lang="scss">
.swiper-1{
	margin: 10px 15px;
	.swiper-item{
		height: 100%;
		border-radius: 10px;
		overflow: hidden;
	}
	image{
		width: 100%;
		height: 100%;
	}
}
.box-1{
	background: #E8FFF3;
	margin: 0px 15px;
	display: flex;
	text-align: center;
	font-size: 14px;
	height: 102px;
	align-items: center;
	color: #333;
	>view{
		width: 25%;
	}
	image{
		width: 46px;
		height: 46px;
	}
}
.box-2{
	margin: 5px 15px 0px;
	image{
		width: 100%;
	}
}
.title-1{
	padding: 15px;
	display: flex;
	justify-content: space-between;
	text:nth-child(1){
		font-weight: bold;
	}
	text:nth-child(2){
		font-size: 14px;
		color: #999999;
	}
}

.box-3{
	padding: 0px 15px 10px;
	overflow: auto;
	display: flex;
	font-size: 14px;
	font-size: #333333;
	.item{
		width: 140px;
		margin: 2px 10px 2px 0px;
		flex-shrink: 0;
		box-shadow: 0px 0px 3px 0px #ababab;
		border-radius: 4px;
		overflow: hidden;
	}
	.title{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding: 3px 5px 5px;
	}
	image{
		width: 100%;
		height: 140px;
	}
}

.box-4{
	margin: 0px 15px;
	.item{
		margin: 0px 0px 20px 0px;
		display: flex;
	}
	.left{
		width: 120px;
		height: 120px;
		flex-shrink: 0;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
	.right{
		width: 0;
		flex-grow: 1;
		padding: 0px 0px 0px 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.t1{
			font-weight: bold;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.t2{
			font-size: 14px;
			color: #999999;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.t3{
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			color: #999999;
		}
	}
}

.box-5{
	margin: 0px 15px 15px;
	height: 147rpx*2;
	image{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
}

</style>
