<template>
	<view>
		<view class="tabber">
			<text @click="changeType('')" :class="{active:!query.categoryId}">所有商品</text>
			<text @click="changeType(item.id)" :class="{active:query.categoryId==item.id}" v-for="item in spType">{{item.name}}</text>
		</view>
		
		<view class="shangping">
			<view class="item" v-for="item in spList" @click="go('/pages/productDetails?id='+item.id)">
				<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				<view class="title">{{item.name}}</view>
			</view>
		</view>
		
		<Aloading :loading="loading" :total="total" :length="length"></Aloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				spType:[],
				query:{
					categoryId:"",
					page:0,
					size:6
				},
				spList:[],
				loading:false,
				total:-1
			};
		},
		computed:{
			length(){
				return this.spList.length
			}
		},
		methods:{
			go(path){
				uni.navigateTo({
					url:path
				})
			},
			changeType(type){
				this.query.categoryId=type
				this.query.page=0
				this.spList=[]
				this.total=-1
				this.获取商品()
			},
			获取商品类型(){
				this.$http('/api/category',{page:1,size:1000}).then(x=>{
					// console.log('商品类型',x)
					this.spType=x.data
				}).catch(err=>{})
			},
			获取商品(){
				if(this.loading || (this.total!=-1 && this.total<=this.spList.length)){
					return
				}
				this.loading=true
				this.query.page++
				this.$http('/api/product',this.query).then(x=>{
					// console.log('商品列表',x)
					this.spList = [...this.spList,...x.data]
					this.loading=false
					this.total = x.total
				}).catch(err=>{
					this.total=0
					this.loading=false
				})
			},
			init(){
				this.spType = []
				this.query = {
					categoryId:"",
					page:0,
					size:6
				}
				this.spList = []
				this.loading = false
				this.total = -1
			}
		},
		onShow() {
			this.init()
			this.获取商品类型()
			this.获取商品()
		},
		onReachBottom(){
			console.log('滚动到底了')
			this.获取商品()
		}
	}
</script>

<style lang="scss">
	page{
		background: #f2f2f2;
	}
	.tabber{
		background: #fff;
		border-bottom: 1px solid #eee;
		display: flex;
		line-height: 40px;
		font-size: 14px;
		white-space: nowrap;
		padding: 0px 10px;
		overflow: auto;
		position: sticky;
		top: 0px;
		text{
			padding: 0px 10px;
		}
		.active{
			color: #007aff;
		}
	}
.shangping{
	display: flex;
	padding: 20rpx;
	flex-wrap: wrap;
	justify-content: space-between;
	.item{
		width: (750rpx - 60rpx) / 2;
		box-shadow:0px 0px 3px 0px #c3c3c3;
		margin: 0px 0px 15px;
		border-radius: 3px;
		overflow: hidden;
	}
	image{
		width: 100%;
		height: (750rpx - 60rpx) / 2;
	}
	.title{
		background: #fff;
		font-size: 14px;
		color: #333;
		padding: 5px 5px 8px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
