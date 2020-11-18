<template>
	<view>
		<view class="header1">
			<text>佣金:{{loginInfo.kickback}}</text>
			<text @click="提现()">提现到微信</text>
		</view>
		
		<view class="list">
			<view class="item">
				<view class="time">
					时间
				</view>
				<view class="xiangqing">
					变更详情
				</view>
			</view>
			<view class="item" v-for="item in list">
				<view class="time">
					{{item.createdAt}}
				</view>
				<view class="xiangqing">
					{{item.content}}
				</view>
			</view>
		</view>
		
		<uni-load-more :status="loadingStatus"></uni-load-more>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				loadingStatus: 'more', //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				query:{
					// uid:"",
					page:0,
					size:10,
					// startDate:"",
					// endDate:""
				},
				list:[],
				total:0
			};
		},
		computed:{
			...mapState({
				loginInfo:x=>x.loginInfo
			})
		},
		methods:{
			提现(){
				uni.showToast({
					title:'暂未开放',
					icon:'none'
				})
			},
			getList(){
				if(this.loadingStatus == 'loading' || this.loadingStatus=='noMore') return
				this.query.page++
				this.loadingStatus = 'loading'
				// this.query.uid = this.loginInfo.id
				this.$http('/api/kickbackLog',this.query).then(x=>{
					console.log(x)
					if(x.code===0){
						this.list = [...this.list , ...x.data]
						this.total = x.total
						this.loadingStatus =  this.list.length >= this.total ? 'noMore' : 'more'
					}else{
						this.loadingStatus = 'noMore'
					}
				}).catch(err=>{
					this.loadingStatus = 'noMore'
				})
			},
			init(){
				this.loadingStatus = 'more'  //loading 的状态，可选值：more（loading前）、loading（loading中）、noMore（没有更多了）
				this.query = {
					// uid:"",
					page:0,
					size:10,
					// startDate:"",
					// endDate:""
				}
				this.list = []
				this.total = 0
			}
		},
		mounted() {
			
		},
		onReachBottom(){
			// this.getList()
		},
		onShow() {
			this.init()
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
.header1{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: _opx(10) _opx(10);
	text:nth-child(2){
		color: red;
	};
	background: #fff;
	position: sticky;
	z-index: 1;
	border-bottom: 1px solid #BEBEBE;
	top: 0px;
}
.list{
	margin: 10px 0px 0px;
	border-top: 1px solid #eee;
	background: #fff;
	.item:nth-child(1){
		text-align: center;
	}
	.item{
		display: flex;
		align-items: center;
		border-bottom: 1px solid #eee;
		position: relative;
		&::after{
			position: absolute;
			left: 160px;
			top: 0px;
			content: '';
			background: #eee;
			width: 1px;
			height: 100%;
		}
		view{
			padding: 5px 10px;
		}
		.time{
			box-sizing: border-box;
			width: 160px;
			border-right: 1px solid #fff;
			flex-shrink: 0;
		}
		.xiangqing{
			flex: 1;
		}
	}
}

</style>
