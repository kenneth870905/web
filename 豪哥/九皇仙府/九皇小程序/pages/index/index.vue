<template>
	<view class="container">
		<view class="header">
			<image src="@/static/indexBg.jpg" mode="widthFix"></image>
		</view>
		<view class="list" v-for="item2 in 20">
			<view class="item1" @click="xuanze(item)" v-for="item in parkList">
				<view class="item2">
					{{item.name}}
				</view>
			</view>
		</view>
		
		<view class="ogOut">
			<view class="" @click="goOut()">
				退出
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				parkList:[]
			}
		},
		methods: {
			goOut(){
				uni.removeStorageSync('jiuhuangToken')
				uni.redirectTo({
				    url: '/pages/login'
				});
			},
			xuanze(item){
				uni.navigateTo({
					url:"/pages/xuanZe2/xuanZe2?id="+item.id+'&name='+item.name
				})
			},
			getParkList(){
				this.$http('/park',{page:1, size:1000},'get').then(x=>{
					console.log('查询园区',x)
					this.parkList=x.data
				})
			}
		},
		onLoad() {
			wx.hideHomeButton()
			let token = uni.getStorageSync('jiuhuangToken')
			if(token){
				this.getParkList()
			}else{
				uni.redirectTo({
				    url: '/pages/login'
				});
			}
		},
		onShow() {
			let token = uni.getStorageSync('jiuhuangToken')
			if(token){
				this.getParkList()
			}else{
				uni.redirectTo({
				    url: '/pages/login'
				});
			}
		}
	}
</script>

<style lang="scss">
.header {
	image{
		width: 100%;
	}
}

.list{
	display: flex;
	padding: 30rpx;
	margin-bottom: 50px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.item1{
		width: calc(50% - 16rpx);
		border: 2rpx solid #2b838a;
		margin: 0rpx 0rpx 30rpx;
		padding: 10rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.item2{
		font-size: 28rpx;
		// background: #2b838a;
		// background: url("/static/bg1.png"),linear-gradient(to left, #328944, #247cdc) ;
		background: url("/static/bg1.png") ;
		background-color: #2b838a;
		background-color:#4e5199 ;
		line-height: 80rpx;
		color: #fff;
		font-weight: bold;
		text-align: center;
		border-radius: 10rpx;
		position: relative;
	}
}

.ogOut{
	position: fixed;
	left: 0px;
	bottom: 0px;
	width: 100%;
	padding: 10px;
	text-align: center;
	background: #dabc58;
	color: #fff;
}


</style>
