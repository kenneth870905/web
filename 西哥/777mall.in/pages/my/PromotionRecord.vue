<template>
	<view>
		<view class="tabs">
			<view :class="{active:query.level==1}" @click="chengeLevel(1)">Level 1</view>
			<view :class="{active:query.level==2}" @click="chengeLevel(2)">Level 2</view>
		</view>
		<view class="list">
			<view class="item" v-for="item in list">
				<view class="username">{{item.username}}</view>
				<view class="nick">{{item.nick}}</view>
				<view class="time">{{item.created_at}}</view>
			</view>
		</view>
		
		<Aloading :loading="loading" :length="list.length" :total="total"></Aloading>
	</view>
</template>

<script>
	// 促销记录
	export default {
		data() {
			return {
				query:{
					level:1,
					page:0,
					size:20
					// level=1&page=1&size=20
				},
				list:[],
				loading:false,
				total:-1
			};
		},
		methods:{
			chengeLevel(level){
				this.query.level = level
				this.list = [];
				this.total = -1
				this.loading=false
				this.query.page=0
				this.查询会员()
			},
			查询会员(){
				if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
					return
				}
				this.loading=true
				this.query.page++
				this.$http('/Agent/List',this.query).then(res=>{
					if(res.result){
						this.list= [...this.list,...res.data]
						this.total = res.total
					}
					this.loading=false
				}).catch(err=>{
					this.loading=false
					console.log(err)
				})
			}
		},
		onLoad() {
			this.查询会员()
		},
		onReachBottom(){
			console.log('滚动到底部')
			this.查询会员()
		}
	}
</script>

<style lang="scss" scoped>
.tabs{
	display: flex;
	line-height: 44px;
	color: #fff;
	text-align: center;
	background: var(--color);
	color: rgba($color: #fff, $alpha: 0.8);
	view{
		flex: 1;
		position: relative;
	}
	.active{
		color: #fff;
		&::after{
			position: absolute;
			left: 0px;
			bottom: 0px;
			width: 100%;
			height: 4px;
			background: #2196f3;
			content: '';
		}
	}
	
}
.item{
	background: #fff;
	padding: 8px 10px;
	display: flex;
	border-bottom: 1px solid #eee;
	white-space: nowrap;
	font-size: 12px;
	.username{
		width: 120px;
	}
	.nick{
		flex: 1;
	}
	.time{
		width: 120px;
	}
}
</style>
