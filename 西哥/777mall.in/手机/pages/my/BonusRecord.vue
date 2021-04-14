<template>
	<view class="content">
		<view class="item header-1">
			<view class="User">User</view>
			<view class="Level">Level</view>
			<view class="Game">Game</view>
			<view class="Period">Period</view>
			<view class="Amount">Amount</view>
			<view class="Time">Time</view>
		</view>
		<template v-for="(item,index) in list">
			<view class="time2" v-if="showTime(item,index)">{{item.created_at | filterT('YYYY-MM-DD')}}</view>
			<view class="item">
				<view class="User">{{item.username}}</view>
				<view class="Level">{{item.level}}</view>
				<view class="Game">{{item.game}}</view>
				<view class="Period">{{item.period | filterPeriod}}</view>
				<view class="Amount">{{item.amount}}</view>
				<view class="Time">{{item.created_at | filterT('hh:mm:ss')}}</view>
			</view>
		</template>
		<Aloading :loading="loading" :total="total" :length="list.length"></Aloading>
	</view>
</template>

<script>
	import moment from 'moment'
	export default {
		data() {
			return {
				query:{
					page:1,
					size:20
				},
				list:[],
				total:-1,
				loading:false
			};
		},
		filters:{
			filterT(time,str){
				if(!time) return ''
				return moment(time).format(str)
			},
			filterPeriod(str){
				return str.substring(4)
			}
		},
		methods:{
			showTime(item,index){
				if(!this.list[index-1]){
					return true
				}
				return false
				return moment(item.created_at).format('YYYY-MM-DD') != moment(this.list[index-1].created_at).format('YYYY-MM-DD')
			},
			查询提成(){
				if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
					return
				}
				this.query.page++
				this.loading=true
				this.$http('/Agent/Details',this.query).then(res=>{
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
			this.查询提成()
			// console.log(moment)
		},
		onReachBottom(){
			this.查询提成()
		}
	}
</script>

<style lang="scss" scoped>

.time2{
	font-size: 14px;
	padding: 10px 10px;
	font-weight: bold;
	display: flex;
	align-items: center;
	background: #f5f5f5;
	position: sticky;
	opacity: 0.8;
	/* #ifdef APP-PLUS */
	top: 36px;
	/* #endif */
	/* #ifndef APP-PLUS */
	top: calc(44px + 36px);
	/* #endif */
	&::before{
		margin: 0px 0px 0px 10px;
		content: '';
		height: 1px;
		background: #b5b5b5;
		flex: 1;
	}
}

.item{
	background: #fff;
	border-bottom: 1px solid #eee;
	display: flex;
	font-size: 12px;
	text-align: center;
	line-height: 36px;
	>view:not(:nth-child(1)){
		border-left: 1px solid #eee;
	}
	.User{
		width: 95px;
	}
	.Level{
		width: 38px;
	}
	.Game{
		width: 45px;
	}
	.Period{
		width: 65px;
	}
	.Amount{
		// width: 40px;
		flex-grow: 1;
		color: var(--color);
	}
	.Time{
		width: 65px;
	}
}

.header-1{
	position: sticky;
	/* #ifdef APP-PLUS */
		top: 0px;
	/* #endif */
	/* #ifndef APP-PLUS */
		top: 44px;
	/* #endif */
	background: #fff;
}
</style>
