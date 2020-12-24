<template>
	<view>
		<view class="sousuo">
			<view class="input-box">
				<i class="icon iconfont iconsousuo"></i>
				<input focus @confirm="搜索()"  v-model="query.name" type="text" value="" />
			</view>
			<text @click="搜索()">搜索</text>
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list" @click="xiangqing(item)">
				<view class="img-1">
					<image :src="api_url+'/'+item.coverImg" mode="aspectFill"></image>
				</view>
				<view class="title-1">
					{{item.name}}
				</view>
				<view class="footer">
					<text class="danwei">￥</text>
					<text class="jiage">{{item.levelOnePrice}}</text>
					<text class="renqi">{{item.soldCount}}付款</text>
				</view>
			</view>
		</view>
		<view class="Loading">
			<text v-if="loading==1">加载中</text>
			<text v-if="loading==2 && total==0">没有找到相关商品</text>
			<text v-if="loading==2 && total!=0">没有更多了</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				api_url:this.$api_url,
				query:{
					page:0,
					size:10,
					name:"",
					isSeckill:false,	//秒杀
				},
				list:[],
				total:0,
				loading:0,  //0 未加载 1 加载中 2 完成
			};
		},
		methods:{
			xiangqing(item) {
				uni.navigateTo({
					url: `/pages/shangPin/productDetails?id=${item.id}`
				});
			},
			获取商品(){
				console.log(this.query)
				if(this.loading==1 || (this.loading == 2 && this.total == this.list.length)){
					return
				}
				this.query.page++
				this.$http('/api/product',this.query,'GET').then(x=>{
					this.loading = 2
					if(x.code===0){
						this.list = [...this.list , ...x.data]
						this.total = x.total
					}
				}).catch(err=>{
				})
			},
			搜索(){
				this.query.page = 0
				this.loading = 0
				this.list = []
				this.total = 0
				this.获取商品()
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
.sousuo{
	position: sticky;
	top: 0px;
	height: 40px;
	background: #fff;
	display: flex;
	padding: 0px 10px;
	align-items: center;
	margin: 0px 0px 10px;
	.input-box{
		display: flex;
		flex: 1;
		align-items: center;
		background: #eee;
		height: 30px;
		border-radius: 30px;
		padding: 0px 5px;
		margin: 0px 10px 0px 0px;
		i{
			margin: 0px 5px 0px 0px;
			font-size: 14px;
		}
		input{
			flex: 1;
		}
	}
}

.list{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 0px 10px;
	.item{
		width: calc((100vw - 20px)/2  - 5px);
		background: #fff;
		margin: 0px 0px 10px 0px;
		border-radius: 5px;
		overflow: hidden;
	}
	.img-1{
		height: calc((100vw - 20px)/2  - 5px);
		image{
			height: 100%;
			width: 100%;
		}
	}
	.title-1{
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
			margin-right: 10px;		}
		.renqi{
			color: #7d7d7d;
			font-size: 10px;
		}
	}
}


</style>
