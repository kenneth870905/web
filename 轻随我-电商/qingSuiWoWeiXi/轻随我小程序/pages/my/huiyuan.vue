<template>
	<view>
		<view class="box_1">
			<view class="header1">
				会员总人数:{{total}}
			</view>
			
			<view class="uni-flex list_header">
				<!-- <view class="uni-flex-item">
					账号
				</view> -->
				<view class="uni-flex-item">
					昵称
				</view>
				<view class="uni-flex-item">
					返佣
				</view>
				<view class="uni-flex-item">
					注册时间
				</view>
			</view>
		</view>
		
		<view class="uni-flex list" v-for="item in list">
			<view class="uni-flex-item">
				{{item.nickName}}
			</view>
			<view class="uni-flex-item">
				{{item.kickback}}
			</view>
			<view class="uni-flex-item">
				{{item.createdAt}}
			</view>
		</view>
		
		<uni-load-more :status="status" :content-text="contentText"></uni-load-more>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
 	export default {
		data() {
			return {
				status:'contentnomore',  //more（loading前）、loading（loading中）、noMore（没有更多了）
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				list:[],
				total:0,
				query:{
					page:1,
					size:50
				},
				
			};
		},
		computed:{
			...mapState({
				loginInfo:state=>state.loginInfo
			})
		},
		methods:{
			onReachBottom(){
				console.log('滚动到底部')
			},
			getList(){
				this.$http(`/api/user/${this.loginInfo.id}/subordinate`,this.query).then(x=>{
					console.log(x)
					if(x.code===0){
						this.list = [...this.list , ...x.data]
						this.total = x.total
					}
				})
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>

<style lang="scss">
.header1{
	padding: 15px;
	color: #3b4144;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 20px;
}

.list_header{
	background: #fff;
	margin: 5px 0px 0px;
}
.uni-flex{
	text-align: center;
	background: #fff;
	border-bottom: 1px solid #eee;
	view{
		padding: 5px 5px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	view:not(:nth-child(1)){
		border-left: 1px solid #eee;
	}
	// view:nth-child(3){
	// 	width: 35px;
	// 	flex:auto;
	// 	flex-grow: 0;
	// }
}

.box_1{
	background: #f5f5f5;
	position: sticky;
	/* #ifdef H5 */
	top: 44px;
	/* #endif */
	/* #ifndef H5 */
	top: 0px;  //适配其他平台
	/* #endif */
}
</style>
