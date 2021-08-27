<template>
	<view>
		<view class="item" v-for="item in list">
			<view class="title-1">
				<text>{{item.title}}</text>
				<text>{{item.createdAt}}</text>
			</view>
			<view class="content">
				{{item.content}}
			</view>
			<view class="reply" v-if="item.reply">
				<i class="icon iconfont iconxia"></i>
				官方回复：{{item.reply}}
			</view>
		</view>
		
		<!-- <view class="Loading">
			<text class="" v-if="loading==1">正在载中</text>
			<text class="" v-if="loading==2 && total==0">暂无数据</text>
			<text class="" v-if="loading==2 && total!=0">没有更多了</text>
		</view> -->
		<Aloading :loading="loading" :total="total" :length="length"></Aloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query:{
					page:0,
					size:10
				},
				list:[],
				total:-1,
				loading:false, // 0 未加载 1加载中 2 加载完成
			};
		},
		computed:{
			length(){
				return this.list.length
			}
		},
		methods:{
			获取记录(){
				if(this.loading || (this.loading==2 && this.list.length==this.total)){
					return
				}
				this.loading=true
				this.query.page++
				this.$http('/api/advice',this.query).then(x=>{
					this.loading=false
					if(x.code===0){
						this.list = [...this.list , ...x.data]
						this.total = x.total
					}
				}).catch(err=>{
					this.total=0
					this.loading = false
				})
			}
		},
		mounted() {
			this.获取记录()
		},
		onReachBottom(){
			this.获取记录()
		}
	}
</script>

<style lang="scss" scoped>
.item{
	background: #fff;
	padding:0px 10px 10px;
	font-size: 14px;
	margin: 10px 0px;
	.title-1{
		height: 30px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #dadada;
		align-items: center;
		
		text:nth-child(2){
			font-size: 12px;
			color: #868686;
		}
	}
	.content{
		padding: 5px 0px;
		word-break:break-all;
	}
	.reply{
		margin-top: 5px;
		padding: 10px;
		background: #f1f1f1;
		position: relative;
		font-size: 12px;
		word-break:break-all;
		.icon{
			position: absolute;
			top: -10px;
			left: 10px;
			transform: rotate(180deg);
			color: #f1f1f1;
		}
	}
}
</style>
