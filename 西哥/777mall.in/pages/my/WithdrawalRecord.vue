<template>
	<view>
		
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="img">
					<text class="icon iconfont icontubiao-"></text>
				</view>
				<view class="center">
					<text class="qian">{{item.amount}}</text>
					<text class="time">{{item.created_at}}</text>
				</view>
				<view class="r">
					<uni-tag v-if="item.state==0" text="未审核" type="default" size="small"></uni-tag>
					<uni-tag v-if="item.state==1" text="审核通过" type="default" size="small"></uni-tag>
					<uni-tag v-if="item.state==-1" text="已撤回" type="default" size="small"></uni-tag>
					
					<uni-tag v-if="item.step==1" text="客服审核中" type="default" size="small"></uni-tag>
					<uni-tag v-if="item.step==2" text="出款中" type="default" size="small"></uni-tag>
					<uni-tag v-if="item.step==3" text="审核完毕" type="default" size="small"></uni-tag>
				</view>
			</view>
		</view>
	
		<Aloading :loading="loading" :length="list.length" :total="total"></Aloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// state 订单状态  0 未审核 1 通过 -1 撤回
				// step 1是客服审核中  2是出款中  3是审核完毕
 				query:{
					page:0,
					size:15
				},
				total:-1,
				loading:false,
				list:[]
			};
		},
		methods:{
			getList(){
				if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
					return
				}
				this.query.page++
				this.loading=false
				this.$http('/WithdrawRecords',this.query).then(res=>{
					if(res.result){
						this.list = [...this.list , ...res.data]
						this.total = res.total
					}
					this.loading=false
				}).catch(err=>{
					console.log(err)
					this.loading=false
				})
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom(){
			console.log('滚动到底部')
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.list{
			
}
.item{
	background: #fff;
	padding: 8px 10px;
	display: flex;
	border-bottom: 1px solid #eee;
	.img{
		flex-shrink: 0;
		width: 38px;
		height: 38px;
		background: #c0c4cc;
		border-radius: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFF;
		margin: 0px 10px 0px 0px;
		.icon{
			font-size: 26px;
		}
	}
	.center{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.qian{
			font-weight: bold;
		}
		.time{
			font-size: 12px;
			color: #9e9e9e;
		}
	}
	.r{
		display: flex;
		align-items: center;
	}
}
</style>
