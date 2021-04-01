<template>
	<view>
		
		<view class="list">
			<view class="item" v-for="item in list">
				<!-- <view class="img">
					<text class="icon iconfont icontubiao-"></text>
				</view> -->
				<view class="center">
					<text class="qian">
						<text>{{item.amount}}</text>
					</text>
					<text class="time">{{item.created_at}}</text>
				</view>
				<view class="r">
					<!-- state 1 -1 0  分别对应 成功/失败/等待 -->
					<!-- <uni-tag class="tag" v-if="item.state==0" text="wait" type="default" size="small" circle=""></uni-tag>
					<uni-tag class="tag" v-if="item.state==1" text="success" type="success" size="small" circle></uni-tag>
					<uni-tag class="tag" v-if="item.state==-1" text="failure" type="warning" size="small" circle></uni-tag>
					
					<uni-tag class="tag" v-if="item.step==1" text="Under review" type="default" size="small" circle></uni-tag>
					<uni-tag class="tag" v-if="item.step==2" text="Processing" type="default" size="small" circle></uni-tag>
					<uni-tag class="tag" v-if="item.step==3" text="Review completed" type="default" size="small" circle></uni-tag> -->
					<text v-if="item.state==0" class="state0">Wait</text>
					<text v-if="item.state==1" class="state1">Success</text>
					<text v-if="item.state==-1" class="state2">Failure</text>
					
					<text v-if="item.step==0" class="step">Unprocessed</text>
					<text v-if="item.step==1" class="step">Reviewing</text>
					<text v-if="item.step==2" class="step">Processing</text>
					<text v-if="item.step==3" class="step">Reviewed</text>
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
				this.$http('/Agent/WithdrawRecords',this.query).then(res=>{
					if(res.result){
						this.list = [...this.list , ...res.data]
						this.total = res.total
					}else{
						this.total = 0
					}
					this.loading=false
				}).catch(err=>{
					this.total = 0
					this.loading=false
				})
			}
		},
		onLoad() {
			this.getList()
		},
		onReachBottom(){
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.tag{
	line-height: 16px;
	margin-left: 5px;
}
.item{
	background: #fff;
	padding: 8px 10px;
	display: flex;
	border-bottom: 1px solid #eee;
	align-items: center;
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
			text{
				font-weight: bold;
			}
		}
		.time{
			font-size: 12px;
			color: #9e9e9e;
		}
	}
	.r{
		display: flex;
		align-items: center;
		border-top-left-radius: 22px;
		border-bottom-left-radius: 22px;
		// border-radius: 22px;
		overflow: hidden;
		text{
			padding: 3px 8px;
			font-size: 12px;
		}
		.state0{
			background: red;
			color: #fff;
		}
		.state1{
			color: #fff;
			background: #4cd964;
		}
		.state2{
			background: #d2d2d2;
		}
		.step{
			background: #ececec;
		}
	}
}
</style>
