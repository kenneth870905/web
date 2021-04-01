<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in 购买记录.list">
				<view class="title-2" @click="item.open = !item.open">
					<text class="name">
						<text v-if="item.gid==10001">Parity</text>
						<text v-if="item.gid==10002">Sapre</text>
						<text v-if="item.gid==10003">Bcone</text>
						<text v-if="item.gid==10004">Emerd</text>
					</text>
					<text class="period">{{item.period}}</text>
			<!-- state 1是中  2是没中 -1是撤单  0是还没结算 -->
					<text :class="{'red-text':item.state==2,'lv-text':item.state==1}">
						<text v-if="item.state==1">+{{(Math.round(item.amount*item.odds*100)/100).toFixed(2)  }}</text>
						<text v-if="item.state==2">-{{item.amount}}</text>
						<text v-if="item.state==-1">Revoke</text>
						<text v-if="item.state==0">Unsettlement</text>
					</text>
					<view class="icon-box">
						<uni-icons type="arrowdown"></uni-icons>
					</view>
				</view>
				<view class="xiangqing" :class="{open:item.open}">
					<view>
						<view>Period</view>
						<view>{{item.period}}</view>
					</view>
					<view>
						<view>Contract Money</view>
						<view>{{item.amount}}</view>
					</view>
					<view>
						<view>Odds</view>
						<view>{{item.odds}}</view>
					</view>
					<view class="select">
						<view>Buy</view>
						<view>
							<text v-if="item.method==1">{{item.content}}</text>
							<text v-if="item.method==2">
								<text v-if="item.content=='g'">Green</text>
								<text v-if="item.content=='v'">Violet</text>
								<text v-if="item.content=='r'">Red</text>
							</text>
						</view>
					</view>
					<view>
						<view>Result</view>
						<view>
							{{item.result}}
						</view>
					</view>
					<!-- <view>
						<view>Status</view>
						<view>Success</view>
					</view> -->
					<view>
						<view>Reward</view>
						<view :class="{'red-text':item.state==2,'lv-text':item.state==1}">
							<text v-if="item.state==1">+{{(Math.round(item.amount*item.odds*100)/100).toFixed(2)  }}</text>
							<text v-if="item.state==2">-{{item.amount}}</text>
							<text v-if="item.state==-1">Revoke</text>
							<text v-if="item.state==0">Unsettlement</text>
						</view>
					</view>
					<view>
						<view>Create Time</view>
						<view>{{item.created_at}}</view>
					</view>
				</view>
			</view>
		</view>
		<Aloading :total="购买记录.total" :length="购买记录.list.length"></Aloading>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				购买记录:{
					query:{
						page:0,
						size:20
					},
					list:[],
					total:-1,
					loading:false
				}
			};
		},
		methods:{
			获取购买记录(){
				if(this.购买记录.loading || (this.购买记录.total!=-1 && this.购买记录.total<=this.购买记录.list.length)){
					return
				}
				this.购买记录.query.page++
				this.购买记录.loading=true
				this.$http('/Game/BuyRecords',this.购买记录.query).then(res=>{
					if(res.result){
						let data = res.data
						data.forEach(item=>{
							item.open=false
						})
						this.购买记录.list = [...this.购买记录.list,...data]
						this.购买记录.total=res.total
					}else{
						this.购买记录.total=0
					}
					this.购买记录.loading=false
				}).catch(err=>{
					this.购买记录.total=0
					this.购买记录.loading=false
				})
			},
		},
		onLoad() {
			this.获取购买记录()
		},
		onReachBottom(){
			this.获取购买记录()
		}
	}
</script>

<style lang="scss" scoped>
		.list {
			background: #fff;
			box-shadow: 0.33vw 0.33vw 1vw rgba(0, 0, 0, .15);
			.item{
				border-bottom: 1px solid #eee;
				padding: 0px 15px 0px;
			}
			.title-2{
				height: 44px;
				display: flex;
				align-items: center;
				font-size: 12px;
				.name{
					width: 50px;
				}
				.period{
					width: 100px;
				}
				.icon-box{
					flex: 1;
					text-align: right;
				}
				.WinLose{
					width: 80px;
					font-size: 12px;
				}
			}
			.xiangqing.open{
				height: 210px;
			}
			.xiangqing {
				background: #f9f9f9;
				height: 0px;
				transition: all 0.5s;
				padding: 0px 10px 0px;
				font-size: 12px;
				box-sizing: border-box;
				overflow: auto;
				>view:not(.btn-1){
					display: flex;
					padding: 5px 0px;
					>view{
						display: flex;
						align-items: center;
					}
					>view:nth-child(1){
						width: 124px;
						flex-shrink: 0;
					}
				}
				.yuan{
					width: 16px;
					height: 16px;
					border-radius: 100%;
					background: #4caf50;
					margin: 0px 0px 0px 10px;
				}
				.btn-1{
					margin-bottom: 10px;
					text-align: right;
					view{
						display: inline-block;
						width: 88px;
						line-height: 28px;
						text-align: center;
						color: #fff;
						font-size: 14px;
						background: #2196f3;
					}
				}
			}
			.red-text{
				color: #f44336;
			}
			.lv-text{
				color: #4caf50;
			}
		}
		.fenye {
			margin: 10px auto 0px;
			width: 50%;
		
			/deep/ .uni-pagination__btn {
				width: 30px;
				border-radius: 100%;
				background: #fff;
			}
		}
	
</style>
