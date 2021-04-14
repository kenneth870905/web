<template>
	<view class="h100">
		<view class="item header-1">
			<view class="">Period</view>
			<view class="">Number</view>
			<view class="">Result</view>
		</view>
		<scroll-view scroll-y="true" class="kjhm" @scrolltolower="tobuttom()">
				
				<view class="item" v-for="item in list">
					<view class="">{{item.period}}</view>
					<view :class="getClass(item.result)">{{item.result}}</view>
					<view class="">
						<view class="number">
							<!-- // 1 3 7 9是绿
							// 2 4 6 8 是 红
							// 0是红紫 5是绿紫 -->
							<!-- 绿 -->
							<view class="yuan Green" v-if="[1,3,7,9,5].findIndex(x=>x==item.result)!=-1"></view>
							<!-- 红 -->
							<view class="yuan Red" v-if="[2,4,6,8,0].findIndex(x=>x==item.result)!=-1"></view>
							<!-- 紫 -->
							<view class="yuan Violet" v-if="[0,5].findIndex(x=>x==item.result)!=-1"></view>
						</view>
					</view>
				</view>
				<Aloading :loading="loading" :total="total" :length="list.length"></Aloading>
		</scroll-view>
	</view>
</template>

<script>
export default{
	props:{
		gid:{
			default:''
		}
	},
	data() {
		return {
			query:{
				gid:10001,
				page:0,
				size:20
			},
			list:[],
			total:-1,
			loading:false
		}
	},
	methods:{
		getClass(num){
			let className = ''
			if([1,3,7,9,5].findIndex(x=>x==num)!=-1){
				className = 'textGreen'
			}
			if([2,4,6,8,0].findIndex(x=>x==num)!=-1){
				className = 'textRed'
			}
			return className
		},
		tobuttom(){
			this.获取开奖()
		},
		获取开奖(){
			if(this.loading || (this.total!=-1 && this.total<=this.list.length)){
				readline
			}
			this.query.gid = this.gid
			this.query.page++
			this.loading=true
			this.$http('/Game/PeriodHistory',this.query).then(res=>{
				if(res.result){
					this.list = [...this.list,...res.data]
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
	mounted() {
		this.获取开奖()
	},
	watch:{
		gid(){
			this.list = []
			this.query.page=0
			this.total = -1
			this.loading = false
			this.获取开奖()
			// console.log(this.gid)
		}
	}
	
}
</script>

<style lang="scss" scoped>
.h100{
	height: 100%;
}
.textGreen{
	color: #4caf50;
}
.textRed{
	color: red;
}
.item{
	font-size: 12px;
	&:nth-child(2n-1){
		background: #fff;
	}
	display: flex;
	>view{
		flex: 1;
		height: 38px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.number{
		width: 50px;
	}
}
.header-1{
	position: sticky;
	top: 0px;
}
.kjhm{
	height: calc(100% - 38px) ;
	// overflow: auto;
}
.yuan{
	width: 16px;
	height: 16px;
	border-radius: 100%;
	display: inline-block;
	margin: 0px 3px;
	&.Green{
		background: #4caf50;
	}
	&.Red{
		background: red;
	}
	&.Violet{
		background: #673ab7;
	}
}
</style>
