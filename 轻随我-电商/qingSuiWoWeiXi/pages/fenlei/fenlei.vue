<template>
	<view class="fenlei">
		<view class="left">
			<view @click="点击分类(item)" :class="{active:item.id == id}" v-for="item in typeList">
				{{item.name}}
			</view>
		</view>
		<scroll-view scroll-y="true" class="right" @scrolltolower="底部()">
			<view class="list">
				<view class="item" v-for="item in splist" @click="xiangqing(item)">
					<view class="img-1">
						<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
					</view>
					<view class="title-1">
						{{item.name}}
					</view>
					<view class="footer">
						<text class="danwei">￥</text>
						<text class="jiage">{{item.levelOnePrice}}</text>
						<text class="renqi">99付款</text>
					</view>
				</view>
			</view>
			<view class="Loading">
				<text v-if="loading==1">加载中</text>
				<text v-if="loading==2 && sptotal==0">哎呀~没有找到商品</text>
				<text v-if="loading==2 && sptotal!=0">没有更多了</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				api_url:this.$api_url,
				typeList:[],
				//商品
				query:{
					page:0,
					size:6,
					categoryId:'',
					isSeckill:false
				},
				splist:[],
				sptotal:0,
				loading:0
			};
		},
		methods:{
			点击分类(item){
				this.id = item.id
				this.query.categoryId = item.id
				this.query.page = 0
				this.splist = []
				this.sptotal = 0
				this.loading = 0
				this.获取商品()
			},
			xiangqing(item) {
				uni.navigateTo({
					url: `/pages/shangPin/productDetails?id=${item.id}`
				});
			},
			底部(){
				console.log('底部')
				this.获取商品()
			},
			获取分类(){
				this.$http('/api/category',{page:1,size:100}).then(x=>{
					if(x.code===0){
						this.typeList = x.data
					}
				}).catch(err=>{
				})
			},
			获取商品(){
				if(this.loading==1 || (this.loading==2 && this.splist.length==this.sptotal)){
					return
				}
				this.query.page++
				this.$http('/api/product', this.query, 'GET').then(x => {
					this.loading=2
					if (x.code === 0) {
						this.splist = [...this.splist , ...x.data]
						this.sptotal = x.total
					}
				}).catch(err => {
					this.loading=2
				});
			},
		},
		onLoad(q) {
			this.id = q.id
			// this.id = 6
			this.query.categoryId = this.id
			// console.log(q)
			
			this.获取分类()
			this.获取商品()
		}
	}
</script>

<style lang="scss" scoped>
.fenlei{
	display: flex;
	height: 100vh;
}
.left{
	font-size: 11px;
	width: 60px;
	text-align: center;
	flex-shrink: 0;
	background: #fff;
	view{
		padding: 15px 0px;
		&.active{
			background: #f5f5f5;
		}
	}
}
.right{
	height: 100%;
}
.list{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 10px 10px;
	.item{
		width: calc( (100vw - 60px - 20px) / 2 - 5px);
		background: #fff;
		margin: 0px 0px 10px 0px;
		border-radius: 5px;
		overflow: hidden;
	}
	.img-1{
		height: calc( (100vw - 60px - 20px) / 2 - 5px);
		image{
			width: 100%;
			height: 100%;
		}
	}
	.title-1{
		border-top: 1px solid #eee;
		padding:5px 10px 0px ;
		font-size: 12px;
		height: 32px;
		word-break:break-all;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; 
	}
	.footer{
		padding: 10px 10px 5px;
		.danwei{
			font-size: 10px;
			color: #e36e50;
		}
		.jiage{
			font-weight: bold;
			color: #e36e50;
			margin-right: 10px;
		}
		.renqi{
			color: #7d7d7d;
			font-size: 10px;
		}
	}
}
</style>
